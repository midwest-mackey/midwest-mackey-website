import { TestBed } from '@angular/core/testing';

import { RandomIconService } from './random-icon.service';

describe('RandomIconService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RandomIconService = TestBed.inject(RandomIconService);
    expect(service).toBeTruthy();
  });
});
