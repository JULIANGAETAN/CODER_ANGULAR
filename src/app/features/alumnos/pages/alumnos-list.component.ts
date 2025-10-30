import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AlumnosService } from '../../services/alumnos.service';
import { Alumno } from '../../models/alumno.model';

@Component({
  selector: 'app-alumnos-list',
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.scss'],
})
export class AlumnosListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  columnas = ['id', 'nombre', 'apellido', 'email', 'acciones'];

  alumnosFiltrados = new MatTableDataSource<Alumno>([]);
  filtro = '';

  private sub!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private alumnosService: AlumnosService, private router: Router) {}

  ngOnInit(): void {
    this.sub = this.alumnosService.listar().subscribe((alumnos) => {
      this.aplicarDatos(alumnos);
    });
  }

  ngAfterViewInit(): void {
    this.alumnosFiltrados.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private aplicarDatos(alumnos: Alumno[]) {
    const texto = this.filtro.toLowerCase().trim();
    const datosFiltrados = texto
      ? alumnos.filter((a) =>
          `${a.nombre} ${a.apellido} ${a.email}`.toLowerCase().includes(texto)
        )
      : alumnos;

    this.alumnosFiltrados.data = datosFiltrados;

    if (this.paginator) {
      this.alumnosFiltrados.paginator = this.paginator;
    }
  }

  onBuscarCambio() {
    const ultimo = this.alumnosService.getSnapshot();
    this.aplicarDatos(ultimo);
  }

  agregarAlumno() {
    this.router.navigate(['/alumnos/nuevo']);
  }

  editarAlumno(alumno: Alumno) {
    this.router.navigate(['/alumnos', alumno.id, 'editar']);
  }

  eliminarAlumno(id: string) {
    if (confirm('¿Seguro que querés eliminar este alumno?')) {
      this.alumnosService.eliminar(id);
      const ultimo = this.alumnosService.getSnapshot();
      this.aplicarDatos(ultimo);
    }
  }

  restaurarDatos() {
    this.alumnosService.reset();
  }
}
