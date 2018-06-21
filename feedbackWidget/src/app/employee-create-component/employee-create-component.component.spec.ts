import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCreateComponentComponent } from './employee-create-component.component';

describe('EmployeeCreateComponentComponent', () => {
  let component: EmployeeCreateComponentComponent;
  let fixture: ComponentFixture<EmployeeCreateComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCreateComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCreateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
