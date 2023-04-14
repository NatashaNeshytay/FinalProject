import { Component } from "../../../core/Component";

class CardPage extends Component {
  render() {
    return `
        <h1>CardPage</h1>


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
                <tr>
                    <td class="pro-thumbnail"><a href="#"><img class="img-fluid" src="assets/images/product/small-size/1.jpg" alt="Product" /></a></td>
                    <td class="pro-title"><a href="#">Product dummy title <br> s / green</a></td>
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
                <tr>
                    <td class="pro-thumbnail"><a href="#"><img class="img-fluid" src="assets/images/product/small-size/2.jpg" alt="Product" /></a></td>
                    <td class="pro-title"><a href="#">Product title here <br> red</a></td>
                    <td class="pro-price"><span>$275.00</span></td>
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
                    <td class="pro-subtotal"><span>$550.00</span></td>
                    <td class="pro-remove"><a href="#"><i class="ion-trash-b"></i></a></td>
                </tr>
                <tr>
                    <td class="pro-thumbnail"><a href="#"><img class="img-fluid" src="assets/images/product/small-size/3.jpg" alt="Product" /></a></td>
                    <td class="pro-title"><a href="#">Product dummy title <br> s</a></td>
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
                <tr>
                    <td class="pro-thumbnail"><a href="#"><img class="img-fluid" src="assets/images/product/small-size/4.jpg" alt="Product" /></a></td>
                    <td class="pro-title"><a href="#">Dummy Title</a></td>
                    <td class="pro-price"><span>$110.00</span></td>
                    <td class="pro-quantity">
                        <div class="quantity">
                            <div class="cart-plus-minus">
                                <input class="cart-plus-minus-box" value="2" type="text">
                                <div class="dec qtybutton">-</div>
                                <div class="inc qtybutton">+</div>
                                <div class="dec qtybutton"><i class="fa fa-minus"></i></div>
                                <div class="inc qtybutton"><i class="fa fa-plus"></i></div>
                            </div>
                        </div>
                    </td>
                    <td class="pro-subtotal"><span>$110.00</span></td>
                    <td class="pro-remove"><a href="#"><i class="ion-trash-b"></i></a></td>
                </tr>
            </tbody>
        </table>
    </div>
      `;
  }
}

customElements.define('card-page', CardPage);