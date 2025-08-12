import { Routes } from '@angular/router';
import AuthGuard from './services/config/auth.guard.config';
import UnauthGuard from './services/config/auth.unguard.config';
import { systemManagerRoutes } from './@system-manager/system-manager.routes';
import { masterDataRoutes } from './@master-data/master-data.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout').then(m => m.MainLayout),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./layouts/home/home').then(m => m.Home), canActivate: [AuthGuard] },

      {
        path: 'system-manager',
        loadChildren: () => import('./@system-manager/system-manager.routes').then(m => m.systemManagerRoutes),
        canActivate: [AuthGuard],
      },
      {
        path: 'master-data',
        loadChildren: () => import('./@master-data/master-data.routes').then(m => m.masterDataRoutes),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '',
    loadComponent: () => import('./layouts/blank-layout/blank-layout').then(m => m.BlankLayout),
    children: [
      { path: 'login', loadComponent: () => import('./@authentication/login').then(m => m.Login), canActivate: [UnauthGuard] },
      { path: 'error-server', loadComponent: () => import('./layouts/error-server/error-server').then(m => m.ErrorServer), canActivate: [UnauthGuard] },
      { path: 'maintain-server', loadComponent: () => import('./layouts/maintain-server/maintain-server').then(m => m.MaintainServer), canActivate: [UnauthGuard] },
      { path: 'un-authen', loadComponent: () => import('./layouts/un-authen/un-authen').then(m => m.UnAuthen), canActivate: [UnauthGuard] },
    ],
  },
  { path: '**', loadComponent: () => import('./layouts/not-found/not-found').then(m => m.NotFound) },
];
