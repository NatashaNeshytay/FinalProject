import { Component } from "../../../core/Component";

class ContactsPage extends Component {
  render() {
    return `
        <h1>ContactsPage</h1>
      `;
  }
}

customElements.define('contacts-page', ContactsPage);
