import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatCardModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountListComponentComponent } from './account-list-component/account-list-component.component';
import { AccountCreateComponentComponent } from './account-create-component/account-create-component.component';
import { EmployeeCreateComponentComponent } from './employee-create-component/employee-create-component.component';
import { EmployeeListComponentComponent } from './employee-list-component/employee-list-component.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountListComponentComponent,
    AccountCreateComponentComponent,
    EmployeeCreateComponentComponent,
    EmployeeListComponentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
