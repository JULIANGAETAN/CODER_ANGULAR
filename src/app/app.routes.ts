import { Routes } from '@angular/router';

// 📦 ALUMNOS
import { AlumnosListComponent } from './features/alumnos/pages/alumnos-list/alumnos-list.component';
import { AlumnosFormComponent } from './features/alumnos/pages/alumnos-form/alumnos-form.component';

// 📦 CURSOS
import { CursosListComponent } from './features/cursos/pages/cursos-list/cursos-list.component';
import { CursosFormComponent } from './features/cursos/pages/cursos-form/cursos-form.component';

// 📦 INSCRIPCIONES
import { InscripcionesListComponent } from './features/inscripciones/pages/inscripciones-list/inscripciones-list.component';
import { InscripcionesFormComponent } from './features/inscripciones/pages/inscripciones-form/inscripciones-form.component';

export const routes: Routes = [
  // home
  { path: '', pathMatch: 'full', redirectTo: 'alumnos' },

  // 👉 ALUMNOS
  { path: 'alumnos', component: AlumnosListComponent },
  { path: 'alumnos/nuevo', component: AlumnosFormComponent },
  { path: 'alumnos/editar/:id', component: AlumnosFormComponent },

  // 👉 CURSOS
  { path: 'cursos', component: CursosListComponent },
  { path: 'cursos/nuevo', component: CursosFormComponent },
  { path: 'cursos/editar/:id', component: CursosFormComponent },

  // 👉 INSCRIPCIONES
  { path: 'inscripciones', component: InscripcionesListComponent },
  { path: 'inscripciones/nueva', component: InscripcionesFormComponent },
  { path: 'inscripciones/editar/:id', component: InscripcionesFormComponent },

  // cualquier otra cosa -> alumnos
  { path: '**', redirectTo: 'alumnos' },
];
