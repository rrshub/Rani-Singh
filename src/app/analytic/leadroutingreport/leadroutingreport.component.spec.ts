import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadroutingreportComponent } from './leadroutingreport.component';

describe('LeadroutingreportComponent', () => {
  let component: LeadroutingreportComponent;
  let fixture: ComponentFixture<LeadroutingreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadroutingreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadroutingreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
