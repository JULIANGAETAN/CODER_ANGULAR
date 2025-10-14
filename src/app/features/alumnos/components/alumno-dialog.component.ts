import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Alumno } from '../models/alumno.model';
import { AlumnosService } from '../services/alumnos.service';

@Component({
  selector: 'app-alumno-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSlideToggleModule
  ],
  template: `
  <h2 mat-dialog-title>{{ data ? 'Editar alumno' : 'Nuevo alumno' }}</h2>

  <form [formGroup]="form" class="p-4" (ngSubmit)="guardar()">
    <div class="grid">
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Nombre</mat-label>
        <input matInput formControlName="nombre" required />
        <mat-error *ngIf="form.get('nombre')?.invalid">Obligatorio</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Apellido</mat-label>
        <input matInput formControlName="apellido" required />
        <mat-error *ngIf="form.get('apellido')?.invalid">Obligatorio</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" required />
        <mat-error *ngIf="form.get('email')?.invalid">Email inválido</mat-error>
      </mat-form-field>

      <mat-slide-toggle formControlName="activo">Activo</mat-slide-toggle>
    </div>

    <div class="mt-4" style="display:flex; gap:.5rem; justify-content:flex-end">
      <button type="button" mat-button (click)="cerrar()">Cancelar</button>
      <button type="submit" mat-raised-button color="primary" [disabled]="form.invalid">Guardar</button>
    </div>
  </form>
  `,
  styles: [`
    .p-4{padding:1rem}
    .grid{display:grid; gap:12px}
    .w-full{width:100%}
  `]
})
export class AlumnoDialogComponent {
  form = this.fb.group({
    id: [''],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    activo: [true],
  });

  constructor(
    private fb: FormBuilder,
    private svc: AlumnosService,
    private ref: MatDialogRef<AlumnoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alumno | null,
  ) {
    if (data) this.form.patchValue(data);
    else this.form.patchValue({ id: this.svc.nuevoId(), activo: true });
  }

  guardar() {
    const value = this.form.getRawValue() as Alumno;
    if (this.data) this.svc.actualizar(value.id, value);
    else this.svc.crear(value);
    this.ref.close(true);
  }

  cerrar() {
    this.ref.close(false);
  }
}
