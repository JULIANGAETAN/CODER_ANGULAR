import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  Inscripcion,
  InscripcionesService,
} from '../../../inscripciones/services/inscripciones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscripciones-list',
  templateUrl: './inscripciones-list.component.html',
  styleUrls: ['./inscripciones-list.component.scss'],
})
export class InscripcionesListComponent implements OnInit {
  columnas = ['id', 'alumno', 'curso', 'fecha', 'acciones'];
  dataSource = new MatTableDataSource<Inscripcion>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private inscripcionesService: InscripcionesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private cargar(): void {
    this.dataSource.data = this.inscripcionesService.obtenerTodas();
  }

  nuevo(): void {
    this.router.navigate(['/inscripciones/nueva']);
  }

  restaurar(): void {
    this.inscripcionesService.restaurarDatos();
    this.cargar();
  }

  editar(insc: Inscripcion): void {
    this.router.navigate(['/inscripciones', insc.id]);
  }

  eliminar(id: string): void {
    if (!confirm('¿Eliminar inscripción?')) return;
    this.inscripcionesService.eliminar(id);
    this.cargar();
  }
}
