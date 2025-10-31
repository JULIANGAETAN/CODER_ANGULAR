import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'alumnos',
    loadChildren: () =>
      import('./features/alumnos/alumnos.module').then((m) => m.AlumnosModule),
  },
  {
    path: 'cursos',
    loadChildren: () =>
      import('./features/cursos/cursos.module').then((m) => m.CursosModule),
  },
  {
    path: 'inscripciones',
    loadChildren: () =>
      import('./features/inscripciones/inscripciones.module').then(
        (m) => m.InscripcionesModule
      ),
  },
  { path: '', redirectTo: 'alumnos', pathMatch: 'full' },
  { path: '**', redirectTo: 'alumnos' },
];
