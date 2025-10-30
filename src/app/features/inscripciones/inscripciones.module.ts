import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';

import { InscripcionesPageComponent } from './pages/inscripciones-page/inscripciones-page.component';
import { InscripcionesListComponent } from './pages/inscripciones-list/inscripciones-list.component';
import { InscripcionesFormComponent } from './pages/inscripciones-form/inscripciones-form.component';

@NgModule({
  declarations: [
    InscripcionesPageComponent,
    InscripcionesListComponent,
    InscripcionesFormComponent
  ],
  imports: [SharedModule, ReactiveFormsModule, InscripcionesRoutingModule],
})
export class InscripcionesModule {}
