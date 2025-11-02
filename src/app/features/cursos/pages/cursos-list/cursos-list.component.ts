import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { CursosService } from '../../services/cursos.service';
import { Curso } from '../../models/curso.model';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-cursos-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  templateUrl: './cursos-list.component.html',
  styleUrls: ['./cursos-list.component.scss'],
})
export class CursosListComponent implements OnInit {
  private cursosService = inject(CursosService);
  private router = inject(Router);

  filtro = '';
  dataSource = new MatTableDataSource<Curso>([]);
  displayedColumns = ['id', 'nombre', 'descripcion', 'activo', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cursosService.listar().subscribe((lista) => {
      this.dataSource = new MatTableDataSource<Curso>(lista);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      this.aplicarFiltro();
    });
  }

  aplicarFiltro(): void {
    this.dataSource.filter = this.filtro.trim().toLowerCase();
  }

  nuevo(): void {
    this.router.navigate(['/cursos/nuevo']);
  }

  editar(curso: Curso): void {
    this.router.navigate(['/cursos', curso.id]);
  }

  eliminar(id: string): void {
    this.cursosService.eliminar(id);
    this.cargar();
  }

  restaurar(): void {
    this.cursosService.reset();
    this.cargar();
  }
}
