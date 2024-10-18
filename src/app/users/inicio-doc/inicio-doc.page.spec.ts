import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioDocPage } from './inicio-doc.page';

describe('InicioDocPage', () => {
  let component: InicioDocPage;
  let fixture: ComponentFixture<InicioDocPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioDocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
