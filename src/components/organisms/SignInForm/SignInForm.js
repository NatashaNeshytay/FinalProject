import { APP_EVENTS } from '../../../constants/appEvents';
import { Component } from '../../../core/Component';
import { eventEmmiter } from '../../../core/EventEmmiter';
import { getFormData } from '../../../utils/form';

class SignInForm extends Component {
  onSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = getFormData(evt.target);
    eventEmmiter.emit(APP_EVENTS.signIn, {
      data: {
        email,
        password,
      },
    });
  };

  componentDidMount() {
    this.addEventListener('submit', this.onSubmit);
  }

  componentWillUnmount() {
    this.removeEventListener('submit', this.onSubmit);
  }

  render() {
    return `
      <form>
        <div class="mb-3">
          <label class="form-label w-100">
            <p>Введите Ваш Email<p>
            <input name="email" type="emails" class="form-control">
          </label>
        </div>
        <div class="mb-3">
          <label class="form-label w-100">
            <p>Введите пароль<p>
            <input name="password" type="password" class="form-control" required>
          </label>
        </div>
        <button type="submit" class="btn btn-primary">Выполнить вход</button>
      </form>


      <div class="login-register-area mt-no-text mb-no-text">
            <div class="container container-default-2 custom-area">
                <div class="row">
                    <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-custom">
                        <div class="login-register-wrapper">
                            <div class="section-content text-center mb-5">
                                <h2 class="title-4 mb-2">Login</h2>
                                <p class="desc-content">Please login using account detail bellow.</p>
                            </div>
                            <form action="#" method="post">
                                <div class="single-input-item mb-3">
                                    <input type="email" placeholder="Email or Username">
                                </div>
                                <div class="single-input-item mb-3">
                                    <input type="password" placeholder="Enter your Password">
                                </div>
                                <div class="single-input-item mb-3">
                                    <div class="login-reg-form-meta d-flex align-items-center justify-content-between">
                                        <div class="remember-meta mb-3">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="rememberMe">
                                                <label class="custom-control-label" for="rememberMe">Remember Me</label>
                                            </div>
                                        </div>
                                        <a href="#" class="forget-pwd mb-3">Forget Password?</a>
                                    </div>
                                </div>
                                <div class="single-input-item mb-3">
                                    <button class="btn obrien-button-2 primary-color">Login</button>
                                </div>
                                <div class="single-input-item">
                                    <a href="register.html">Creat Account</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    `;
  }
}

customElements.define('sign-in-form', SignInForm);
