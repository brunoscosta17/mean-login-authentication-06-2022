import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';

import { UserLogin } from './../models/user-login.model';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  constructor(private http: HttpClient) { }

  login(user: UserLogin): Observable<any> {
    return this.http.post(`${environment.api}/auth/login`, user);
  }

  createAccount(account: any) {
    return new Promise((resolve) => {
      resolve(true);
    })
  }

}
