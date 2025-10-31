import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Curso, CursosService } from '../../../cursos/services/cursos.service';

@Component({
  selector: 'app-cursos-list',
  templateUrl: './cursos-list.component.html',
  styleUrls: ['./cursos-list.component.scss'],
})
export class CursosListComponent implements OnInit {
  columnas = ['id', 'nombre', 'descripcion', 'activo', 'acciones'];
  dataSource = new MatTableDataSource<Curso>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private cursosService: CursosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private cargarDatos(): void {
    const cursos = this.cursosService.obtenerTodos();
    this.dataSource.data = cursos;
  }

  aplicarFiltro(valor: string): void {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  nuevo(): void {
    this.router.navigate(['/cursos/nuevo']);
  }

  restaurar(): void {
    this.cursosService.restaurarDatos();
    this.cargarDatos();
  }

  editar(curso: Curso): void {
    this.router.navigate(['/cursos', curso.id]);
  }

  eliminar(id: string): void {
    if (!confirm('¿Seguro que querés eliminar este curso?')) return;
    this.cursosService.eliminar(id);
    this.cargarDatos();
  }
}
