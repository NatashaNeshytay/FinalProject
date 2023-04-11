import { Component } from './core/Component';
import './components/organisms/Navigation';
import './components/molecules/Footer';
import './components/pages/ShopPage';

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
      <vegefoods-shop></vegefoods-shop>
      <vegefoods-footer></vegefoods-footer>
    `;
  }
}

customElements.define("it-app", App);
