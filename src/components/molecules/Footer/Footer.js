import { Component } from "../../../core/Component";

class Footer extends Component {
  render() {
    return `
    <footer class="ftco-footer ftco-section">
      <div class="container mt-5 text-center">
        <p>&copy; 2023 | Все права защищены <a class="text-decoration-none" href="#" target="_blank">VeggieFOOD</a></p>
      </div>
    </footer>
        `;
  }
}

customElements.define("vegefoods-footer", Footer);
