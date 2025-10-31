import { Injectable } from '@angular/core';

export interface Curso {
  id: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
}

const DATA_INICIAL: Curso[] = [
  {
    id: 'C-001',
    nombre: 'Angular Inicial',
    descripcion: 'Introducción a Angular',
    activo: true,
  },
  {
    id: 'C-002',
    nombre: 'React Básico',
    descripcion: 'Componentes y props',
    activo: true,
  },
  {
    id: 'C-003',
    nombre: 'Node.js',
    descripcion: 'APIs con Express',
    activo: false,
  },
];

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private cursos: Curso[] = structuredClone(DATA_INICIAL);

  obtenerTodos(): Curso[] {
    // devolvemos una copia para no mutar desde afuera
    return this.cursos.map((c) => ({ ...c }));
  }

  obtenerPorId(id: string): Curso | undefined {
    const encontrado = this.cursos.find((c) => c.id === id);
    return encontrado ? { ...encontrado } : undefined;
  }

  crear(curso: Omit<Curso, 'id'>): void {
    const ultimo = this.cursos[this.cursos.length - 1];
    const ultimoNumero = ultimo ? Number(ultimo.id.split('-')[1]) : 0;
    const nuevoId = `C-${(ultimoNumero + 1).toString().padStart(3, '0')}`;

    this.cursos.push({
      id: nuevoId,
      ...curso,
    });
  }

  actualizar(id: string, cambios: Partial<Curso>): void {
    const idx = this.cursos.findIndex((c) => c.id === id);
    if (idx === -1) return;
    this.cursos[idx] = {
      ...this.cursos[idx],
      ...cambios,
    };
  }

  eliminar(id: string): void {
    this.cursos = this.cursos.filter((c) => c.id !== id);
  }

  restaurarDatos(): void {
    this.cursos = structuredClone(DATA_INICIAL);
  }
}
