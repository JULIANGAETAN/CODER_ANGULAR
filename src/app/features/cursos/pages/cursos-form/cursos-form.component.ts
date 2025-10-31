import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso, CursosService } from '../../../cursos/services/cursos.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form!: FormGroup;
  esEdicion = false;
  idCurso!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cursosService: CursosService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      activo: [false],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'nuevo') {
      this.esEdicion = true;
      this.idCurso = id;
      const curso = this.cursosService.obtenerPorId(id);
      if (curso) {
        this.form.patchValue({
          nombre: curso.nombre,
          descripcion: curso.descripcion,
          activo: curso.activo,
        });
      }
    }
  }

  guardar(): void {
    if (this.form.invalid) return;

    const payload = this.form.value as Omit<Curso, 'id'>;

    if (this.esEdicion) {
      this.cursosService.actualizar(this.idCurso, payload);
    } else {
      this.cursosService.crear(payload);
    }

    this.router.navigate(['/cursos']);
  }

  cancelar(): void {
    this.router.navigate(['/cursos']);
  }
}
