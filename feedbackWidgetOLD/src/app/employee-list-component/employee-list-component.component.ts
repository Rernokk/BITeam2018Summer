import { Component, OnInit } from '@angular/core';
import { EmployeeAccount } from '../Data/employeeAccount';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-list-component',
  templateUrl: './employee-list-component.component.html',
  styleUrls: ['./employee-list-component.component.scss']
})
export class EmployeeListComponentComponent implements OnInit {
  temp: EmployeeAccount = {
    a: 'abc',
    b: 'ASDF'
  };
  private str: string;
  private login: string;
  private password: string;
  private collection: object;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
     this.TryConnection();
     this.temp.a = 'a';
  }
  public TryConnection() {
      this.apiService.testConnection().subscribe((data: object) => {
          // Since we know what the return is, we can pull data as such.
          this.str = data['data'];
          console.log(data);
      });
  }
  createAccount(): void {
    // this.collection = this.apiService.createAccount(this.login, this.password);
    this.apiService.createAccount(this.login, this.password).subscribe((object: object) => {
      console.log(object['status']);
    });
  }

  loginAccount(): void {
    this.apiService.loginAccount( {'email' : 'ssmith37@uccs.edu', 'password' : 'BIProject' }).subscribe((object: object) => {
      console.log(object);
    });
  }

  test(): void {
    this.apiService.testAccountInfo().subscribe((data: object) => {
      console.log(data);
    });
  }
}
