import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaddetailreportComponent } from './leaddetailreport.component';

describe('LeaddetailreportComponent', () => {
  let component: LeaddetailreportComponent;
  let fixture: ComponentFixture<LeaddetailreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaddetailreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaddetailreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
