import { TestBed } from '@angular/core/testing';

import { CombatHandlerService } from './combat-handler.service';

describe('CombatHandlerService', () => {
  let service: CombatHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombatHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
