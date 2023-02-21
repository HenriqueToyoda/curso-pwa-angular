import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSeguroComponent } from './listar-seguro.component';

describe('ListarSeguroComponent', () => {
  let component: ListarSeguroComponent;
  let fixture: ComponentFixture<ListarSeguroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSeguroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
