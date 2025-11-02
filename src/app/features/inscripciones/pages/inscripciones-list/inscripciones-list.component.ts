// src/app/features/inscripciones/pages/inscripciones-list/inscripciones-list.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { InscripcionesService } from '../../services/inscripciones.service';
import { Inscripcion } from '../../models/inscripcion.model';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { CursosService } from '../../../cursos/services/cursos.service';
import { Alumno } from '../../../alumnos/models/alumno.model';
import { Curso } from '../../../cursos/models/curso.model';

@Component({
  selector: 'app-inscripciones-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  templateUrl: './inscripciones-list.component.html',
  styleUrls: ['./inscripciones-list.component.scss'],
})
export class InscripcionesListComponent {
  private readonly inscripcionesService = inject(InscripcionesService);
  private readonly alumnosService = inject(AlumnosService);
  private readonly cursosService = inject(CursosService);
  private readonly router = inject(Router);

  filtro = '';
  inscripciones: Inscripcion[] = [];
  alumnos: Alumno[] = [];
  cursos: Curso[] = [];

  columnas: string[] = ['id', 'alumno', 'curso', 'fecha', 'acciones'];

  constructor() {
    this.inscripcionesService.listar().subscribe((lista) => (this.inscripciones = lista));
    this.alumnosService.listar().subscribe((alumnos) => (this.alumnos = alumnos));
    this.cursosService.listar().subscribe((cursos) => (this.cursos = cursos));
  }

  dataSource(): Inscripcion[] {
    const f = this.filtro.trim().toLowerCase();
    if (!f) return this.inscripciones;
    return this.inscripciones.filter((i) => {
      const alumnoNombre = this.obtenerAlumnoNombre(i.alumnoId).toLowerCase();
      const cursoNombre = this.obtenerCursoNombre(i.cursoId).toLowerCase();
      return (
        (i.id ?? '').toLowerCase().includes(f) ||
        alumnoNombre.includes(f) ||
        cursoNombre.includes(f) ||
        (i.fecha ?? '').toLowerCase().includes(f)
      );
    });
  }

  obtenerAlumnoNombre(id: string): string {
    const alumno = this.alumnos.find((a) => a.id === id);
    if (!alumno) return id;
    return `${alumno.nombre} ${alumno.apellido}`.trim();
  }

  obtenerCursoNombre(id: string): string {
    const curso = this.cursos.find((c) => c.id === id);
    return curso ? curso.nombre : id;
  }

  aplicarFiltro(): void {
    // sólo para el template
  }

  nueva(): void {
    this.router.navigate(['/inscripciones/nueva']);
  }

  editar(inscripcion: Inscripcion): void {
    if (!inscripcion?.id) return;
    this.router.navigate(['/inscripciones/editar', inscripcion.id]);
  }

  eliminar(id: string): void {
    if (!id) return;
    if (confirm('¿Eliminar la inscripción?')) {
      this.inscripcionesService.eliminar(id);
    }
  }

  restaurar(): void {
    if (confirm('Esto vuelve a las inscripciones originales del JSON. ¿Continuar?')) {
      this.inscripcionesService.reset();
    }
  }
}
