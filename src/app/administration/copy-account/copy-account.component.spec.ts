import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyAccountComponent } from './copy-account.component';

describe('CopyAccountComponent', () => {
  let component: CopyAccountComponent;
  let fixture: ComponentFixture<CopyAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
