import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { CursosService, Curso } from '../../services/cursos.service';

@Component({
  selector: 'app-cursos-list',
  templateUrl: './cursos-list.component.html',
})
export class CursosListComponent implements OnInit, AfterViewInit, OnDestroy {
  columnas = ['id', 'nombre', 'descripcion', 'activo', 'acciones'];
  dataSource = new MatTableDataSource<Curso>([]);
  sub!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private cursosService: CursosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = this.cursosService.cursos$.subscribe(cursos => {
      this.dataSource.data = cursos;
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
    this.router.navigate(['/cursos/nuevo']);
  }

  editar(curso: Curso) {
    this.router.navigate(['/cursos', curso.id, 'editar']);
  }

  eliminar(curso: Curso) {
    if (confirm('¿Eliminar el curso "' + curso.nombre + '"?')) {
      this.cursosService.eliminar(curso.id);
    }
  }
}
