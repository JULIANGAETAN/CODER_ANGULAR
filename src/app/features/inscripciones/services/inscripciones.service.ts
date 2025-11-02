// src/app/features/inscripciones/services/inscripciones.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Inscripcion } from '../models/inscripcion.model';

@Injectable({ providedIn: 'root' })
export class InscripcionesService {
  private readonly url = 'assets/data/inscripciones.json';
  private readonly storageKey = 'inscripciones';

  private _inscripciones$ = new BehaviorSubject<Inscripcion[]>([]);
  inscripciones$: Observable<Inscripcion[]> = this._inscripciones$.asObservable();

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      const parsed: unknown = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        this._inscripciones$.next(parsed as Inscripcion[]);
        return;
      }
    }
    this.seedFromAssets();
  }

  private seedFromAssets(): void {
    this.http.get<Inscripcion[]>(this.url).subscribe({
      next: (data) => {
        const items = data ?? [];
        this._inscripciones$.next(items);
        this.persist();
      },
      error: () => this._inscripciones$.next([]),
    });
  }

  private persist(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this._inscripciones$.value));
  }

  private snapshot(): Inscripcion[] {
    return [...this._inscripciones$.value];
  }

  // 👇 lo pide el listado
  listar(): Observable<Inscripcion[]> {
    return this.inscripciones$;
  }

  obtenerPorId(id: string): Inscripcion | undefined {
    return this._inscripciones$.value.find((i) => i.id === id);
  }

  crear(nueva: Inscripcion): void {
    const data = this.snapshot();
    data.push(nueva);
    this._inscripciones$.next(data);
    this.persist();
  }

  actualizar(id: string, cambios: Partial<Inscripcion>): void {
    const data = this.snapshot().map((i) =>
      i.id === id ? { ...i, ...cambios } : i
    );
    this._inscripciones$.next(data);
    this.persist();
  }

  eliminar(id: string): void {
    const data = this.snapshot().filter((i) => i.id !== id);
    this._inscripciones$.next(data);
    this.persist();
  }

  // 👇 lo pide tu form de inscripciones
  nuevoId(): string {
    const nums = this._inscripciones$.value
      .map((i) => Number(i.id?.replace('I-', '') ?? NaN))
      .filter((n) => !isNaN(n));
    const max = nums.length ? Math.max(...nums) : 0;
    const siguiente = max + 1;
    return `I-${String(siguiente).padStart(3, '0')}`;
  }

  reset(): void {
    localStorage.removeItem(this.storageKey);
    this.seedFromAssets();
  }
}
