import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderCreationComponent } from './trader-creation.component';

describe('TraderCreationComponent', () => {
  let component: TraderCreationComponent;
  let fixture: ComponentFixture<TraderCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraderCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraderCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
