import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AlumnosRoutingModule } from './alumnos-routing.module';

import { AlumnosPageComponent } from './pages/alumnos-page/alumnos-page.component';
import { AlumnosListComponent } from './pages/alumnos-list/alumnos-list.component';
import { AlumnosFormComponent } from './pages/alumnos-form/alumnos-form.component';

@NgModule({
  declarations: [
    AlumnosPageComponent,
    AlumnosListComponent,
    AlumnosFormComponent,
  ],
  imports: [
    SharedModule,        // 👈 acá entra el MatPaginatorModule
    ReactiveFormsModule,
    AlumnosRoutingModule,
  ],
})
export class AlumnosModule {}
