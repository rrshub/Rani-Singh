import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecanvasComponent } from './createcanvas.component';

describe('CreatecanvasComponent', () => {
  let component: CreatecanvasComponent;
  let fixture: ComponentFixture<CreatecanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatecanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
