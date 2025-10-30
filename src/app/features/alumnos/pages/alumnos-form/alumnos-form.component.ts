import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';
import { Alumno } from '../../models/alumno.model';

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.scss'],
})
export class AlumnosFormComponent implements OnInit {
  titulo = 'Nuevo alumno';
  idAlumno?: string;

  form = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alumnosService: AlumnosService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.idAlumno = id;
        this.titulo = 'Editar alumno';

        const alumno = this.alumnosService.obtenerPorId(id);
        if (alumno) {
          this.form.patchValue({
            nombre: alumno.nombre,
            apellido: alumno.apellido,
            email: alumno.email,
          });
        }
      }
    });
  }

  guardar() {
    if (this.form.invalid) return;

    const valores = this.form.value as Omit<Alumno, 'id'>;

    if (this.idAlumno) {
      // edición
      this.alumnosService.actualizar(this.idAlumno, valores);
    } else {
      // alta
      const nuevo: Alumno = {
        id: this.alumnosService.nuevoId(),
        ...valores,
      };
      this.alumnosService.crear(nuevo);
    }

    this.router.navigate(['/alumnos']);
  }

  cancelar() {
    this.router.navigate(['/alumnos']);
  }
}
