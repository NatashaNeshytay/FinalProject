import { Component } from "../../../core/Component";

class Footer extends Component {
  render() {
    return `
    <footer class="ftco-footer ftco-section">
      <div class="container mt-5 text-center">
        <p>Copyright &copy; All rights reserved | This template is made with <i class="icon-heart color-danger" aria-hidden="true"></i> by <a href="#" target="_blank">Colorlib</a></p>
      </div>
    </footer>
        `;
  }
}

customElements.define("vegefoods-footer", Footer);
