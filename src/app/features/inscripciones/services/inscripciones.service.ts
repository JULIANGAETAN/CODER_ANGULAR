import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Inscripcion } from '../models/inscripcion.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class InscripcionesService {
  private readonly url = 'assets/data/inscripciones.json';
  private readonly storageKey = 'inscripciones';

  private _insc$ = new BehaviorSubject<Inscripcion[]>([]);
  inscripciones$: Observable<Inscripcion[]> = this._insc$.asObservable();

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      const parsed: unknown = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        this._insc$.next(parsed as Inscripcion[]);
      } else {
        this.seedFromAssets();
      }
    } else {
      this.seedFromAssets();
    }
  }

  private seedFromAssets() {
    this.http.get<Inscripcion[]>(this.url).subscribe({
      next: (data) => {
        const items = data ?? [];
        this._insc$.next(items);
        this.persist();
      },
      error: () => this._insc$.next([]),
    });
  }

  private persist() {
    localStorage.setItem(this.storageKey, JSON.stringify(this._insc$.value));
  }

  private snapshot(): Inscripcion[] {
    return [...this._insc$.value];
  }

  listar(): Observable<Inscripcion[]> {
    return this.inscripciones$;
  }

  obtenerPorId(id: string): Inscripcion | undefined {
    return this._insc$.value.find((i) => i.id === id);
  }

  crear(nueva: Omit<Inscripcion, 'id'>) {
    const data = this.snapshot();
    const id = this.nuevoId();
    data.push({ id, ...nueva });
    this._insc$.next(data);
    this.persist();
  }

  actualizar(id: string, cambios: Partial<Inscripcion>) {
    const data = this.snapshot().map((i) =>
      i.id === id ? { ...i, ...cambios } : i
    );
    this._insc$.next(data);
    this.persist();
  }

  eliminar(id: string) {
    const data = this.snapshot().filter((i) => i.id !== id);
    this._insc$.next(data);
    this.persist();
  }

  nuevoId(): string {
    const n = this._insc$.value.length + 1;
    return `I-${String(n).padStart(3, '0')}`;
  }

  restaurar() {
    localStorage.removeItem(this.storageKey);
    this.seedFromAssets();
  }
}
