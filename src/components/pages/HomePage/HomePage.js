import { Component } from "../../../core/Component";

class HomePage extends Component {
  render() {
    return `
        <h1>HomePage</h1>
      `;
  }
}

customElements.define('home-page', HomePage);
