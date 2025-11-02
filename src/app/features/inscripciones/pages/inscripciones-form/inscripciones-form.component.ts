import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { InscripcionesService } from '../../services/inscripciones.service';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { CursosService } from '../../../cursos/services/cursos.service';
import { Alumno } from '../../../alumnos/models/alumno.model';
import { Curso } from '../../../cursos/models/curso.model';
import { Inscripcion } from '../../models/inscripcion.model';

@Component({
  selector: 'app-inscripciones-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './inscripciones-form.component.html',
  styleUrls: ['./inscripciones-form.component.scss'],
})
export class InscripcionesFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private inscripcionesService = inject(InscripcionesService);
  private alumnosService = inject(AlumnosService);
  private cursosService = inject(CursosService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  titulo = 'Nueva inscripción';
  form!: FormGroup;
  idEditando: string | null = null;

  alumnos: Alumno[] = [];
  cursos: Curso[] = [];

  ngOnInit(): void {
    this.form = this.fb.group({
      idAlumno: ['', Validators.required],
      idCurso: ['', Validators.required],
      fecha: ['', Validators.required],
    });

    this.alumnosService.listar().subscribe((al) => (this.alumnos = al));
    this.cursosService.listar().subscribe((cu) => (this.cursos = cu));

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        const insc = this.inscripcionesService.obtenerPorId(id);
        if (insc) {
          this.idEditando = id;
          this.titulo = 'Editar inscripción';
          this.form.patchValue(insc);
        }
      }
    });
  }

  guardar(): void {
    if (this.form.invalid) return;

    const valores = this.form.value as Omit<Inscripcion, 'id'>;

    if (this.idEditando) {
      this.inscripcionesService.actualizar(this.idEditando, valores);
    } else {
      this.inscripcionesService.crear({
        id: this.inscripcionesService.nuevoId(),
        ...valores,
      });
    }

    this.router.navigate(['/inscripciones']);
  }

  cancelar(): void {
    this.router.navigate(['/inscripciones']);
  }
}
