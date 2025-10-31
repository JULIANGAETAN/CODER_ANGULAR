import { Injectable } from '@angular/core';

export interface Inscripcion {
  id: string;
  alumnoId: string;
  cursoId: string;
  fecha: string; // ISO
}

const DATA_INICIAL: Inscripcion[] = [
  {
    id: 'I-001',
    alumnoId: 'A-001',
    cursoId: 'C-001',
    fecha: '2025-10-30',
  },
  {
    id: 'I-002',
    alumnoId: 'A-002',
    cursoId: 'C-002',
    fecha: '2025-10-29',
  },
];

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  private inscripciones: Inscripcion[] = structuredClone(DATA_INICIAL);

  obtenerTodas(): Inscripcion[] {
    return this.inscripciones.map((i) => ({ ...i }));
  }

  obtenerPorId(id: string): Inscripcion | undefined {
    const encontrada = this.inscripciones.find((i) => i.id === id);
    return encontrada ? { ...encontrada } : undefined;
  }

  crear(payload: Omit<Inscripcion, 'id'>): void {
    const ultima = this.inscripciones[this.inscripciones.length - 1];
    const ultimoNumero = ultima ? Number(ultima.id.split('-')[1]) : 0;
    const nuevoId = `I-${(ultimoNumero + 1).toString().padStart(3, '0')}`;
    this.inscripciones.push({
      id: nuevoId,
      ...payload,
    });
  }

  actualizar(id: string, cambios: Partial<Inscripcion>): void {
    const idx = this.inscripciones.findIndex((i) => i.id === id);
    if (idx === -1) return;
    this.inscripciones[idx] = {
      ...this.inscripciones[idx],
      ...cambios,
    };
  }

  eliminar(id: string): void {
    this.inscripciones = this.inscripciones.filter((i) => i.id !== id);
  }

  restaurarDatos(): void {
    this.inscripciones = structuredClone(DATA_INICIAL);
  }
}
