import { Component } from "../../../core/Component";
import Swiper, { Navigation, Pagination } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./slider.scss";

class Slider extends Component {
  static get observedAttributes() {
    return ["slides", "width", "height"];
  }

  initSwiper() {
    new Swiper(".it-slider-swiper", {
      modules: [Navigation, Pagination],
      pagination: {
        el: ".swiper-pagination",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      scrollbar: {
        el: ".swiper-scrollbar",
      },
      loop: {
        boolean: "true",
      },
    });
  }

  componentDidMount() {
    this.initSwiper();
  }

  render() {
    const { width, height } = this.props;
    return `
    <div class="it-slider-swiper swiper" style="height: ${
      height ?? "300px"
    }; width: ${width ?? "100%"}">
        <div class="swiper-wrapper">
            ${JSON.parse(this.props.slides)
              .map((slide) => {
                return `
                <div class="swiper-slide">${slide}</div>
                `;
              })
              .join(" ")}
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
    `;
  }
}

customElements.define("vegefood-slider", Slider);
