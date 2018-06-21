import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCreateComponentComponent } from './account-create-component.component';

describe('AccountCreateComponentComponent', () => {
  let component: AccountCreateComponentComponent;
  let fixture: ComponentFixture<AccountCreateComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCreateComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCreateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
