import { Component } from "../../../core/Component";
import "./logo.scss";

class Logo extends Component {
  render() {
    return `
        <img class="logo" src="../../../assets/images/logo.png" alt="logo">
    `;
  }
}

customElements.define("vegefoods-logo", Logo);
