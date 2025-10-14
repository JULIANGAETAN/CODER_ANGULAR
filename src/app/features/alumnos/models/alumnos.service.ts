import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Alumno } from '../models/alumno.model';

@Injectable({ providedIn: 'root' })
export class AlumnosService {
  private readonly url = 'assets/data/alumnos.json';
  constructor(private http: HttpClient) {}
  listar(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.url).pipe(map(x => x ?? []));
  }
}
