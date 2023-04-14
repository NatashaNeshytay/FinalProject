import { Component } from "../../../core/Component";

class AdminPage extends Component {
  render() {
    return `
        <h1>AdminPage</h1>
      `;
  }
}

customElements.define('admin-page', AdminPage);
