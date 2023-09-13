import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLaboursComponent } from './view-labours.component';

describe('ViewLaboursComponent', () => {
  let component: ViewLaboursComponent;
  let fixture: ComponentFixture<ViewLaboursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewLaboursComponent]
    });
    fixture = TestBed.createComponent(ViewLaboursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
