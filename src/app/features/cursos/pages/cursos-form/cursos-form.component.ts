import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

import { CursosService } from '../../services/cursos.service';
import { Curso } from '../../models/curso.model';

@Component({
  selector: 'app-cursos-form',
  standalone: true,
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
})
export class CursosFormComponent implements OnInit {
  form: FormGroup;
  titulo = 'Nuevo curso';
  idEditar: string | null = null;

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      activo: [true],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const curso = this.cursosService.obtenerPorId(id);
      if (curso) {
        this.idEditar = id;
        this.titulo = 'Editar curso';
        this.form.patchValue(curso);
      }
    }
  }

  guardar(): void {
    if (this.form.invalid) return;

    if (this.idEditar) {
      this.cursosService.actualizar(this.idEditar, this.form.value);
    } else {
      const nuevo: Curso = {
        id: this.cursosService.nuevoId(),
        ...this.form.value,
      };
      this.cursosService.crear(nuevo);
    }

    this.router.navigate(['/cursos']);
  }

  cancelar(): void {
    this.router.navigate(['/cursos']);
  }
}
