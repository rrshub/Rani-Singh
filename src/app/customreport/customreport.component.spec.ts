import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomreportComponent } from './customreport.component';

describe('CustomreportComponent', () => {
  let component: CustomreportComponent;
  let fixture: ComponentFixture<CustomreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
