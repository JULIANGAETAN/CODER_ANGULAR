// src/app/features/cursos/pages/cursos-list/cursos-list.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  templateUrl: './cursos-list.component.html',
  styleUrls: ['./cursos-list.component.scss'],
})
export class CursosListComponent {
  private readonly cursosService = inject(CursosService);
  private readonly router = inject(Router);

  filtro = '';
  cursos: Curso[] = [];

  columnas: string[] = ['id', 'nombre', 'descripcion', 'activo', 'acciones'];

  constructor() {
    this.cursosService.listar().subscribe((lista) => (this.cursos = lista));
  }

  // tu HTML llama (keyup)="aplicarFiltro($any($event.target).value)"
  aplicarFiltro(valor: string = ''): void {
    this.filtro = valor;
  }

  dataSource(): Curso[] {
    const f = this.filtro.trim().toLowerCase();
    if (!f) return this.cursos;
    return this.cursos.filter((c) =>
      (c.id ?? '').toLowerCase().includes(f) ||
      (c.nombre ?? '').toLowerCase().includes(f) ||
      (c.descripcion ?? '').toLowerCase().includes(f)
    );
  }

  nuevo(): void {
    this.router.navigate(['/cursos/nuevo']);
  }

  editar(curso: Curso): void {
    if (!curso?.id) return;
    this.router.navigate(['/cursos/editar', curso.id]);
  }

  eliminar(id: string): void {
    if (!id) return;
    if (confirm('¿Eliminar el curso?')) {
      this.cursosService.eliminar(id);
    }
  }

  restaurar(): void {
    if (confirm('Esto vuelve a los cursos del JSON original. ¿Continuar?')) {
      this.cursosService.reset();
    }
  }
}
