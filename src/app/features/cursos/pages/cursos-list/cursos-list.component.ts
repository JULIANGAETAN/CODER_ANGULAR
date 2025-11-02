import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

import { Router } from '@angular/router';
import { CursosService } from '../../services/cursos.service';
import { Curso } from '../../models/curso.model';

@Component({
  selector: 'app-cursos-list',
  standalone: true,
  templateUrl: './cursos-list.component.html',
  styleUrls: ['./cursos-list.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
})
export class CursosListComponent {
  private readonly cursosService = inject(CursosService);
  private readonly router = inject(Router);

  filtro = '';
  cursos: Curso[] = [];

  columnas: string[] = ['id', 'nombre', 'descripcion', 'activo', 'acciones'];

  constructor() {
    this.cursosService.listar().subscribe((lista) => {
      this.cursos = lista;
    });
  }

  get dataSource(): Curso[] {
    const f = this.filtro.trim().toLowerCase();
    if (!f) return this.cursos;
    return this.cursos.filter(
      (c) =>
        (c.id ?? '').toLowerCase().includes(f) ||
        (c.nombre ?? '').toLowerCase().includes(f) ||
        (c.descripcion ?? '').toLowerCase().includes(f)
    );
  }

  aplicarFiltro(): void {
    // ya lo hace el get
  }

  nuevo(): void {
    this.router.navigate(['/cursos/nuevo']);
  }

  editar(curso: Curso): void {
    if (!curso?.id) return;
    // 👇 ESTA es la ruta correcta
    this.router.navigate(['/cursos/editar', curso.id]);
  }

  eliminar(id: string): void {
    if (!id) return;
    if (confirm('¿Seguro que querés eliminar este curso?')) {
      this.cursosService.eliminar(id);
    }
  }

  restaurar(): void {
    if (confirm('Esto vuelve a los datos iniciales. ¿Continuar?')) {
      this.cursosService.reset();
    }
  }
}
