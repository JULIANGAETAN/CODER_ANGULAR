import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../../services/cursos.service';
import { Curso } from '../../models/curso.model';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form!: FormGroup;
  esEdicion = false;
  idEditar!: string;

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
      activo: [true],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.idEditar = id;
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

  guardar() {
    if (this.form.invalid) return;

    if (this.esEdicion) {
      this.cursosService.actualizar(this.idEditar, this.form.value);
    } else {
      const nuevo: Curso = {
        id: this.cursosService.generarNuevoId(),
        ...this.form.value,
      };
      this.cursosService.agregar(nuevo);
    }

    this.router.navigate(['/cursos']);
  }

  cancelar() {
    this.router.navigate(['/cursos']);
  }
}
