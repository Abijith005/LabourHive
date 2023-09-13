import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOtpComponent } from './register-otp.component';

describe('RegisterOtpComponent', () => {
  let component: RegisterOtpComponent;
  let fixture: ComponentFixture<RegisterOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterOtpComponent]
    });
    fixture = TestBed.createComponent(RegisterOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
