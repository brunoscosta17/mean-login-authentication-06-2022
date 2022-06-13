import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountService } from './../../shared/services/account.service';
import { NotificationService } from './../../shared/services/notification.service';

import Swal from 'sweetalert2'

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
        if(response && response.token) {
          window.localStorage.setItem('token', response.token);
          this.router.navigate(['']);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: response.message,
            showConfirmButton: false,
            timer: 1000
          });
        }
      }, (error) => {
        console.error(error);
        Swal.fire({
          title: 'Error!',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'Close'
        });
      });
  }

}
