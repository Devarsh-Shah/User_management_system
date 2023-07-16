import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  getLoginData: any;
  invalidCredential: boolean = false;

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    this.fetchLoginData();
  }

  //Purpose: Fetching user credentials from database
  fetchLoginData() {
    this.loginService.getLoginData().subscribe((res) => {
      this.getLoginData = res;
      console.log(res);
    });
  }

  //Purpose: checking user credentials with database
  checkLogin() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      if (email == this.getLoginData.email && password == this.getLoginData.password) {
        this.authService.login();
        this.router.navigateByUrl('dashboard');
      } else {
        this.invalidCredential = true;
        console.log('Invalid credentials');
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
