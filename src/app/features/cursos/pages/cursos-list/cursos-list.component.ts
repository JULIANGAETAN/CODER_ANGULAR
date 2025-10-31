import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CursosService } from '../../services/cursos.service';
import { Curso } from '../../models/curso.model';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos-list',
  templateUrl: './cursos-list.component.html',
  styleUrls: ['./cursos-list.component.scss'],
})
export class CursosListComponent implements OnInit {
  columnas = ['id', 'nombre', 'descripcion', 'activo', 'acciones'];
  dataSource = new MatTableDataSource<Curso>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cursosService: CursosService, private router: Router) {}

  ngOnInit(): void {
    const cursos = this.cursosService.obtenerTodos();
    this.dataSource = new MatTableDataSource(cursos);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  aplicarFiltro(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  nuevo() {
    this.router.navigate(['/cursos/nuevo']);
  }

  editar(curso: Curso) {
    this.router.navigate(['/cursos', curso.id, 'editar']);
  }

  eliminar(id: string) {
    if (confirm('¿Seguro que querés eliminar este curso?')) {
      this.cursosService.eliminar(id);
      this.dataSource.data = this.cursosService.obtenerTodos();
    }
  }

  restaurar() {
    this.cursosService.restaurar();
    this.dataSource.data = this.cursosService.obtenerTodos();
  }
}
