import { TestBed } from '@angular/core/testing';

import { AdminPaymentManagementService } from './admin-payment-management.service';

describe('AdminPaymentManagementService', () => {
  let service: AdminPaymentManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPaymentManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
