import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosListComponent } from '../alumnos-list/alumnos-list.component';

@Component({
  selector: 'app-alumnos-page',
  standalone: true,
  templateUrl: './alumnos-page.component.html',
  styleUrls: ['./alumnos-page.component.scss'],
  imports: [CommonModule, AlumnosListComponent],
})
export class AlumnosPageComponent {}
