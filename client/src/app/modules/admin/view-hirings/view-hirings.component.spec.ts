import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHiringsComponent } from './view-hirings.component';

describe('ViewHiringsComponent', () => {
  let component: ViewHiringsComponent;
  let fixture: ComponentFixture<ViewHiringsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewHiringsComponent]
    });
    fixture = TestBed.createComponent(ViewHiringsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
