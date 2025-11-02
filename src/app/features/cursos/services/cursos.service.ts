// src/app/features/cursos/services/cursos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Curso } from '../models/curso.model';

@Injectable({ providedIn: 'root' })
export class CursosService {
  private readonly url = 'assets/data/cursos.json';
  private readonly storageKey = 'cursos';

  private _cursos$ = new BehaviorSubject<Curso[]>([]);
  cursos$: Observable<Curso[]> = this._cursos$.asObservable();

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      const parsed: unknown = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        this._cursos$.next(parsed as Curso[]);
        return;
      }
    }
    this.seedFromAssets();
  }

  private seedFromAssets(): void {
    this.http.get<Curso[]>(this.url).subscribe({
      next: (data) => {
        const items = data ?? [];
        this._cursos$.next(items);
        this.persist();
      },
      error: () => this._cursos$.next([]),
    });
  }

  private persist(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this._cursos$.value));
  }

  private snapshot(): Curso[] {
    return [...this._cursos$.value];
  }

  // 👇 esto es lo que te pedía el listado
  listar(): Observable<Curso[]> {
    return this.cursos$;
  }

  obtenerPorId(id: string): Curso | undefined {
    return this._cursos$.value.find((c) => c.id === id);
  }

  crear(nuevo: Curso): void {
    const data = this.snapshot();
    data.push(nuevo);
    this._cursos$.next(data);
    this.persist();
  }

  actualizar(id: string, cambios: Partial<Curso>): void {
    const data = this.snapshot().map((c) =>
      c.id === id ? { ...c, ...cambios } : c
    );
    this._cursos$.next(data);
    this.persist();
  }

  eliminar(id: string): void {
    const data = this.snapshot().filter((c) => c.id !== id);
    this._cursos$.next(data);
    this.persist();
  }

  // 👇 esto es lo que te marcaba error en el form
  nuevoId(): string {
    const nums = this._cursos$.value
      .map((c) => Number(c.id?.replace('C-', '') ?? NaN))
      .filter((n) => !isNaN(n));
    const max = nums.length ? Math.max(...nums) : 0;
    const siguiente = max + 1;
    return `C-${String(siguiente).padStart(3, '0')}`;
  }

  reset(): void {
    localStorage.removeItem(this.storageKey);
    this.seedFromAssets();
  }
}
