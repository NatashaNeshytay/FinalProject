import { Component } from "../../../core/Component";
import "../../molecules/Slider";
import { slides } from "./constants";

class BlogPage extends Component {
  render() {
    return `
    <div class="container mt-5" >
      <vegefood-slider slides='${JSON.stringify(slides)}'></vegefood-slider>
    </div>  
      `;
  }
}

customElements.define("blog-page", BlogPage);

