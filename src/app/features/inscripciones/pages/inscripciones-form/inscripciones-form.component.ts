import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InscripcionesService } from '../../services/inscripciones.service';
import { Inscripcion } from '../../models/inscripcion.model';

@Component({
  selector: 'app-inscripciones-form',
  templateUrl: './inscripciones-form.component.html',
  styleUrls: ['./inscripciones-form.component.scss'],
})
export class InscripcionesFormComponent implements OnInit {
  titulo = 'Nueva inscripción';
  idInsc?: string;

  form = this.fb.group({
    alumnoId: ['', Validators.required],
    cursoId: ['', Validators.required],
    fecha: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private inscService: InscripcionesService
  ) {}

  ngOnInit(): void {
    this.idInsc = this.route.snapshot.paramMap.get('id') ?? undefined;
    if (this.idInsc) {
      this.titulo = 'Editar inscripción';
      const insc = this.inscService.obtenerPorId(this.idInsc);
      if (insc) {
        this.form.patchValue({
          alumnoId: insc.alumnoId,
          cursoId: insc.cursoId,
          fecha: insc.fecha,
        });
      }
    }
  }

  guardar() {
    const v = this.form.value;
    if (this.idInsc) {
      this.inscService.actualizar(this.idInsc, {
        alumnoId: v.alumnoId ?? '',
        cursoId: v.cursoId ?? '',
        fecha: v.fecha ?? '',
      });
    } else {
      this.inscService.crear({
        alumnoId: v.alumnoId ?? '',
        cursoId: v.cursoId ?? '',
        fecha: v.fecha ?? '',
      });
    }
    this.router.navigate(['/inscripciones']);
  }

  cancelar() {
    this.router.navigate(['/inscripciones']);
  }
}
