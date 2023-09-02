import { TestBed } from '@angular/core/testing';

import { AdminJobManagementService } from './admin-job-management.service';

describe('AdminJobManagementService', () => {
  let service: AdminJobManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminJobManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
