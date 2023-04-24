import { Component } from "../../../core/Component";
// import { PRODUCTS } from '../../../constants/products';
import { eventEmmiter } from "../../../core/EventEmmiter";
import { APP_EVENTS } from "../../../constants/appEvents";
import { databaseService } from "../../../services/DatabaseService";
import { FIRESTORE_KEYS } from "../../../constants/firestoreKeys";
import "../../molecules/Pagination";
import "../../organisms/CardList";
import "../../molecules/Banner";

class CatalogPage extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      limit: 12,
      currentPage: 1,
    };
  }

  sliceData(currentPage = 1) {
    const { limit } = this.state;
    const start = (currentPage - 1) * limit;
    const end = currentPage * limit;
    return this.state.products.slice(start, end);
  }

  onChangePaginationPage = (evt) => {
    this.setState((state) => {
      return {
        ...state,
        currentPage: Number(evt.detail.page),
      };
    });
    window.scrollTo(0, { behavior: "smooth" });
  };

  onFilterProductsByCategory = (evt) => {
    const { selectedCategory } = evt.detail;
    this.setState((state) => {
      return {
        ...state,
        products: PRODUCTS.filter(
          (item) => item.category.id === selectedCategory.id
        ),
        currentPage: 1,
      };
    });
  };

  onSearch = (evt) => {
    const { data } = evt.detail;
    this.setState((state) => {
      return {
        ...state,
        products: this.state.products.filter((item) => {
          return item.title.toLowerCase().includes(data.search.toLowerCase());
        }),
        currentPage: 1,
      };
    });
  };

  setProducts(products) {
    this.setState((state) => {
      return {
        ...state,
        products,
      };
    });
  }

  getProducts = async () => {
    try {
      const products = await databaseService.getCollection(
        FIRESTORE_KEYS.products
      );
      this.setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getProducts();
    this.sliceData();
    eventEmmiter.on(
      APP_EVENTS.changePaginationPage,
      this.onChangePaginationPage
    );
    eventEmmiter.on(APP_EVENTS.setCategory, this.onFilterProductsByCategory);
    eventEmmiter.on(APP_EVENTS.searchProducts, this.onSearch);
  }

  componentWillUnmount() {
    eventEmmiter.off(
      APP_EVENTS.changePaginationPage,
      this.onChangePaginationPage
    );
    eventEmmiter.off(APP_EVENTS.setCategory, this.onFilterProductsByCategory);
    eventEmmiter.off(APP_EVENTS.searchProducts, this.onSearch);
  }

  render() {
    return `
    <it-slideer></it-slideer>
    <div class="container">
    		<div class="row justify-content-center">
    			<div class="col-md-10 mb-5 text-center">
    				<ul class="product-category">
    					<li><a href="#" class="active">All</a></li>
    					<li><a href="#">Vegetables</a></li>
    					<li><a href="#">Fruits</a></li>
    					<li><a href="#">Juice</a></li>
    					<li><a href="#">Dried</a></li>
    				</ul>
    			</div>
    		</div>
    </div>
        
  <div class="container mt-5 pt-5 border-top">
    <div class="row">
      <div class='col-sm-12'>
        <card-list products='${JSON.stringify(
          this.sliceData(this.state.currentPage)
        )}'></card-list>
      <div class='mt-5'>
        <it-pagination 
          total="${this.state.products.length}"
          limit="${this.state.limit}"
          current="${this.state.currentPage}"
        ></it-pagination>
      </div>
      </div>
    </div>
  </div>
  	`;
  }
}
customElements.define("catalog-page", CatalogPage);
