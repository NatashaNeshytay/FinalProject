import { APP_EVENTS } from '../../../constants/appEvents';
import { appPages } from '../../../constants/appPages';
import { APP_ROUTES } from '../../../constants/appRoutes';
import { APP_STORAGE_KEYS } from '../../../constants/appStorageKeys';
import { Component } from '../../../core/Component';
import { eventEmmiter } from '../../../core/EventEmmiter';
import { storageService } from '../../../services/StorageService';
import '../../molecules/MenuItems';
import '../../../core/Router/Link';
import './navigation.scss';
import "../../atoms/Logo";


class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      productsCount: 0,
    };
    // const pathname = window.location.pathname;
    // this.activeItem = routes.find((item) => item.href === pathname);
  }

  setProductsCount = (count) => {
    this.setState(() => {
      return {
        productsCount: count,
        user: null,
      };
    });
  };

  countProducts = (data) => {
    return data
      .filter((item, index, arr) => {
        return arr.findIndex((indexItem) => indexItem.id === item.id) === index;
      })
      .map((item) => {
        return {
          ...item,
          quantity: item.quantity
            ? item.quantity
            : data.filter((filteredItem) => filteredItem.id === item.id).length,
        };
      })
      .reduce((acc, item) => acc + item.quantity, 0);
  };


  onStorage = (evt) => {
    const count = this.countProducts(evt.detail.data);
    this.setProductsCount(count);
  };

  setUser(evt) {
    this.setState((state) => {
      return {
        ...state,
        user: evt.detail.user,
      };
    });
  }
  componentDidMount() {
    eventEmmiter.on(APP_EVENTS.autorizeUser, this.setUser);
    eventEmmiter.on(APP_EVENTS.storage, this.onStorage);
    const items = storageService.getItem(APP_STORAGE_KEYS.cartData) ?? [];
    const count = this.countProducts(items);
    this.setProductsCount(count);
  }

  componentWillUnMount() {
    eventEmmiter.off(APP_EVENTS.autorizeUser, this.setUser);
    eventEmmiter.off(APP_EVENTS.storage, this.onStorage);
  }

  render() {
    return `  

      <nav class="navbar navbar-expand-lg nav-justified bg-body-tertiary" style="background-color: #e3f2fd;">
        <div class="container-fluid">
          <vegefoods-logo></vegefoods-logo>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
            <menu-items 
              items='${JSON.stringify(appPages)}'
            ></menu-items>
            <ul class="navbar-nav">
              <li class="nav-item">
              <route-link to="${APP_ROUTES.card}">
              <a class="nav-link position-relative" href="${APP_ROUTES.card}">
                  <a class="nav-link position-relative" href="№}">
                    <img src="./assets/images/basket.svg" alt="cart" width="24" height="24">
                    <span class="position-absolute top-5 start-100 translate-middle badge rounded-pill bg-danger">
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

{
  /* <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown link
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> */
}
