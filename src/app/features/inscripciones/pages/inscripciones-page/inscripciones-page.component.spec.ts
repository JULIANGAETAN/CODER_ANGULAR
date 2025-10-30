import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionesPageComponent } from './inscripciones-page.component';

describe('InscripcionesPageComponent', () => {
  let component: InscripcionesPageComponent;
  let fixture: ComponentFixture<InscripcionesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscripcionesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
