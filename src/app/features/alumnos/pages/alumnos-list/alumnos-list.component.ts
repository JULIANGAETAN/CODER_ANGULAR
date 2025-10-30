import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AlumnosService } from '../../services/alumnos.service';
import { Alumno } from '../../models/alumno.model';

@Component({
  selector: 'app-alumnos-list',
  templateUrl: './alumnos-list.component.html',
})
export class AlumnosListComponent implements OnInit, AfterViewInit, OnDestroy {
  columnas = ['id', 'nombre', 'apellido', 'email', 'acciones'];
  dataSource = new MatTableDataSource<Alumno>([]);
  private sub!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private alumnosService: AlumnosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Me suscribo al service para que cuando CREES o ELIMINES se vea acá
    this.sub = this.alumnosService.listar().subscribe((data) => {
      this.dataSource.data = data;
      // si ya está creado el paginator, lo reasigno
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
    this.router.navigate(['/alumnos/nuevo']);
  }

  editar(alumno: Alumno) {
    this.router.navigate(['/alumnos/editar', alumno.id]);
  }

  eliminar(alumno: Alumno) {
    if (confirm('¿Seguro que querés eliminar al alumno ' + alumno.nombre + '?')) {
      this.alumnosService.eliminar(alumno.id);
    }
  }

  restaurar() {
    if (confirm('Esto va a restaurar los datos iniciales, ¿continuar?')) {
      this.alumnosService.reset();
    }
  }

  aplicarFiltro(ev: Event) {
    const valor = (ev.target as HTMLInputElement).value ?? '';
    this.dataSource.filter = valor.trim().toLowerCase();
  }
}
