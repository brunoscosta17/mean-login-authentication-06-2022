import { Router } from '@angular/router';
import { AccountService } from './../../shared/services/account.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = {
    email: '',
    password: ''
  }

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log(this.form)
  }

  async onSubmit() {
    console.log(this.form);
    try {
      const result = await this.accountService.login(this.login);
      console.log(`login efetuado: ${result}`);
      this.router.navigate(['']);
    } catch (error) {
      console.error(error);
    }
  }

}
