import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkMangementComponent } from './work-mangement.component';

describe('WorkMangementComponent', () => {
  let component: WorkMangementComponent;
  let fixture: ComponentFixture<WorkMangementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkMangementComponent]
    });
    fixture = TestBed.createComponent(WorkMangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
