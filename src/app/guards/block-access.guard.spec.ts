import { TestBed, async, inject } from '@angular/core/testing';

import { BlockAccessGuard } from './block-access.guard';

describe('BlockAccessGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlockAccessGuard]
    });
  });

  it('should ...', inject([BlockAccessGuard], (guard: BlockAccessGuard) => {
    expect(guard).toBeTruthy();
  }));
});
