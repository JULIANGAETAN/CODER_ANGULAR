import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html'
})
export class AlumnosFormComponent implements OnInit {
  titulo = 'Nuevo alumno';

  form = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    activo: [true],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.titulo = 'Editar alumno';
      // más adelante: cargar datos del alumno
    }
  }

  guardar() {
    if (this.form.invalid) return;
    // más adelante: this.alumnosService.create/update(...)
    this.router.navigate(['/alumnos']);
  }

  cancelar() {
    this.router.navigate(['/alumnos']);
  }
}
