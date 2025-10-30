import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosPageComponent } from './pages/cursos-page/cursos-page.component';
import { CursosListComponent } from './pages/cursos-list/cursos-list.component';
import { CursosFormComponent } from './pages/cursos-form/cursos-form.component';

const routes: Routes = [
  {
    path: '',
    component: CursosPageComponent,
    children: [
      { path: '', component: CursosListComponent },
      { path: 'nuevo', component: CursosFormComponent },
      { path: ':id/editar', component: CursosFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosRoutingModule {}
