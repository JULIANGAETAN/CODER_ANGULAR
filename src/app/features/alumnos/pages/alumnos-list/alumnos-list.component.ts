import { Component } from '@angular/core';

@Component({
  selector: 'app-alumnos-list',
  templateUrl: './alumnos-list.component.html'
})
export class AlumnosListComponent {
  alumnos = [
    { id: 'A-001', nombre: 'Ana', apellido: 'Pérez', email: 'ana.perez@mail.com', activo: true },
    { id: 'A-002', nombre: 'Luis', apellido: 'Gómez', email: 'luis.gomez@mail.com', activo: false },
    { id: 'A-003', nombre: 'Sofía', apellido: 'Luna', email: 'sofia.luna@mail.com', activo: true },
  ];
}
