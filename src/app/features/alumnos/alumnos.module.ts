// src/app/features/alumnos/alumnos.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AlumnosRoutingModule } from './alumnos-routing.module';

import { AlumnosListComponent } from './pages/alumnos-list/alumnos-list.component';
import { AlumnosFormComponent } from './pages/alumnos-form/alumnos-form.component';
import { AlumnosPageComponent } from './pages/alumnos-page/alumnos-page.component';

@NgModule({
  declarations: [
    AlumnosListComponent,
    AlumnosFormComponent,
    AlumnosPageComponent,   // 👈 este faltaba
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
})
export class AlumnosModule {}
