import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AlumnosRoutingModule } from './alumnos-routing.module';

import { AlumnosPageComponent } from './pages/alumnos-page/alumnos-page.component';
import { AlumnosListComponent } from './pages/alumnos-list/alumnos-list.component';
import { AlumnosFormComponent } from './pages/alumnos-form/alumnos-form.component';

// Angular Material (los que estás usando en el HTML)
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AlumnosPageComponent,
    AlumnosListComponent,
    AlumnosFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,          // <--- para que funcione router-outlet
    AlumnosRoutingModule,
    // Material
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
})
export class AlumnosModule {}
