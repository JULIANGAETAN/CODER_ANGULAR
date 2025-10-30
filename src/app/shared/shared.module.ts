import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule, // 👈 trae todo Angular Material
  ],
  exports: [
    CommonModule,
    RouterModule,
    MaterialModule, // 👈 lo vuelve a exportar
  ],
})
export class SharedModule {}
