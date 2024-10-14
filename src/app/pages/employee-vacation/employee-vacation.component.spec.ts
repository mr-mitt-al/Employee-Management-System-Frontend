import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeVacationComponent } from './employee-vacation.component';

describe('EmployeeVacationComponent', () => {
  let component: EmployeeVacationComponent;
  let fixture: ComponentFixture<EmployeeVacationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeVacationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
