import { Component } from "../../../core/Component";

class Logo extends Component {
  render() {
    return `
        <a class="navbar-brand">Vegefoods</a>
    `;
  }
}

customElements.define("vegefoods-logo", Logo);
