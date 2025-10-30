import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alumno } from '../models/alumno.model';

@Injectable({ providedIn: 'root' })
export class AlumnosService {
  private readonly url = 'assets/data/alumnos.json';
  private readonly storageKey = 'alumnos';

  private _alumnos$ = new BehaviorSubject<Alumno[]>([]);
  alumnos$: Observable<Alumno[]> = this._alumnos$.asObservable();

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      const parsed: unknown = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        this._alumnos$.next(parsed as Alumno[]);
      } else {
        this.seedFromAssets();
      }
    } else {
      this.seedFromAssets();
    }
  }

  private seedFromAssets() {
    this.http.get<Alumno[]>(this.url).subscribe({
      next: (data) => {
        const items = data ?? [];
        this._alumnos$.next(items);
        this.persist();
      },
      error: () => this._alumnos$.next([]),
    });
  }

  private persist() {
    localStorage.setItem(this.storageKey, JSON.stringify(this._alumnos$.value));
  }

  /** 👉 devolver siempre la última lista */
  getSnapshot(): Alumno[] {
    return [...this._alumnos$.value];
  }

  /** 👉 usado por el form para editar */
  obtenerPorId(id: string): Alumno | undefined {
    return this._alumnos$.value.find((a) => a.id === id);
  }

  listar(): Observable<Alumno[]> {
    return this.alumnos$;
  }

  crear(nuevo: Alumno) {
    const data = this.getSnapshot();
    data.push(nuevo);
    this._alumnos$.next(data);
    this.persist();
  }

  actualizar(id: string, cambios: Partial<Alumno>) {
    const data = this.getSnapshot().map((a: Alumno) =>
      a.id === id ? { ...a, ...cambios } : a
    );
    this._alumnos$.next(data);
    this.persist();
  }

  eliminar(id: string) {
    const data = this.getSnapshot().filter((a: Alumno) => a.id !== id);
    this._alumnos$.next(data);
    this.persist();
  }

  nuevoId(): string {
    const n = this._alumnos$.value.length + 1;
    return `A-${String(n).padStart(3, '0')}`;
  }

  reset() {
    localStorage.removeItem(this.storageKey);
    this.seedFromAssets();
  }
}
