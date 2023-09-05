import { TestBed } from '@angular/core/testing';

import { AdminHireManagementService } from './admin-hire-management.service';

describe('AdminHireManagementService', () => {
  let service: AdminHireManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminHireManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
