import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntermultiplevaluesComponent } from './entermultiplevalues.component';

describe('EntermultiplevaluesComponent', () => {
  let component: EntermultiplevaluesComponent;
  let fixture: ComponentFixture<EntermultiplevaluesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntermultiplevaluesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntermultiplevaluesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
