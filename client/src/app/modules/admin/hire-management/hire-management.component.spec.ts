import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireManagementComponent } from './hire-management.component';

describe('HireManagementComponent', () => {
  let component: HireManagementComponent;
  let fixture: ComponentFixture<HireManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HireManagementComponent]
    });
    fixture = TestBed.createComponent(HireManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
