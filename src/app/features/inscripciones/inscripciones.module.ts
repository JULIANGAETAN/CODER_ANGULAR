import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { InscripcionesListComponent } from './pages/inscripciones-list/inscripciones-list.component';
import { InscripcionesFormComponent } from './pages/inscripciones-form/inscripciones-form.component';

@NgModule({
  declarations: [InscripcionesListComponent, InscripcionesFormComponent],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class InscripcionesModule {}
