import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, RouterLink, RouterLinkActive,
    MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule
  ],
  template: `
  <mat-sidenav-container class="layout-container">
    <mat-sidenav #sidenav mode="side" [opened]="opened()">
      <mat-toolbar color="primary">Menú</mat-toolbar>

      <mat-nav-list>
        <a mat-list-item routerLink="/alumnos" routerLinkActive="active">Alumnos</a>
        <!-- Links futuros si querés:
        <a mat-list-item routerLink="/cursos" routerLinkActive="active">Cursos</a>
        <a mat-list-item routerLink="/inscripciones" routerLinkActive="active">Inscripciones</a>
        -->
      </mat-nav-list>
    </mat-sidenav>

    <mat-sidenav-content>
      <mat-toolbar color="primary">
        <button mat-icon-button (click)="toggle(sidenav)" class="mr-2">
          <mat-icon>menu</mat-icon>
        </button>
        <span>Gestión de Cursos</span>
        <span class="spacer"></span>
        <button mat-icon-button><mat-icon>account_circle</mat-icon></button>
      </mat-toolbar>

      <div class="page-content">
        <router-outlet></router-outlet>
      </div>
    </mat-sidenav-content>
  </mat-sidenav-container>
  `,
  styles: [`
    .layout-container { height: 100vh; }
    .page-content { padding: 16px; }
    .spacer { flex: 1 1 auto; }
    .mr-2 { margin-right: 8px; }
    a.active { background: rgba(0,0,0,.06); }
  `]
})
export class LayoutComponent {
  opened = signal(true);
  toggle(sidenav: any) {
    // si el viewport es chico, podés cambiar comportamiento aquí
    sidenav.toggle();
  }
}
