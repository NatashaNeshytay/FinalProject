import { Component } from "../../../core/Component";
import { APP_STORAGE_KEYS } from "../../../constants/appStorageKeys";
import { storageService } from "../../../services/StorageService";
import { eventEmmiter } from "../../../core/EventEmmiter";
import { APP_EVENTS } from "../../../constants/appEvents";
import "./cardPage.scss";

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

  allSum(products) {
    return products.reduce((acc, item) => {
      return (acc += item.quantity ? item.price * item.quantity : item.price);
    }, 0);
  }

  render() {
    return `
    <div class="container mt-5">
      <div class="cart-table table-responsive">
        <table class="table table-bordered text-center">
          <thead class="table-info">
            <tr>
              <th class='pro-id'>id</th>
              <th class="pro-thumbnail">Картинка</th>
              <th class="pro-title">Наименование</th>
              <th class="pro-price">Цена</th>
              <th class="pro-quantity">Кол-во</th>
              <th class="pro-remove">Удалить</th>
            </tr>
          </thead>
          <tbody>
                    ${this.state.products
                      .map((item, index) => {
                        const price = item.price * item.quantity;
                        return `              
            <tr>
              <td>${index + 1}</td>
              <td class="pro-thumbnail col-3"><img class="img-fluid img-fix" src='${
                item.image
              }' alt="Product" /></a></td>
              <td class="pro-title">${item.title}</td>
              <td class="pro-price">${price} BYN</td>
              <td class="pro-quantity">
          <div class="quantity d-flex align-items-center justify-content-center">
            <div class="cart-plus-minus">
              <div class="btn minus border border-primary" data-id="${
                item.id
              }">-</div>
                <span class="cart-plus-minus-box m-3">
                                ${item.quantity}
                                </span>
              <div class="btn plus border border-primary" data-id="${
                item.id
              }">+</div>
            </div>
          </div>
              <td>
                <button class='btn btn-primary minus' data-id="${
                  item.id
                }">Удалить</button>
              </td>
            </tr>
          </tbody> 
                  `;
                      })
                      .join(" ")}
          <tfooter>
            <tr>
              <td colspan="6" class="text-end pe-5"><b class="me-4">Итого:</b> ${new Intl.NumberFormat(
                "ru-Ru",
                {
                  style: "currency",
                  currency: "BYN",
                }
              ).format(this.allSum(this.state.products))}</td>
            </tr>
          </tfooter>
        </table>
      </div>
    </div>    
        `;
  }
}

customElements.define("card-page", CardPage);
