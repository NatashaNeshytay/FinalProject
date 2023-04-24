// import { Component } from '../../../core/Component';

// import Swiper, { Navigation, Pagination } from 'swiper';

// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// class Slider extends Component {
//   static observedAttributes() {
//     return ['slider'];
//   }

//   initSwiper() {
//     new Swiper('.it-slider-swiper', {
//       modules: [Navigation, Pagination],
//       pagination: {
//         el: '.swiper-pagination',
//       },
//       navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//       },
//     });
//   }

//   componentDidMount() {
//     this.initSwiper();
//   }

//   render() {
//     return `
//     <div class="swiper">
//         <div class="swiper-wrapper">
            
//         </div>
        
//         <div class="swiper-pagination"></div>
//         <div class="swiper-button-prev"></div>
//         <div class="swiper-button-next"></div>
//     </div>
    
//     `;
//   }
// }

// customElements.define('it-slideer', Slider);