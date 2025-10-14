import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'alumnos',
    loadComponent: () =>
      import('./features/alumnos/pages/alumnos-list.component')
        .then(m => m.AlumnosListComponent),
  },

  { path: '', pathMatch: 'full', redirectTo: 'alumnos' },
  { path: '**', redirectTo: 'alumnos' },
];