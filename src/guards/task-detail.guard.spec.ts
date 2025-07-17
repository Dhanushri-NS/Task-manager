import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { taskDetailGuard } from './task-detail.guard';

describe('taskDetailGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => taskDetailGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
