// import { APP_EVENTS } from '../../../constants/appEvents';
// import { APP_ROUTES } from '../../../constants/appRoutes';
// import { Component } from '../../../core/Component';
// import { eventEmmiter } from '../../../core/EventEmmiter';
// import { authService } from '../../../services/Auth';
// import '../../molecules/Preloader';
// import '../../organisms/SignInForm';

// class SignInPage extends Component {
//   constructor() {
//     super();
//     this.state = {
//       isLoading: false,
//       errorMessage: '',
//     };
//   }

//   setIsLoading = (isLoading) => {
//     this.setState((state) => {
//       return {
//         ...state,
//         isLoading,
//       };
//     });
//   };

//   setError(error) {
//     this.setState((state) => {
//       return {
//         ...state,
//         errorMessage: error,
//       };
//     });
//   }

//   signIn = async ({ detail }) => {
//     const { data } = detail;
//     this.setIsLoading(true);
//     try {
//       const user = await authService.signIn(data.email, data.password);
//       eventEmmiter.emit(APP_EVENTS.authorizeUser, { user });
//       eventEmmiter.emit(APP_EVENTS.changeRoute, { target: APP_ROUTES.catalog });
//     } catch (error) {
//       this.setError(error.message);
//     } finally {
//       this.setIsLoading(false);
//     }
//   };

//   componentDidMount() {
//     eventEmmiter.on(APP_EVENTS.signIn, this.signIn);
//   }

//   componentWillUnmount() {
//     eventEmmiter.off(APP_EVENTS.signIn, this.signIn);
//   }

//   render() {
//     const message = this.state.errorMessage;
//     return `
//     <it-preloader is-loading="${this.state.isLoading}">
//         <div class="container mt-5">
//             <h1 class="text-center mt-5">Вход / SignIn</h1>
//             <div class="row justify-content-center mt-5">
//                 <div class="col-6">
//                     <div class="border p-4">
//                         ${message ? `<div class="invalid-feedback d-block">${message}</div>` : ''}
//                         <sign-in-form></sign-in-form>
//                     </div>
//                 </div>
//             </div>    
//         </div>
//     </it-preloader>    
//     `;
//   }
// }

// customElements.define('sign-in-page', SignInPage);

import { Component } from '../../../core/Component';

import '../../organisms/SignInForm';
import '../../molecules/Preloader';
import { eventEmmiter } from '../../../core/EventEmmiter';
import { APP_EVENTS } from '../../../constants/appEvents';
import { authService } from '../../../services/Auth';
import { APP_ROUTES } from '../../../constants/appRoutes';

class SignInPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      errorMessage: '',
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

  signIn = async ({ detail }) => {
    const { data } = detail;
    this.setIsLoading(true);
    try {
      const user = await authService.signIn(data.email, data.password);
      eventEmmiter.emit(APP_EVENTS.authorizeUser, { user });
      eventEmmiter.emit(APP_EVENTS.changeRoute, { target: APP_ROUTES.catalog });
    } catch (error) {
      this.setError(error.message);
    } finally {
      this.setIsLoading(false);
    }
  };

  componentDidMount() {
    eventEmmiter.on(APP_EVENTS.signIn, this.signIn);
  }

  componentWillUnmount() {
    eventEmmiter.off(APP_EVENTS.signIn, this.signIn);
  }

  render() {
    const message = this.state.errorMessage;

    return `
        <it-preloader is-loading="${this.state.isLoading}">
            <div class="container mt-5">
                <h1 class="text-center mt-5">Sign In</h1>
                <div class="row justify-content-center mt-5">
                    <div class="col-6">
                        <div class="border p-5">
                            <div class="invalid-feedback d-block">${message}</div>
                            <sign-in-form></sign-in-form>
                        </div>
                    </div>
                <div>
            </div>
        </it-preloader>
    `;
  }
}

customElements.define('sign-in-page', SignInPage);