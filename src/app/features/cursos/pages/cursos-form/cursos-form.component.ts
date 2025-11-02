import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../../services/cursos.service';
import { Curso } from '../../models/curso.model';

@Component({
  selector: 'app-cursos-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private cursosService = inject(CursosService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  titulo = 'Nuevo curso';
  form!: FormGroup;
  idEditando: string | null = null;

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      activo: [true],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        const curso = this.cursosService.obtenerPorId(id);
        if (curso) {
          this.idEditando = id;
          this.titulo = 'Editar curso';
          this.form.patchValue(curso);
        }
      }
    });
  }

  guardar(): void {
    if (this.form.invalid) return;

    const valores = this.form.value as Omit<Curso, 'id'>;

    if (this.idEditando) {
      this.cursosService.actualizar(this.idEditando, valores);
    } else {
      this.cursosService.crear({
        id: this.cursosService.nuevoId(),
        ...valores,
      });
    }

    this.router.navigate(['/cursos']);
  }

  cancelar(): void {
    this.router.navigate(['/cursos']);
  }
}
