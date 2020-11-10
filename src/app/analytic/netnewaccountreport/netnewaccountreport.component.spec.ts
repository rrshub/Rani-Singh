import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetnewaccountreportComponent } from './netnewaccountreport.component';

describe('NetnewaccountreportComponent', () => {
  let component: NetnewaccountreportComponent;
  let fixture: ComponentFixture<NetnewaccountreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetnewaccountreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetnewaccountreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
