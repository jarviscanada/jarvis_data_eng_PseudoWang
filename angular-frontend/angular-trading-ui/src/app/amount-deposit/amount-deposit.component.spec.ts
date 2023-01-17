import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountDepositComponent } from './amount-deposit.component';

describe('AmountDepositComponent', () => {
  let component: AmountDepositComponent;
  let fixture: ComponentFixture<AmountDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmountDepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
