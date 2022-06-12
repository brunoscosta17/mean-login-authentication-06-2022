import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountService } from './../../shared/services/account.service';
import { NotificationService } from './../../shared/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.accountService
      .login(this.form.value)
      .subscribe((response) => {
        console.log(response);
        if(response.error) {
        }
      }, (error) => {
        console.log(error);
      });
    // try {
    //   const result = await this.accountService.login(this.form.value);
    //   console.log(`login efetuado: ${result}`);
    //   this.router.navigate(['']);
    // } catch (error) {
    //   console.error(error);
    // }
  }

}
