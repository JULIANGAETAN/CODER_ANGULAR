import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

import { Router } from '@angular/router';
import { InscripcionesService } from '../../services/inscripciones.service';
import { CursosService } from '../../../cursos/services/cursos.service';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { Inscripcion } from '../../models/inscripcion.model';
import { Alumno } from '../../../alumnos/models/alumno.model';
import { Curso } from '../../../cursos/models/curso.model';

@Component({
  selector: 'app-inscripciones-list',
  standalone: true,
  templateUrl: './inscripciones-list.component.html',
  styleUrls: ['./inscripciones-list.component.scss'],
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
    this.inscripcionesService.listar().subscribe((lista) => {
      this.inscripciones = lista;
    });

    this.alumnosService.listar().subscribe((al) => (this.alumnos = al));
    this.cursosService.listar().subscribe((cu) => (this.cursos = cu));
  }

  get dataSource(): Inscripcion[] {
    const f = this.filtro.trim().toLowerCase();
    if (!f) return this.inscripciones;
    return this.inscripciones.filter((i) => {
      const alu = this.getAlumnoNombre(i.alumnoId);
      const cur = this.getCursoNombre(i.cursoId);
      return (
        (i.id ?? '').toLowerCase().includes(f) ||
        alu.toLowerCase().includes(f) ||
        cur.toLowerCase().includes(f)
      );
    });
  }

  getAlumnoNombre(id: string): string {
    return this.alumnos.find((a) => a.id === id)?.nombre ?? id;
  }

  getCursoNombre(id: string): string {
    return this.cursos.find((c) => c.id === id)?.nombre ?? id;
  }

  nueva(): void {
    this.router.navigate(['/inscripciones/nueva']);
  }

  editar(insc: Inscripcion): void {
    if (!insc?.id) return;
    this.router.navigate(['/inscripciones/editar', insc.id]);
  }

  eliminar(id: string): void {
    if (!id) return;
    if (confirm('¿Seguro que querés eliminar esta inscripción?')) {
      this.inscripcionesService.eliminar(id);
    }
  }

  restaurar(): void {
    if (confirm('Esto vuelve a los datos iniciales. ¿Continuar?')) {
      this.inscripcionesService.reset();
    }
  }
}
