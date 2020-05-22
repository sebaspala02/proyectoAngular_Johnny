import { TestBed } from '@angular/core/testing';

import { ForeignService } from './foreign.service';

describe('ForeignService', () => {
  let service: ForeignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForeignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
