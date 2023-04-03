import { Component } from "./core/Component";
import "./components/organisms/Navigation";

class App extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }
  render() {
    return `
<it-navigation></it-navigation>
    `;
  }
}

customElements.define("it-app", App);
