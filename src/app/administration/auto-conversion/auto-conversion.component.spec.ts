import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoConversionComponent } from './auto-conversion.component';

describe('AutoConversionComponent', () => {
  let component: AutoConversionComponent;
  let fixture: ComponentFixture<AutoConversionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoConversionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
