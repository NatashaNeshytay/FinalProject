import { Component } from "../../../core/Component";
import { APP_STORAGE_KEYS } from '../../../constants/appStorageKeys';
import { storageService } from '../../../services/StorageService';
import { eventEmmiter } from '../../../core/EventEmmiter';
import { APP_EVENTS } from '../../../constants/appEvents';

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
      if (evt.target.closest('.btn')) {
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
  
    onStorage = (evt) => {
      this.setProducts(evt.detail.data);
    };
  
    componentDidMount() {
      const products = storageService.getItem(APP_STORAGE_KEYS.cartData);
      this.setProducts(products ?? []);
      this.addEventListener('click', this.onDeleteIteem);
      eventEmmiter.on(APP_EVENTS.storage, this.onStorage);
    }
  
    componentWillUnmount() {
      eventEmmiter.off(APP_EVENTS.storage, this.onStorage);
    }
    render() {
    return `
        <h1>CardPage</h1>
        <div class="container mt-5">
        <div class="cart-table table-responsive">
        <table class="table table-bordered">
              <thead>
                <tr>
               
                
                  <th class='pro-id'>id</th>
                  <th class="pro-thumbnail">Image</th>
                  <th class="pro-title">Product</th>
                  <th class="pro-price">Price</th>
                  <th class="pro-quantity">Quantity</th>
                  
                  <th class="pro-remove">Remove</th>
                </tr>
              </thead>
              <tbody>
                ${this.state.products
                  .map((item, index) => {
                    return `
                  
                  
                
                <tbody>
                <tr>
                <td>${index + 1}</td>
                <td class="pro-thumbnail"><img class="img-fluid" src='${item.image}' alt="Product" /></a></td>
                <td class="pro-title">${item.title}</td>
                <td class="pro-price">${item.price} BYN</td>
                <td class="pro-quantity">
                    <div class="quantity">
                        <div class="cart-plus-minus">
                            <input class="cart-plus-minus-box" value='${item.quantity}' type="text">
                            <div class="dec qtybutton">-</div>
                            <div class="inc qtybutton">+</div>
                            <div class="dec qtybutton"><i class="fa fa-minus"></i></div>
                            <div class="inc qtybutton"><i class="fa fa-plus"></i></div>
                        </div>
                    </div>
                </td>
           
                <td>
                <button class='btn btn-secondary' data-id="${item.id}">Удалить</button>
              </td>
            </tr>
            </tbody> 

                  `;
                  })
                  .join(' ')}
              </tbody>
            </table>
         </div>
         </div>
        

        `;
    }
}

customElements.define('card-page', CardPage);

{/* <div class="container">

        <div class="cart-table table-responsive">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th class="pro-thumbnail">Image</th>
                    <th class="pro-title">Product</th>
                    <th class="pro-price">Price</th>
                    <th class="pro-quantity">Quantity</th>
                    <th class="pro-subtotal">Total</th>
                    <th class="pro-remove">Remove</th>
                </tr>
            </thead>
            <tbody>
            ${this.state.products
                .map((item, index) => {
                  return `
            <tr>
            <td class="pro-thumbnail"><a href="#"><img class="img-fluid" src='${item.image}' alt="Product" /></a></td>
            <td class="pro-title">${item.title}</td>
            <td class="pro-price"><span>$295.00</span></td>
            <td class="pro-quantity">
                <div class="quantity">
                    <div class="cart-plus-minus">
                        <input class="cart-plus-minus-box" value="0" type="text">
                        <div class="dec qtybutton">-</div>
                        <div class="inc qtybutton">+</div>
                        <div class="dec qtybutton"><i class="fa fa-minus"></i></div>
                        <div class="inc qtybutton"><i class="fa fa-plus"></i></div>
                    </div>
                </div>
            </td>
            <td class="pro-subtotal"><span>$295.00</span></td>
            <td class="pro-remove"><a href="#"><i class="ion-trash-b"></i></a></td>
        </tr>
        `;
    })
    .join(' ')}
                
            </tbody>
        </table>
    </div>
    </div>
    */}