import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  titulo = 'Nuevo alumno';
  form!: FormGroup;
  idEditar: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alumnosService: AlumnosService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      activo: [true],
    });

    this.idEditar = this.route.snapshot.paramMap.get('id');
    if (this.idEditar) {
      this.titulo = 'Editar alumno';
      const alumno = this.alumnosService.obtenerPorId(this.idEditar);
      if (alumno) {
        this.form.patchValue(alumno);
      }
    }
  }

  guardar(): void {
    if (this.form.invalid) return;

    const valores = this.form.value as Omit<Alumno, 'id'>;

    if (this.idEditar) {
      this.alumnosService.actualizar(this.idEditar, valores);
    } else {
      const nuevo: Alumno = { id: this.alumnosService.nuevoId(), ...valores };
      this.alumnosService.crear(nuevo);
    }

    this.router.navigate(['/alumnos']);
  }

  cancelar(): void {
    this.router.navigate(['/alumnos']);
  }
}
