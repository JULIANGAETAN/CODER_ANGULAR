// src/app/features/alumnos/pages/alumnos-list/alumnos-list.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Material que usa TU HTML
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

import { Router } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';
import { Alumno } from '../../models/alumno.model';

@Component({
  selector: 'app-alumnos-list',
  standalone: true,
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
})
export class AlumnosListComponent {
  private readonly alumnosService = inject(AlumnosService);
  private readonly router = inject(Router);

  filtro = '';
  alumnos: Alumno[] = [];

  // mismas columnas que tu HTML
  columnas: string[] = ['id', 'nombre', 'apellido', 'email', 'activo', 'acciones'];

  constructor() {
    // me engancho al BehaviorSubject del service
    this.alumnosService.listar().subscribe((lista) => {
      this.alumnos = lista;
    });
  }

  // para que el HTML pueda hacer [dataSource]="dataSource"
  get dataSource(): Alumno[] {
    return this.alumnosFiltrados();
  }

  alumnosFiltrados(): Alumno[] {
    const f = this.filtro.trim().toLowerCase();
    if (!f) return this.alumnos;

    return this.alumnos.filter((a) =>
      (a.id ?? '').toLowerCase().includes(f) ||
      (a.nombre ?? '').toLowerCase().includes(f) ||
      (a.apellido ?? '').toLowerCase().includes(f) ||
      (a.email ?? '').toLowerCase().includes(f)
    );
  }

  aplicarFiltro(): void {
    // el HTML lo llama, así que lo dejo
  }

  agregarAlumno(): void {
    this.router.navigate(['/alumnos/nuevo']);
  }

  editarAlumno(alumno: Alumno): void {
    if (!alumno?.id) return;
    this.router.navigate(['/alumnos/editar', alumno.id]);
  }

  eliminarAlumno(id: string): void {
    if (!id) return;
    if (confirm('¿Seguro que querés eliminar este alumno?')) {
      this.alumnosService.eliminar(id);
    }
  }

  restaurarDatos(): void {
    if (confirm('Esto vuelve a los datos originales del JSON. ¿Continuar?')) {
      this.alumnosService.reset();
    }
  }
}
