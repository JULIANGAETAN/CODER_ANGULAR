import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: 'alumnos',
        loadComponent: () =>
          import('./features/alumnos/pages/alumnos-list.component')
            .then(m => m.AlumnosListComponent),
      },
      { path: '', pathMatch: 'full', redirectTo: 'alumnos' },
    ]
  },
  { path: '**', redirectTo: '' }
];
