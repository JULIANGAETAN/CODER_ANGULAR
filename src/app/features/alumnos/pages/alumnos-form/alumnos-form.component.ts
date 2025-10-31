import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';
import { Alumno } from '../../models/alumno.model';

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.scss'],
})
export class AlumnosFormComponent implements OnInit {
  form!: FormGroup;
  titulo = 'Agregar alumno';
  idAlumno: string | null = null;

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

    // si viene /alumnos/editar/A-001
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
            activo: (alumno as any).activo ?? true,
          });
        }
      }
    });
  }

  guardar(): void {
    if (this.form.invalid) return;

    const valores = this.form.value;

    if (this.idAlumno) {
      // editar
      this.alumnosService.actualizar(this.idAlumno, valores);
    } else {
      // crear
      const nuevo: Alumno = {
        id: this.alumnosService.nuevoId(),
        nombre: valores.nombre,
        apellido: valores.apellido,
        email: valores.email,
        activo: valores.activo ?? true,   //  acá lo forzamos
      };
      this.alumnosService.crear(nuevo);
    }

    this.router.navigate(['/alumnos']);
  }

  cancelar(): void {
    this.router.navigate(['/alumnos']);
  }
}
