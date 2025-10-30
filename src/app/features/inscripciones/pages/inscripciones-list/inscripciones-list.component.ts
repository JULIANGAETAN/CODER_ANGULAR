import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { InscripcionesService, Inscripcion } from '../../services/inscripciones.service';

@Component({
  selector: 'app-inscripciones-list',
  templateUrl: './inscripciones-list.component.html',
})
export class InscripcionesListComponent implements OnInit, AfterViewInit, OnDestroy {
  columnas = ['id', 'alumnoId', 'cursoId', 'fecha', 'acciones'];
  dataSource = new MatTableDataSource<Inscripcion>([]);
  sub!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private inscService: InscripcionesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = this.inscService.inscripciones$.subscribe(data => {
      this.dataSource.data = data;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  nuevo() {
    this.router.navigate(['/inscripciones/nuevo']);
  }

  editar(i: Inscripcion) {
    this.router.navigate(['/inscripciones', i.id, 'editar']);
  }

  eliminar(i: Inscripcion) {
    if (confirm('¿Eliminar esta inscripción?')) {
      this.inscService.eliminar(i.id);
    }
  }
}
