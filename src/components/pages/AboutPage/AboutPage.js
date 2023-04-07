import { Component } from "../../../core/Component";

class About extends Component {
    render() {
      return `
        <h1>AboutPage</h1>
      `
    }
}

customElements.define('vegefoods-about', About);