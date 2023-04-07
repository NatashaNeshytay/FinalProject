import { Component } from "../../../core/Component";

class Home extends Component {
  render() {
    return `
        <h1>HomePage</h1>
      `;
  }
}

customElements.define("vegefoods-home", Home);
