import { Component } from "../../../core/Component";

class AboutPage extends Component {
    render() {
      return `
        <h1>AboutPage</h1>
      `
    }
}

customElements.define('about-page', AboutPage);