import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { InscripcionesService } from '../../services/inscripciones.service';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { CursosService } from '../../../cursos/services/cursos.service';
import { Alumno } from '../../../alumnos/models/alumno.model';
import { Curso } from '../../../cursos/models/curso.model';
import { Inscripcion } from '../../models/inscripcion.model';

@Component({
  selector: 'app-inscripciones-form',
  standalone: true,
  templateUrl: './inscripciones-form.component.html',
  styleUrls: ['./inscripciones-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class InscripcionesFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly inscripcionesService = inject(InscripcionesService);
  private readonly alumnosService = inject(AlumnosService);
  private readonly cursosService = inject(CursosService);

  form!: FormGroup;
  titulo = 'Nueva inscripción';
  idEditar: string | null = null;

  alumnos: Alumno[] = [];
  cursos: Curso[] = [];

  ngOnInit(): void {
    this.form = this.fb.group({
      alumnoId: ['', Validators.required],
      cursoId: ['', Validators.required],
      fecha: ['', Validators.required],
    });

    this.alumnosService.listar().subscribe((al) => (this.alumnos = al));
    this.cursosService.listar().subscribe((cu) => (this.cursos = cu));

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const actual = this.inscripcionesService.obtenerPorId(id);
      if (actual) {
        this.idEditar = id;
        this.titulo = 'Editar inscripción';
        this.form.patchValue({
          alumnoId: actual.alumnoId,
          cursoId: actual.cursoId,
          fecha: actual.fecha,
        });
      }
    }
  }

  guardar(): void {
    if (this.form.invalid) return;

    if (this.idEditar) {
      this.inscripcionesService.actualizar(this.idEditar, this.form.value);
    } else {
      const nueva: Inscripcion = {
        id: this.inscripcionesService.nuevoId(),
        ...this.form.value,
      };
      this.inscripcionesService.crear(nueva);
    }

    this.router.navigate(['/inscripciones']);
  }

  cancelar(): void {
    this.router.navigate(['/inscripciones']);
  }
}
