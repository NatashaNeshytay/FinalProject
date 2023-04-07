import { Component } from "../../../core/Component";

class Error extends Component {
  render() {
    return `
        <h1>ErrorPage</h1>
      `;
  }
}

customElements.define("vegefoods-error", Error);
