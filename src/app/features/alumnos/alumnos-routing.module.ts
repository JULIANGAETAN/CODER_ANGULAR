import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosPageComponent } from './pages/alumnos-page/alumnos-page.component';
import { AlumnosListComponent } from './pages/alumnos-list/alumnos-list.component';
import { AlumnosFormComponent } from './pages/alumnos-form/alumnos-form.component';

const routes: Routes = [
  {
    path: '',
    component: AlumnosPageComponent,
    children: [
      { path: '', component: AlumnosListComponent },
      { path: 'nuevo', component: AlumnosFormComponent },
      { path: ':id/editar', component: AlumnosFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnosRoutingModule {}
