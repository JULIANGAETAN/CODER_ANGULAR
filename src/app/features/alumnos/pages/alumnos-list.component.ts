import { AfterViewInit, Component, ViewChild, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { Alumno } from '../models/alumno.model';
import { AlumnosService } from '../services/alumnos.service';

@Component({
  selector: 'app-alumnos-list',
  standalone: true,
  imports: [CommonModule, SharedModule, MatChipsModule],
  templateUrl: './alumnos-list.component.html',
  styles: [`
    .w-full{width:100%}.mt-4{margin-top:1rem}.p-4{padding:1rem}
  `]
})
export class AlumnosListComponent implements AfterViewInit {
  displayedColumns = ['id', 'nombre', 'apellido', 'email', 'activo', 'acciones'];
  dataSource = new MatTableDataSource<Alumno>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Alumno>;

  constructor(
    private alumnosSvc: AlumnosService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private zone: NgZone
  ) { }
  // Suscripción y render después de que la vista existe (evita el "no muestra hasta click")
ngAfterViewInit(): void {
  this.alumnosSvc.listar().subscribe((data) => {
    // correr dentro de Angular por si el stream llegó fuera de zona
    this.zone.run(() => {
      this.dataSource = new MatTableDataSource<Alumno>(data);

      this.dataSource.filterPredicate = (a, f) =>
        (a.nombre + ' ' + a.apellido + ' ' + a.email + ' ' + a.id)
          .toLowerCase()
          .includes((f || '').trim().toLowerCase());

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // asegurar detección + render
      this.cdr.detectChanges();
      this.table?.renderRows();
      (this.dataSource as any)._updateChangeSubscription?.();
    });
  });
}
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value ?? '';
    this.dataSource.filter = value;
  }

  // ====== ABM ======
  agregar() {
    this.abrirDialogo();
  }

  editar(a: Alumno) {
    this.abrirDialogo(a);
  }

  eliminar(a: Alumno) {
    if (confirm(`¿Eliminar a ${a.nombre} ${a.apellido}?`)) {
      this.alumnosSvc.eliminar(a.id);
    }
  }

  private abrirDialogo(alumno?: Alumno) {
    import('../components/alumno-dialog.component').then(m => {
      this.dialog.open(m.AlumnoDialogComponent, {
        width: '520px',
        data: alumno ?? null,
        disableClose: true,
      });
    });
  }

  // (opcional) botón de restaurar, si lo agregaste en el HTML
  restaurar() {
    this.alumnosSvc.reset();
  }
}
