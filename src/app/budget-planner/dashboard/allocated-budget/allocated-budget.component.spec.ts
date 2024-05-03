import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocatedBudgetComponent } from './allocated-budget.component';

describe('AllocatedBudgetComponent', () => {
  let component: AllocatedBudgetComponent;
  let fixture: ComponentFixture<AllocatedBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllocatedBudgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AllocatedBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
