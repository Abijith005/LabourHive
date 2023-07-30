import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobProfileComponent } from './edit-job-profile.component';

describe('EditJobProfileComponent', () => {
  let component: EditJobProfileComponent;
  let fixture: ComponentFixture<EditJobProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditJobProfileComponent]
    });
    fixture = TestBed.createComponent(EditJobProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
