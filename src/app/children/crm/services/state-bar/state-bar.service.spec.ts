import { TestBed } from '@angular/core/testing';

import { StateBarService } from './state-bar.service';

describe('StateBarService', () => {
  let service: StateBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
