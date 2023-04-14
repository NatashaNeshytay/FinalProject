import { Component } from "../../../core/Component";
import "../../../core/Router/Link";
import "../../atoms/Link";

class MenuItems extends Component {
  static get observedAttributes() {
    return ["items", "active-item"];
  }

  isActive(menuItem) {
    const item = this.props["active-item"];
    if (!item) {
      return false;
    }
    const activeItem = item ? JSON.parse(item) : {};
    return menuItem.href === activeItem.href;
  }

  render() {
    const items = JSON.parse(this.props.items);

    return `
      <ul class="navbar-nav">
        ${items
          .map((item) => {
            return `
              <li class="nav-item">
                <route-link to="${item.href}">
                  <vegefoods-link
                    class="${this.isActive(item) ? "active" : ""}"
                    href="${item.href ? item.href : ""}"
                    content="${item.label}"
                  ></vegefoods-link>
                </route-link>
              </li>
            `;
          })
          .join(" ")}
      </ul>
        `;
  }
}

customElements.define("menu-items", MenuItems);
