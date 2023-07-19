import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryMangementComponent } from './category-mangement.component';

describe('CategoryMangementComponent', () => {
  let component: CategoryMangementComponent;
  let fixture: ComponentFixture<CategoryMangementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryMangementComponent]
    });
    fixture = TestBed.createComponent(CategoryMangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
