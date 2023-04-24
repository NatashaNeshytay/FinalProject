import { Component } from "../../../core/Component";
import { APP_STORAGE_KEYS } from "../../../constants/appStorageKeys";
import { storageService } from "../../../services/StorageService";
import { eventEmmiter } from "../../../core/EventEmmiter";
import { APP_EVENTS } from "../../../constants/appEvents";

class CardPage extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  setProducts = (products) => {
    const mapProducts = products
      .filter((item, index, arr) => {
        return arr.findIndex((findItem) => findItem.id === item.id) === index;
      })
      .map((item) => {
        return {
          ...item,
          quantity: item.quantity
            ? item.quantity
            : products.filter((filterItem) => filterItem.id === item.id).length,
        };
      });

    this.setState((state) => {
      return {
        ...state,
        products: mapProducts,
      };
    });
  };

  onDeleteIteem = (evt) => {
    if (evt.target.closest(".minus")) {
      const id = evt.target.dataset.id;
      const items = this.state.products;
      const filteredItems = items
        .map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        })
        .filter((item) => Boolean(item.quantity));
      storageService.setItem(APP_STORAGE_KEYS.cartData, filteredItems);
    }
  };

  onAddIteem = (evt) => {
    if (evt.target.closest(".plus")) {
      const id = evt.target.dataset.id;
      const items = this.state.products;
      // console.log(updatedItems);
      const updatedItems = items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      storageService.setItem(APP_STORAGE_KEYS.cartData, updatedItems);
    }
    // this.setState({ products: updatedItems });
   
  };

   onStorage = (evt) => {
    this.setProducts(evt.detail.data);
  };

  componentDidMount() {
    const products = storageService.getItem(APP_STORAGE_KEYS.cartData);
    this.setProducts(products ?? []);
    this.addEventListener("click", this.onDeleteIteem);
    this.addEventListener("click", this.onAddIteem);
    eventEmmiter.on(APP_EVENTS.storage, this.onStorage);
  }

  componentWillUnmount() {
    eventEmmiter.off(APP_EVENTS.storage, this.onStorage);
    this.removeEventListener("click", this.onDeleteIteem);
    this.removeEventListener("click", this.onAddIteem);
  }
  render() {
    return `
        <h1>CardPage</h1>
          <div class="container mt-5">
            <div class="cart-table table-responsive">
                <table class="table table-bordered text-center">
                <thead>
                    <tr>
                        <th class='pro-id'>id</th>
                        <th class="pro-thumbnail">Картинка</th>
                        <th class="pro-title">Описание</th>
                        <th class="pro-price">Цена</th>
                        <th class="pro-quantity">Колличество</th>
                        <th class="pro-remove">Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.state.products
                      .map((item, index) => {
                        return `              
                    <tr>
                        <td>${index + 1}</td>
                        <td class="pro-thumbnail"><img class="img-fluid" src='${
                          item.image
                        }' alt="Product" /></a></td>
                        <td class="pro-title">${item.title}</td>
                        <td class="pro-price">${item.price} BYN</td>
                        <td class="pro-quantity">
                        <div class="quantity">
                            <div class="cart-plus-minus">
                                <div class="btn minus" data-id="${
                                  item.id
                                }">-</div>
                                <input class="cart-plus-minus-box" value='${
                                  item.quantity
                                }' type="text">
                                <div class="btn plus" data-id="${
                                  item.id
                                }">+</div>
                            </div>
                        </div>
                        <td>
                            <button class='btn btn-secondary minus' data-id="${
                              item.id
                            }">Удалить</button>
                        </td>
                     </tr>
                </tbody> 
                  `;
                      })
                      .join(" ")}
              </tbody>
            </table>
        </div>
    </div>
        
        `;
  }
}

customElements.define("card-page", CardPage);
