import { Component } from "../../../core/Component";

class Blog extends Component {
  render() {
    return `
        <h1>BlogPage</h1>
      `;
  }
}

customElements.define("vegefoods-blog", Blog);
