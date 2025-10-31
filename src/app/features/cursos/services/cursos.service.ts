import { Injectable } from '@angular/core';
import { Curso } from '../models/curso.model';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  // este es el "backup" inicial, para el botón Restaurar
  private cursosIniciales: Curso[] = [
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

  // este es el array que se va modificando
  private cursos: Curso[] = structuredClone(this.cursosIniciales);

  constructor() {}

  // ========== MÉTODOS QUE PIDE EL COMPONENTE ==========

  // lista completa
  obtenerTodos(): Curso[] {
    return [...this.cursos];
  }

  // uno por id
  obtenerPorId(id: string): Curso | undefined {
    return this.cursos.find((c) => c.id === id);
  }

  // alta
  agregar(curso: Curso) {
    this.cursos.push(curso);
  }

  // modificación
  actualizar(id: string, cambios: Partial<Curso>) {
    this.cursos = this.cursos.map((c) =>
      c.id === id ? { ...c, ...cambios } : c
    );
  }

  // baja
  eliminar(id: string) {
    this.cursos = this.cursos.filter((c) => c.id !== id);
  }

  // restaurar al estado inicial
  restaurar() {
    this.cursos = structuredClone(this.cursosIniciales);
  }

  // para generar IDs nuevos si querés
  generarNuevoId(): string {
    // si no hay cursos, arranco en 1
    if (this.cursos.length === 0) {
      return 'C-001';
    }

    // tomo el número del último ID
    const ultimo = this.cursos[this.cursos.length - 1].id; // ej: "C-003"
    const num = Number(ultimo.split('-')[1]); // 3
    const siguiente = (num + 1).toString().padStart(3, '0'); // "004"
    return `C-${siguiente}`;
  }
}
