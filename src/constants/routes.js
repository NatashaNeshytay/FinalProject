import { APP_ROUTES } from './appRoutes';

export const routes = {
  home: { 
    href: APP_ROUTES.home, 
    component: 'home-page' 
  },
  catalog: { 
    href: APP_ROUTES.catalog, 
    component: 'catalog-page' 
  },
  contacts: { 
    href: APP_ROUTES.contacts, 
    component: 'contacts-page' 
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
  
  error: { 
    href: '*', 
    component: 'error-page' 
  },
};
