import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AlumnosService } from '../../services/alumnos.service';
import { Alumno } from '../../models/alumno.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumnos-list',
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.scss'],
})
export class AlumnosListComponent implements OnInit {
  // 👇 ACÁ VA TU NUEVA COLUMNA
  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellido',
    'email',
    'activo',
    'acciones',
  ];

  dataSource = new MatTableDataSource<Alumno>([]);
  filtro = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private alumnosService: AlumnosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.alumnosService.listar().subscribe((alumnos) => {
      this.dataSource = new MatTableDataSource(alumnos);
      this.dataSource.paginator = this.paginator;
    });
  }

  aplicarFiltro(): void {
    this.dataSource.filter = this.filtro.trim().toLowerCase();
  }

  limpiarFiltro(): void {
    this.filtro = '';
    this.aplicarFiltro();
  }

  agregarAlumno(): void {
    this.router.navigate(['/alumnos/nuevo']);
  }

  editarAlumno(alumno: Alumno): void {
    this.router.navigate(['/alumnos', alumno.id, 'editar']);
  }

  eliminarAlumno(id: string): void {
    if (confirm('¿Seguro que querés eliminar este alumno?')) {
      this.alumnosService.eliminar(id);
    }
  }

  restaurarDatos(): void {
    this.alumnosService.reset();
  }
}
