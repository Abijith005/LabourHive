import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatejobProfileComponent } from './createjob-profile.component';

describe('CreatejobProfileComponent', () => {
  let component: CreatejobProfileComponent;
  let fixture: ComponentFixture<CreatejobProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatejobProfileComponent]
    });
    fixture = TestBed.createComponent(CreatejobProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
