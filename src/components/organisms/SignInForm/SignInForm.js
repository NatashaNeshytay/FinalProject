import { APP_EVENTS } from "../../../constants/appEvents";
import { Component } from "../../../core/Component";
import { eventEmmiter } from "../../../core/EventEmmiter";
import { getFormData } from "../../../utils/form";

class SignInForm extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
    };
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = getFormData(evt.target);
    if (!email) {
      this.setError("Почта", "Поле обязательно для заполнения");
      return;
    }
    eventEmmiter.emit(APP_EVENTS.signIn, {
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
    <div class="mb-3">
      <label class="form-label w-100">
        <p>Почта<p>
        <input name="email" type="email" class="form-control bg-transparent border-primary">
      </label>
    </div>
    <div class="mb-3">
      <label class="form-label w-100">
        <p>Пароль<p>
        <input name="password" type="password" class="form-control bg-transparent border-primary" required>
      </label>
    </div>
    <div class="mt-2 d-flex justify-content-between">
    <button type="submit" class="btn bg-primary btn-submit text-light">Войти</button>
  </form>
    `;
  }
}

customElements.define("sign-in-form", SignInForm);
