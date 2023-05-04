import { Component } from "../../../core/Component";
import { eventEmmiter } from "../../../core/EventEmmiter";
import { APP_EVENTS } from "../../../constants/appEvents";

class Tabs extends Component {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["menu-items", "active-item"];
  }

  getMenuItems = () => {
    return JSON.parse(this.props["menu-items"]);
  };

  onChange = (evt) => {
    evt.preventDefault();
    if (evt.target.closest(".nav-link")) {
      const id = evt.target.dataset.id;
      const items = this.getMenuItems();
      const activeItem = items.find((item) => item.id === id);
      eventEmmiter.emit(APP_EVENTS.changeTab, { activeItem });
    }
  };

  componentDidMount() {
    this.addEventListener("click", this.onChange);
  }

  componentWillUpdate() {
    this.removeEventListener("click", this.onChange);
  }

  render() {
    const items = this.getMenuItems();
    const activeItem = JSON.parse(this.props["active-item"]);

    return `
        <ul class="nav nav-tabs">
            ${items
              .map(({ id, label }) => {
                return `
                <li class="nav-item">
                    <a class="nav-link ${
                      id === activeItem.id ? "active" : ""
                    }" data-id="${id}" href="#">${label}</a>
                </li>
                `;
              })
              .join(" ")}
        </ul>
    `;
  }
}

customElements.define("it-tabs", Tabs);
