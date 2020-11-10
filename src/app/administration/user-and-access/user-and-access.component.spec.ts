import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAndAccessComponent } from './user-and-access.component';

describe('UserAndAccessComponent', () => {
  let component: UserAndAccessComponent;
  let fixture: ComponentFixture<UserAndAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAndAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAndAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
