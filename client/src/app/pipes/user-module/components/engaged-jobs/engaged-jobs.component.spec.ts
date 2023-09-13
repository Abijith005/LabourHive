import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagedJobsComponent } from './engaged-jobs.component';

describe('EngagedJobsComponent', () => {
  let component: EngagedJobsComponent;
  let fixture: ComponentFixture<EngagedJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EngagedJobsComponent]
    });
    fixture = TestBed.createComponent(EngagedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
