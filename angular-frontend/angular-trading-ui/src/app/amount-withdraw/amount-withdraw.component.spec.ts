import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountWithdrawComponent } from './amount-withdraw.component';

describe('AmountWithdrawComponent', () => {
  let component: AmountWithdrawComponent;
  let fixture: ComponentFixture<AmountWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmountWithdrawComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
