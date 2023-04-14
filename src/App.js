import { Component } from "./core/Component";
import "./core/Router/Router";
import { routes } from "./constants/routes";
import "./components/organisms/Navigation";
import "./components/molecules/Footer";
import "./components/pages/CatalogPage";
import "./components/pages/AboutPage";
import "./components/pages/BlogPage";
import "./components/pages/ContactsPage";
import "./components/pages/AdminPage";
import "./components/pages/CardPage";
import "./components/pages/ErrorPage";
import "./components/pages/HomePage";

class App extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }
  render() {
    return `
    <div class="main-layout"> 
    <it-navigation></it-navigation>
      <main>
        <app-router>
          <app-route 
            path="${routes.home.href}" 
            title="Home" 
            component="${routes.home.component}">
          </app-route>

          <app-route 
          path="${routes.catalog.href}" 
          title="Catalog" 
          component="${routes.catalog.component}">
        </app-route>

        <app-route 
            path="${routes.blog.href}" 
            title="Blog" 
            component="${routes.blog.component}">
          </app-route>

          <app-route 
            path="${routes.contacts.href}" 
            title="Contacts" 
            component="${routes.contacts.component}">
          </app-route>

          <app-route 
          path="${routes.card.href}" 
          title="Card" 
          component="${routes.card.component}">
        </app-route>

          <app-route 
            path="${routes.admin.href}" 
            title="Admin" 
            component="${routes.admin.component}">
          </app-route>

          <app-route 
          path="${routes.error.href}" 
          title="Error" 
          component="${routes.error.component}">
        </app-route>
          
          <app-outlet></app-outlet>
        </app-router>
        </main>
      <vegefoods-footer></vegefoods-footer>
      </div>
    `;
  }
}

customElements.define("it-app", App);
