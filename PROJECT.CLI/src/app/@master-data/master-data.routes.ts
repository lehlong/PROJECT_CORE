import { Routes } from "@angular/router";

export const masterDataRoutes: Routes = [
  { path: 'organize', loadComponent: () => import('./organize/organize').then(m => m.Organize) },
]