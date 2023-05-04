import { APP_EVENTS } from "../../../constants/appEvents";
import { Component } from "../../../core/Component";
import { eventEmmiter } from "../../../core/EventEmmiter";
import { getFormData } from "../../../utils/form";

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
    };
  }

  setError = (key, message) => {
    this.setState((state) => {
      return {
        ...state,
        errors: {
          ...state.errors,
          [key]: message,
        },
      };
    });
  };

  onSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = getFormData(evt.target);
    if (!email) {
      this.setError("Почта", "Поле обязательно для заполнения");
      return;
    }

    eventEmmiter.emit(APP_EVENTS.signUp, {
      data: {
        email,
        password,
      },
    });
  };

  componentDidMount() {
    this.addEventListener("submit", this.onSubmit);
  }

  componentWillUnmount() {
    this.removeEventListener("submit", this.onSubmit);
  }

  render() {
    return `
    <form>
      <div>
        <label class="form-label w-100">
          <p>Почта<p>
          <input name="email" type="email" class="form-control bg-transparent border-primary">
        </label>${
          this.state.errors.email
            ? `
        <div class="invalid-feedback">
          ${this.state.errors.email.message}
        </div>
       `
            : ""
        }
      </div>
      <div>
        <label class="form-label w-100">
          <p>Пароль<p>
          <input name="password" type="password" class="form-control bg-transparent border-primary" required>
        </label>
      </div>
      <div class="mb-">
        <label class="form-label w-100">
        <p>Подтвердите пароль<p>
        <input name="confirm-password" type="password" class="form-control bg-transparent border-primary" required>
      </label>
      </div>
    <button type="submit" class="btn bg-primary text-light">Регистрация</button>
  </form>

    `;
  }
}

customElements.define("register-form", RegisterForm);
