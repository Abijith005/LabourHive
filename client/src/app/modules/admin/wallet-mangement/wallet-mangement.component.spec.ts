import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletMangementComponent } from './wallet-mangement.component';

describe('WalletMangementComponent', () => {
  let component: WalletMangementComponent;
  let fixture: ComponentFixture<WalletMangementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalletMangementComponent]
    });
    fixture = TestBed.createComponent(WalletMangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
