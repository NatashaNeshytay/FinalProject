// import { APP_EVENTS } from '../../../constants/appEvents';
// import { APP_ROUTES } from '../../../constants/appRoutes';
// import { Component } from '../../../core/Component';
// import { eventEmmiter } from '../../../core/EventEmmiter';
// import { authService } from '../../../services/Auth';

// import '../../molecules/Preloader';
// import '../../organisms/RegisterForm';

// class SignOutPage extends Component {
//   componentDidMount() {
//     authService
//       .signOut()
//       .then(() => {
//         eventEmmiter.emit(APP_EVENTS.changeRoute, { target: APP_ROUTES.signIn });
//         eventEmmiter.emit(APP_EVENTS.authorizeUser, { user: null });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
//   componentWillUnmount() {}

//   render() {
//     return `
//       <it-preloader is-loading="${JSON.stringify(true)}">
//         <h1>You are signed out</h1>    
//       </it-preloader> 
//     `;
//   }
// }

// customElements.define('sign-out-page', SignOutPage);


import { Component } from '../../../core/Component';
import { authService } from '../../../services/Auth';
import { eventEmmiter } from '../../../core/EventEmmiter';
import '../../molecules/Preloader';
import { APP_EVENTS } from '../../../constants/appEvents';
import { APP_ROUTES } from '../../../constants/appRoutes';

class SignOutPage extends Component {
  componentDidMount() {
    authService
      .signOut()
      .then(() => {
        eventEmmiter.emit(APP_EVENTS.changeRoute, { target: APP_ROUTES.signIn });
        eventEmmiter.emit(APP_EVENTS.authorizeUser, { user: null });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return `
            <it-preloader is-loading="${JSON.stringify(true)}">
                <h1>You are signed out...</h1>
            </it-preloader>
        `;
  }
}

customElements.define('sign-out-page', SignOutPage);