import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Curso {
  id: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private _cursos = new BehaviorSubject<Curso[]>([
    { id: 'C-001', nombre: 'Angular Inicial', descripcion: 'Introducción a Angular', activo: true },
    { id: 'C-002', nombre: 'React Básico', descripcion: 'Componentes y props', activo: true },
    { id: 'C-003', nombre: 'Node.js', descripcion: 'APIs con Express', activo: false },
  ]);

  cursos$ = this._cursos.asObservable();

  private get snapshot(): Curso[] {
    return this._cursos.getValue();
  }

  crear(curso: Omit<Curso, 'id'>) {
    const nuevo: Curso = {
      id: this.nuevoId(),
      ...curso,
    };
    this._cursos.next([...this.snapshot, nuevo]);
  }

  actualizar(id: string, cambios: Partial<Curso>) {
    const actualizados = this.snapshot.map(c =>
      c.id === id ? { ...c, ...cambios } : c
    );
    this._cursos.next(actualizados);
  }

  eliminar(id: string) {
    this._cursos.next(this.snapshot.filter(c => c.id !== id));
  }

  obtenerPorId(id: string): Curso | undefined {
    return this.snapshot.find(c => c.id === id);
  }

  nuevoId(): string {
    const nums = this.snapshot
      .map(c => Number(c.id.replace('C-', '')))
      .filter(n => !isNaN(n));
    const next = nums.length ? Math.max(...nums) + 1 : 1;
    return `C-${String(next).padStart(3, '0')}`;
  }
}
