import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Inscripcion {
  id: string;
  alumnoId: string;
  cursoId: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  private _inscripciones = new BehaviorSubject<Inscripcion[]>([
    { id: 'I-001', alumnoId: 'A-001', cursoId: 'C-001', fecha: '2025-10-30' },
    { id: 'I-002', alumnoId: 'A-002', cursoId: 'C-002', fecha: '2025-10-29' },
  ]);

  inscripciones$ = this._inscripciones.asObservable();

  private get snapshot(): Inscripcion[] {
    return this._inscripciones.getValue();
  }

  crear(insc: Omit<Inscripcion, 'id'>) {
    const nueva: Inscripcion = {
      id: this.nuevoId(),
      ...insc,
    };
    this._inscripciones.next([...this.snapshot, nueva]);
  }

  actualizar(id: string, cambios: Partial<Inscripcion>) {
    this._inscripciones.next(
      this.snapshot.map(i => (i.id === id ? { ...i, ...cambios } : i))
    );
  }

  eliminar(id: string) {
    this._inscripciones.next(this.snapshot.filter(i => i.id !== id));
  }

  obtenerPorId(id: string): Inscripcion | undefined {
    return this.snapshot.find(i => i.id === id);
  }

  nuevoId(): string {
    const nums = this.snapshot
      .map(i => Number(i.id.replace('I-', '')))
      .filter(n => !isNaN(n));
    const next = nums.length ? Math.max(...nums) + 1 : 1;
    return `I-${String(next).padStart(3, '0')}`;
  }
}
