import { APP_ROUTES } from './appRoutes';

export const routes = {
 
  catalog: { 
    href: APP_ROUTES.catalog, 
    component: 'catalog-page' 
  },

  blog: { 
    href: APP_ROUTES.blog, 
    component: 'blog-page' 
  },
  
  card: { 
    href: APP_ROUTES.card, 
    component: 'card-page' 
  },

  admin: { 
    href: APP_ROUTES.admin, 
    component: 'admin-page' 
  },
  
  signUp: { 
    href: APP_ROUTES.signUp, 
    component: 'sign-up-page' 
  },

  signIn: { 
    href: APP_ROUTES.signIn, 
    component: 'sign-in-page' 
  },

  signOut: { href: APP_ROUTES.signOut, component: 'sign-out-page' },

  error: { 
    href: '*', 
    component: 'error-page' 
  },
};
