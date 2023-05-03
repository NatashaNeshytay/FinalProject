import { APP_EVENTS } from "../../../constants/appEvents";
import { appPages } from "../../../constants/appPages";
import { APP_ROUTES } from "../../../constants/appRoutes";
import { APP_STORAGE_KEYS } from "../../../constants/appStorageKeys";
import { Component } from "../../../core/Component";
import { eventEmmiter } from "../../../core/EventEmmiter";
import { storageService } from "../../../services/StorageService";
import { ADMIN } from "../../../constants/userRoles";
import "../../molecules/MenuItems";
import "../../../core/Router/Link";
import "./navigation.scss";
import "../../atoms/Logo";

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      productsCount: 0,
      user: null,
    };
  }

  static get observedAttributes() {
    return ["user"];
  }

  setUser(user) {
    this.setState((state) => {
      return {
        ...state,
        user,
      };
    });
  }

  async authorizeUser() {
    try {
      const user = await authService.authorizeUser();
      this.setUser(user);
    } catch (error) {
      console.error(error);
    }
  }

  onAuthorizeUser = ({ detail }) => {
    this.setUser(detail.user);
  };

  setProductsCount = (count) => {
    this.setState((state) => {
      return {
        ...state,
        productsCount: count,
      };
    });
  };

  countProducts = (data) => {
    if (Array.isArray(data)) {
      return data
        .filter((item, index, arr) => {
          return (
            arr.findIndex((indexItem) => indexItem.id === item.id) === index
          );
        })
        .map((item) => {
          return {
            ...item,
            quantity: item.quantity
              ? item.quantity
              : data.filter((filteredItem) => filteredItem.id === item.id)
                  .length,
          };
        })
        .reduce((acc, item) => acc + item.quantity, 0);
    }
  };

  onStorage = (evt) => {
    const count = this.countProducts(evt.detail.data);
    this.setProductsCount(count);
  };

  getItems() {
    const user = JSON.parse(this.props.user);
    if (user) {
      if (user.email === ADMIN) {
        return appPages.filter((menuItem) => {
          return [APP_ROUTES.signUp, APP_ROUTES.signIn].every(
            (item) => item !== menuItem.href
          );
        });
      } else {
        return appPages.filter((menuItem) => {
          return [APP_ROUTES.signUp, APP_ROUTES.signIn].every(
            (item) => item !== menuItem.href
          );
        });
      }
    } else {
      return appPages.filter((menuItem) => {
        return [APP_ROUTES.signOut, APP_ROUTES.admin].every(
          (item) => item !== menuItem.href
        );
      });
    }
  }

  componentDidMount() {
    eventEmmiter.on(APP_EVENTS.authorizeUser, this.setUser);
    eventEmmiter.on(APP_EVENTS.storage, this.onStorage);
    const items = storageService.getItem(APP_STORAGE_KEYS.cartData) ?? [];
    const count = this.countProducts(items);
    this.setProductsCount(count);
    eventEmmiter.on(APP_EVENTS.authorizeUser, this.onAuthorizeUser);
  }

  componentWillUnMount() {
    eventEmmiter.off(APP_EVENTS.authorizeUser, this.setUser);
    eventEmmiter.off(APP_EVENTS.storage, this.onStorage);
    eventEmmiter.off(APP_EVENTS.authorizeUser, this.onAuthorizeUser);
  }

  render() {
    return `  

      <nav class="navbar navbar-expand-lg nav-justified bg-body-tertiary" style="background-color: #e3f2fd;">
        <div class="container">
          <vegefoods-logo></vegefoods-logo>
          <div class="collapse navbar-collapse d-flex justify-content-end align-items-center pe-5" id="navbarNavDropdown">
            <menu-items 
              items='${JSON.stringify(this.getItems())}'
            ></menu-items>
            <ul class="navbar-nav">
              <li class="nav-item">
              <route-link to="${APP_ROUTES.card}">
                  <a class="nav-link position-relative"href="${
                    APP_ROUTES.card
                  }">
                    <img src="./assets/images/basket.svg" alt="cart" width="24" height="24">
                    <span class="position-absolute translate-middle badge rounded-pill bg-danger">
                    ${this.state.productsCount}
                    </span>
                  </a>
                  </route-link>
              </li>
            </ul>                           
          </div>
        </div>
      </nav>
   
`;
  }
}

customElements.define("it-navigation", Navigation);
