import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
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
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  templateUrl: './inscripciones-list.component.html',
  styleUrls: ['./inscripciones-list.component.scss'],
})
export class InscripcionesListComponent implements OnInit {
  private inscripcionesService = inject(InscripcionesService);
  private alumnosService = inject(AlumnosService);
  private cursosService = inject(CursosService);
  private router = inject(Router);

  filtro = '';
  dataSource = new MatTableDataSource<Inscripcion>([]);
  displayedColumns = ['id', 'alumno', 'curso', 'fecha', 'acciones'];

  alumnos: Alumno[] = [];
  cursos: Curso[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.alumnosService.listar().subscribe((al) => (this.alumnos = al));
    this.cursosService.listar().subscribe((cu) => (this.cursos = cu));
    this.cargar();
  }

  cargar(): void {
    this.inscripcionesService.listar().subscribe((lista) => {
      this.dataSource = new MatTableDataSource<Inscripcion>(lista);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      this.aplicarFiltro();
    });
  }

  aplicarFiltro(): void {
    this.dataSource.filter = this.filtro.trim().toLowerCase();
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
    this.router.navigate(['/inscripciones', insc.id]);
  }

  eliminar(id: string): void {
    this.inscripcionesService.eliminar(id);
    this.cargar();
  }

  restaurar(): void {
    this.inscripcionesService.reset();
    this.cargar();
  }
}
