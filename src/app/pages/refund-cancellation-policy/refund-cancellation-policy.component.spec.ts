import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundCancellationPolicyComponent } from './refund-cancellation-policy.component';

describe('RefundCancellationPolicyComponent', () => {
  let component: RefundCancellationPolicyComponent;
  let fixture: ComponentFixture<RefundCancellationPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundCancellationPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundCancellationPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
