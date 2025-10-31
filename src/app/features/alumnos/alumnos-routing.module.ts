// src/app/features/alumnos/alumnos-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosPageComponent } from './pages/alumnos-page/alumnos-page.component';
import { AlumnosFormComponent } from './pages/alumnos-form/alumnos-form.component';

const routes: Routes = [
  { path: '', component: AlumnosPageComponent },
  { path: 'nuevo', component: AlumnosFormComponent },
  { path: 'editar/:id', component: AlumnosFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnosRoutingModule {}
