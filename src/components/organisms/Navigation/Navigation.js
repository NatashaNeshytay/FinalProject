import { Component } from "../../../core/Component";
import { APP_ROUTES } from "../../../constants/appRoutes";
import { appPages } from "../../../constants/appPages";
import "../../molecules/MenuItems";
import "../../atoms/Logo";
import "./navigation.scss";

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      productsCount: 0,
    };
  }
  render() {
    return `  
    <div class="container nav-justified">
      <nav class="navbar navbar-expand-lg nav-justified bg-body-tertiary">
        <div class="container-fluid">
          <vegefoods-logo></vegefoods-logo>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
            <menu-items 
              items='${JSON.stringify(appPages)}'
            ></menu-items>
            <ul class="navbar-nav">
              <li class="nav-item">
                <route-link to="${APP_ROUTES.cart}">
                  <a class="nav-link position-relative" href="${
                    APP_ROUTES.cart
                  }">
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
    </div>
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
