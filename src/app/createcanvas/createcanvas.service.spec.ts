import { TestBed } from '@angular/core/testing';

import { CreatecanvasService } from './createcanvas.service';

describe('CreatecanvasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreatecanvasService = TestBed.get(CreatecanvasService);
    expect(service).toBeTruthy();
  });
});
