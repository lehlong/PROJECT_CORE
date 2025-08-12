import { Routes } from "@angular/router";

export const systemManagerRoutes: Routes = [
   { path: 'profile', loadComponent: () => import('./profile/profile').then(m => m.Profile) },
   { path: 'document-system', loadComponent: () => import('./document-system/document-system').then(m => m.DocumentSystem) },
   { path: 'message-system', loadComponent: () => import('./message-system/message-system').then(m => m.MessageSystem) },
   { path: 'menu', loadComponent: () => import('./menu/menu').then(m => m.Menu) },
   { path: 'right', loadComponent: () => import('./right/right').then(m => m.Right) },
   { path: 'log-system', loadComponent: () => import('./log-system/log-system').then(m => m.LogSystem) },
   { path: 'status-system', loadComponent: () => import('./status-system/status-system').then(m => m.StatusSystem) },
   { path: 'background-jobs', loadComponent: () => import('./background-jobs/background-jobs').then(m => m.BackgroundJobs) },
   { path: 'history-login', loadComponent: () => import('./history-login/history-login').then(m => m.HistoryLogin) },
   { path: 'status-integration', loadComponent: () => import('./status-integration/status-integration').then(m => m.StatusIntegration) },
   { path: 'account', loadComponent: () => import('./account/account').then(m => m.Account) },
   { path: 'account-group', loadComponent: () => import('./account-group/account-group').then(m => m.AccountGroup) },
];