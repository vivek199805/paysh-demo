import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerDashboardComponent } from './partner-dashboard.component';

describe('PartnerDashboardComponent', () => {
  let component: PartnerDashboardComponent;
  let fixture: ComponentFixture<PartnerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
