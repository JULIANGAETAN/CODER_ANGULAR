import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { InscripcionesService } from '../../services/inscripciones.service';
import { Inscripcion } from '../../models/inscripcion.model';

@Component({
  selector: 'app-inscripciones-list',
  templateUrl: './inscripciones-list.component.html',
  styleUrls: ['./inscripciones-list.component.scss'],
})
export class InscripcionesListComponent implements OnInit {
  columnas = ['id', 'alumnoId', 'cursoId', 'fecha', 'acciones'];
  dataSource = new MatTableDataSource<Inscripcion>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private inscService: InscripcionesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inscService.listar().subscribe((insc) => {
      this.dataSource.data = insc;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  nuevo() {
    this.router.navigate(['inscripciones/nuevo']);
  }

  editar(item: Inscripcion) {
    this.router.navigate(['inscripciones/editar', item.id]);
  }

  eliminar(id: string) {
    if (confirm('¿Eliminar inscripción?')) {
      this.inscService.eliminar(id);
    }
  }

  restaurar() {
    this.inscService.restaurar();
  }
}
