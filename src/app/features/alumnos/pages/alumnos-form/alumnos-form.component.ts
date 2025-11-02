import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { AlumnosService } from '../../services/alumnos.service';
import { Alumno } from '../../models/alumno.model';

@Component({
  selector: 'app-alumnos-form',
  standalone: true,
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
})
export class AlumnosFormComponent implements OnInit {
  form: FormGroup;
  titulo = 'Nuevo alumno';
  idEditar: string | null = null;

  constructor(
    private fb: FormBuilder,
    private alumnosService: AlumnosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      activo: [true],
    });
  }

  ngOnInit(): void {
    // puede venir /alumnos/editar/:id
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const alumno = this.alumnosService.obtenerPorId(id);
      if (alumno) {
        this.idEditar = id;
        this.titulo = 'Editar alumno';
        this.form.patchValue({
          nombre: alumno.nombre,
          apellido: alumno.apellido,
          email: alumno.email,
          activo: alumno.activo,
        });
      }
    }
  }

  guardar(): void {
    if (this.form.invalid) return;

    if (this.idEditar) {
      // editar
      this.alumnosService.actualizar(this.idEditar, this.form.value);
    } else {
      // crear
      const nuevo: Alumno = {
        id: this.alumnosService.nuevoId(),
        ...this.form.value,
      };
      this.alumnosService.crear(nuevo);
    }

    this.router.navigate(['/alumnos']);
  }

  cancelar(): void {
    this.router.navigate(['/alumnos']);
  }
}
