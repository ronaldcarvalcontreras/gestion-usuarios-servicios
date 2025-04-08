import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'services',
    loadChildren: () =>
      import('./features/services/service.routes').then((m) => m.SERVICE_ROUTES),    
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./features/contact/contact.routes').then((m) => m.CONTACT_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];