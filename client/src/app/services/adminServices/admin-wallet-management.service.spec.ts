import { TestBed } from '@angular/core/testing';

import { AdminWalletManagementService } from './admin-wallet-management.service';

describe('AdminWalletManagementService', () => {
  let service: AdminWalletManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminWalletManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
