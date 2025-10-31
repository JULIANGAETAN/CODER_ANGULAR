import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';
import { Alumno } from '../../models/alumno.model';

@Component({
  selector: 'app-alumnos-list',
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.scss'],
})
export class AlumnosListComponent implements OnInit, AfterViewInit {
  // columnas que usa el HTML
  columnas: string[] = ['id', 'nombre', 'apellido', 'email', 'activo', 'acciones'];

  // datasource que se muestra en la tabla
  alumnosFiltrados = new MatTableDataSource<Alumno>([]);

  // texto del buscador
  filtro = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private alumnosService: AlumnosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // me suscribo al observable del service
    this.alumnosService.listar().subscribe((alumnos) => {
      // si el alumno no tiene activo en el JSON lo fuerzo a true para no romper
      const normalizados = (alumnos ?? []).map((a) => ({
        ...a,
        activo: a.activo ?? true,
      }));
      this.alumnosFiltrados.data = normalizados;
      this.aplicarFiltro();
    });
  }

  ngAfterViewInit(): void {
    // le asigno el paginador
    this.alumnosFiltrados.paginator = this.paginator;
  }

  aplicarFiltro(): void {
    const valor = this.filtro.trim().toLowerCase();
    this.alumnosFiltrados.filterPredicate = (alumno: Alumno, filtro: string) => {
      return (
        alumno.id?.toLowerCase().includes(filtro) ||
        alumno.nombre?.toLowerCase().includes(filtro) ||
        alumno.apellido?.toLowerCase().includes(filtro) ||
        alumno.email?.toLowerCase().includes(filtro)
      );
    };
    this.alumnosFiltrados.filter = valor;
    if (this.alumnosFiltrados.paginator) {
      this.alumnosFiltrados.paginator.firstPage();
    }
  }

  agregarAlumno(): void {
    // generamos un id nuevo desde el service
    const nuevoId = this.alumnosService.nuevoId();
    // navegamos al formulario en modo "nuevo"
    this.router.navigate(['/alumnos/editar', nuevoId], {
      queryParams: { nuevo: true },
    });
  }

  editarAlumno(alumno: Alumno): void {
    this.router.navigate(['/alumnos/editar', alumno.id]);
  }

  eliminarAlumno(id: string): void {
    if (confirm('¿Seguro que querés eliminar este alumno?')) {
      this.alumnosService.eliminar(id);
    }
  }

  restaurarDatos(): void {
    if (confirm('Esto va a volver a cargar los datos del JSON inicial. ¿Continuar?')) {
      this.alumnosService.reset();
    }
  }
}
