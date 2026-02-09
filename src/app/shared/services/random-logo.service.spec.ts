import { TestBed } from '@angular/core/testing';

import { RandomLogoService } from './random-logo.service';

describe('RandomLogoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RandomLogoService = TestBed.inject(RandomLogoService);
    expect(service).toBeTruthy();
  });
});
