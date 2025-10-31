import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosListComponent } from './pages/cursos-list/cursos-list.component';
import { CursosFormComponent } from './pages/cursos-form/cursos-form.component';

const routes: Routes = [
  { path: '', component: CursosListComponent },
  { path: 'nuevo', component: CursosFormComponent },
  { path: 'editar/:id', component: CursosFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosRoutingModule {}
