import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CursosRoutingModule } from './cursos-routing.module';

import { CursosPageComponent } from './pages/cursos-page/cursos-page.component';
import { CursosListComponent } from './pages/cursos-list/cursos-list.component';
import { CursosFormComponent } from './pages/cursos-form/cursos-form.component';

@NgModule({
  declarations: [
    CursosPageComponent,
    CursosListComponent,
    CursosFormComponent
  ],
  imports: [SharedModule, ReactiveFormsModule, CursosRoutingModule],
})
export class CursosModule {}
