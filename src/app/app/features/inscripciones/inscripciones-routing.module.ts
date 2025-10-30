import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscripcionesPageComponent } from './pages/inscripciones-page/inscripciones-page.component';
import { InscripcionesListComponent } from './pages/inscripciones-list/inscripciones-list.component';
import { InscripcionesFormComponent } from './pages/inscripciones-form/inscripciones-form.component';

const routes: Routes = [
  {
    path: '',
    component: InscripcionesPageComponent,
    children: [
      { path: '', component: InscripcionesListComponent },
      { path: 'nuevo', component: InscripcionesFormComponent },
      { path: ':id/editar', component: InscripcionesFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscripcionesRoutingModule {}
