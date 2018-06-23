import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { parseCookieValue } from '@angular/common/src/cookie';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = 'http://api.teamlinkage.com/api';
  constructor(private httpClient: HttpClient) { }
  testConnection() {
    return this.httpClient.get(`${this.API_URL}`);
  }
  public createAccount(user: string, pw: string) {
    console.log(`user: ${user}, pass: ${pw}`);
    return this.httpClient.post(`${this.API_URL}/new`, 
    {
      'account' : {
          'organization' : 'BI Team',
          'description' : ''
      },
      'employee' : {
          'first_name' : 'BI',
          'last_name' : 'Team',
          'email': 'ssmith37@uccs.edu',
          'password': 'BIProject',
          'title': 'CEO'
      }
    });
  }

  public loginAccount(loginInfo: object) {
    return this.httpClient.post(`${this.API_URL}/login`, loginInfo);
  }
  public testAccountInfo() {
    const pairs = document.cookie.split(';');
    for (let i = 0; i < pairs.length; i++) {
      console.log(pairs[i]);
    }
    return this.httpClient.get(`${this.API_URL}/session`, {'headers': {'cookie': 'id'}});
  }
}
