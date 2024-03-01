import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDistributorComponent } from './create-distributor.component';

describe('CreateDistributorComponent', () => {
  let component: CreateDistributorComponent;
  let fixture: ComponentFixture<CreateDistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDistributorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
