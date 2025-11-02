// src/app/features/inscripciones/pages/inscripciones-form/inscripciones-form.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { InscripcionesService } from '../../services/inscripciones.service';
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
  ],
  templateUrl: './inscripciones-form.component.html',
  styleUrls: ['./inscripciones-form.component.scss'],
})
export class InscripcionesFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly inscripcionesService = inject(InscripcionesService);

  titulo = 'Nueva Inscripción';
  editando = false;
  idActual: string | null = null;

  form = this.fb.group({
    alumnoId: ['', Validators.required],
    cursoId: ['', Validators.required],
    fecha: ['', Validators.required],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const insc = this.inscripcionesService.obtenerPorId(id);
      if (insc) {
        this.form.patchValue({
          alumnoId: insc.alumnoId,
          cursoId: insc.cursoId,
          fecha: insc.fecha,
        });
        this.titulo = 'Editar Inscripción';
        this.editando = true;
        this.idActual = id;
      } else {
        this.router.navigate(['/inscripciones']);
      }
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const valores = this.form.value as Omit<Inscripcion, 'id'>;

    if (this.editando && this.idActual) {
      this.inscripcionesService.actualizar(this.idActual, valores);
    } else {
      const nueva: Inscripcion = {
        id: this.inscripcionesService.nuevoId(),
        ...valores,
      };
      this.inscripcionesService.crear(nueva);
    }

    this.router.navigate(['/inscripciones']);
  }

  cancelar(): void {
    this.router.navigate(['/inscripciones']);
  }
}
