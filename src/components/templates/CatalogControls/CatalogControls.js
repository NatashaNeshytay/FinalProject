import { Component } from '../../../core/Component';
import '../../organisms/Navigation';
import '../../molecules/MenuItems';
import '../../molecules/CategoryItems';
import '../../molecules/SearchForm';

class CatalogControls extends Component {
  static get observedAttributes() {
    return ['categories'];
  }

  render() {
    const categories = this.props.categories;
    console.log(categories)

    return `
      <header>
        <nav class="navbar navbar-expand-lg mt-3">
          <div class="container">
            <div class="collapse navbar-collapse d-flex justify-content-between">
              <category-items items='${categories}'></category-items>
              <search-form></search-form>
            </div>
          </div>
        </nav>
      </header>
      `;
  }
}

customElements.define('catalog-controls', CatalogControls);

