import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TieBreakerComponent } from './tie-breaker.component';

describe('TieBreakerComponent', () => {
  let component: TieBreakerComponent;
  let fixture: ComponentFixture<TieBreakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TieBreakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TieBreakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
