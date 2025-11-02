// src/app/features/cursos/pages/cursos-form/cursos-form.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { CursosService } from '../../services/cursos.service';
import { Curso } from '../../models/curso.model';

@Component({
  selector: 'app-cursos-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly cursosService = inject(CursosService);

  titulo = 'Nuevo Curso';
  editando = false;
  idActual: string | null = null;

  form = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: [''],
    activo: [true],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const curso = this.cursosService.obtenerPorId(id);
      if (curso) {
        this.form.patchValue({
          nombre: curso.nombre,
          descripcion: curso.descripcion,
          activo: curso.activo,
        });
        this.titulo = 'Editar Curso';
        this.editando = true;
        this.idActual = id;
      } else {
        this.router.navigate(['/cursos']);
      }
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const valores = this.form.value as Omit<Curso, 'id'>;

    if (this.editando && this.idActual) {
      this.cursosService.actualizar(this.idActual, valores);
    } else {
      const nuevo: Curso = {
        id: this.cursosService.nuevoId(),
        nombre: valores.nombre,
        descripcion: valores.descripcion,
        activo: valores.activo ?? true,
      };
      this.cursosService.crear(nuevo);
    }

    this.router.navigate(['/cursos']);
  }

  cancelar(): void {
    this.router.navigate(['/cursos']);
  }
}
