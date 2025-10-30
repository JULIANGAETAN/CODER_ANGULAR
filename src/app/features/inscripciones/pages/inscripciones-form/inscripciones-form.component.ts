import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InscripcionesService } from '../../services/inscripciones.service';

@Component({
  selector: 'app-inscripciones-form',
  templateUrl: './inscripciones-form.component.html',
})
export class InscripcionesFormComponent implements OnInit {
  titulo = 'Nueva inscripción';
  editando = false;
  idInsc!: string;

  form = this.fb.group({
    alumnoId: ['', Validators.required],
    cursoId: ['', Validators.required],
    fecha: [new Date().toISOString().substring(0, 10), Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private inscService: InscripcionesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editando = true;
      this.idInsc = id;
      this.titulo = 'Editar inscripción';
      const insc = this.inscService.obtenerPorId(id);
      if (insc) {
        this.form.patchValue(insc);
      }
    }
  }

  guardar() {
    if (this.form.invalid) return;

    const raw = this.form.getRawValue();

    const inscLimpia = {
      alumnoId: raw.alumnoId ?? '',
      cursoId: raw.cursoId ?? '',
      fecha: raw.fecha ?? new Date().toISOString().substring(0, 10),
    };

    if (this.editando) {
      this.inscService.actualizar(this.idInsc, inscLimpia);
    } else {
      this.inscService.crear(inscLimpia);
    }

    this.router.navigate(['/inscripciones']);
  }

  cancelar() {
    this.router.navigate(['/inscripciones']);
  }
}
