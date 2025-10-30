import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';
import { Alumno } from '../../models/alumno.model';

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html'
})
export class AlumnosFormComponent implements OnInit {
  titulo = 'Nuevo alumno';
  editando = false;
  idAlumno: string | null = null;

  form = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    activo: [true],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alumnosService: AlumnosService
  ) {}

  ngOnInit(): void {
    // en tu routing está /alumnos/editar/:id
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editando = true;
      this.idAlumno = id;
      this.titulo = 'Editar alumno';

      const alumno = this.alumnosService
        .obtenerPorId
        ? this.alumnosService.obtenerPorId(id)
        : null;

      // por si no tenías obtenerPorId en el service:
      if (!alumno) {
        // lo busco “a mano”
        const lista = (this.alumnosService as any)._alumnos$?.value as Alumno[] | undefined;
        const encontrado = lista?.find(a => a.id === id);
        if (encontrado) {
          this.form.patchValue(encontrado);
        }
      } else {
        this.form.patchValue(alumno);
      }
    }
  }

  guardar() {
    if (this.form.invalid) return;

    const datos = this.form.value as Omit<Alumno, 'id'>;

    if (this.editando && this.idAlumno) {
      this.alumnosService.actualizar(this.idAlumno, datos);
    } else {
      // usamos el generador de ID que ya tenés en el service
      const nuevo: Alumno = {
        id: this.alumnosService.nuevoId(),
        ...datos,
      };
      this.alumnosService.crear(nuevo);
    }

    this.router.navigate(['/alumnos']);
  }

  cancelar() {
    this.router.navigate(['/alumnos']);
  }
}
