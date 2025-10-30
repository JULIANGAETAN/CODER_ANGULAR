import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
})
export class CursosFormComponent implements OnInit {
  titulo = 'Nuevo curso';
  editando = false;
  idCurso!: string;

  form = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: [''],
    activo: [true],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cursosService: CursosService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editando = true;
      this.idCurso = id;
      this.titulo = 'Editar curso';
      const curso = this.cursosService.obtenerPorId(id);
      if (curso) {
        this.form.patchValue(curso);
      }
    }
  }

  guardar() {
    if (this.form.invalid) return;

    const raw = this.form.getRawValue();

    const cursoLimpio = {
      nombre: raw.nombre ?? '',
      descripcion: raw.descripcion ?? '',
      activo: raw.activo ?? false,
    };

    if (this.editando) {
      this.cursosService.actualizar(this.idCurso, cursoLimpio);
    } else {
      this.cursosService.crear(cursoLimpio);
    }

    this.router.navigate(['/cursos']);
  }

  cancelar() {
    this.router.navigate(['/cursos']);
  }
}

