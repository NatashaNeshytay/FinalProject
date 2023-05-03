import { APP_EVENTS } from "../../../constants/appEvents";
import { APP_ROUTES } from "../../../constants/appRoutes";
import { Component } from "../../../core/Component";
import { eventEmmiter } from "../../../core/EventEmmiter";
import { authService } from "../../../services/Auth";
import "../../molecules/Preloader";
import "../../organisms/RegisterForm";
import { storageService } from "../../../services/StorageService";

class SignUpPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      errorMessage: "",
    };
  }

  setIsLoading = (isLoading) => {
    this.setState((state) => {
      return {
        ...state,
        isLoading,
      };
    });
  };

  setError(error) {
    this.setState((state) => {
      return {
        ...state,
        errorMessage: error,
      };
    });
  }

  register = async ({ detail }) => {
    const { data } = detail;
    this.setIsLoading(true);
    try {
      const user = await authService.signUp(data.email, data.password);
      storageService.setItem("user", user);
      eventEmmiter.emit(APP_EVENTS.authorizeUser, { user });
      eventEmmiter.emit(APP_EVENTS.changeRoute, { target: APP_ROUTES.home });
    } catch (error) {
      this.setError(error.message);
    } finally {
      this.setIsLoading(false);
    }
  };

  componentDidMount() {
    eventEmmiter.on(APP_EVENTS.signUp, this.register);
  }
  componentWillUnmount() {
    eventEmmiter.off(APP_EVENTS.signUp, this.register);
  }

  render() {
    const message = this.state.errorMessage;
    return `
    <it-preloader is-loading="${this.state.isLoading}">
    <div class="container">
        <h1 class="text-center mt-1">Регистрация</h1>
        <div class="row justify-content-center mt-5">
          <div class="col-6">
             <div class="border p-5 border-primary border-2 rounded">
                <div class="invalid-feedback d-block">${message}</div>
                <register-form></register-form>
             </div>
          </div>
        </div>
    </div>
  </it-preloader>    
    `;
  }
}

customElements.define("sign-up-page", SignUpPage);
