import { Component } from "../../../core/Component";

class Contacts extends Component {
  render() {
    return `
        <h1>ContactsPage</h1>
      `;
  }
}

customElements.define("vegefoods-contacts", Contacts);
