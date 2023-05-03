import { APP_EVENTS } from '../../../constants/appEvents';
import { Component } from '../../../core/Component';
import { eventEmmiter } from '../../../core/EventEmmiter';

class CategoryItems extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: null,
    };
  }

  static get observedAttributes() {
    return ['items'];
  }

  setActiveCategory = (activeItem) => {
    this.setState(() => {
      return {
        activeItem,
      };
    });
  };

  setCategory = (evt) => {
    evt.preventDefault();
    if (evt.target.closest('.nav-link')) {
      const id = evt.target.dataset.id;
      const items = JSON.parse(this.props.items);
      const selectedCategory = items.find((item) => item.id === id);
      this.setActiveCategory(selectedCategory);
      eventEmmiter.emit(APP_EVENTS.setCategory, { selectedCategory });
    }
  };

  // setCategory = (evt) => {
  //   evt.preventDefault();
  //   if (evt.target.closest('.category-link')) {
  //     const id = evt.target.dataset.id;
  //     const items = JSON.parse(this.props.items);
  //     const selectedCategory = items.find((item) => item.id === id);
  //     this.setActiveCategory(selectedCategory);
  //     eventEmmiter.emit(APP_EVENTS.setCategory, { selectedCategory });
  //   }
  // };

  componentDidMount() {
    const items = JSON.parse(this.props.items);
    this.setActiveCategory(items[0]);
    this.addEventListener('click', this.setCategory);
  }

  componentWillUnmount() {
    this.removeEventListener('click', this.setCategory);
  }

  render() {
    const items = JSON.parse(this.props.items);
    const { activeItem } = this.state;

    console.log(items)

    return `
        <ul class="navbar-nav">
            ${items
              
              .map((item) => {
                const isActive = activeItem?.id === item.id;
                return `
                <li class="nav-item">
                    <a class="nav-link ${isActive ? 'active' : ''}" href="#" data-id="${item.id}">${
                  item.name
                }</a>
                </li>
                `;
              })
              .join(' ')}
        </ul>
    `;
  }
}

customElements.define('category-items', CategoryItems);
