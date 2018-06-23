import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListComponentComponent } from './employee-list-component.component';

describe('EmployeeListComponentComponent', () => {
  let component: EmployeeListComponentComponent;
  let fixture: ComponentFixture<EmployeeListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeListComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
