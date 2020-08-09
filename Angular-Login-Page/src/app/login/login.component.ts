import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  userName: any;
  userPassword: any;
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [''],
      userPassword: ['']
    });
  }

  userDetailsSubmit() {
    if (this.userName && this.userPassword) {
      sessionStorage.setItem('userName', this.userName);
      sessionStorage.setItem('userPassword', this.userPassword);
    } else {
      sessionStorage.removeItem('userName');
      sessionStorage.removeItem('userPassword');
    }
    this.router.navigateByUrl('/welcome');
  }

}
