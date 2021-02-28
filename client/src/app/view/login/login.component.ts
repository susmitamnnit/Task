import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import { Router } from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usernameText:any;
  passwordText:any;
  constructor(private authService:AuthenticationService,
    private router:Router) { }

  ngOnInit() {
  }
  onSubmit(loginForm: NgForm) {
    console.log(loginForm.value)
    this.authService.login(loginForm.controls)
    .pipe(first())
    .subscribe(
      data => {
        console.log("data");
        console.log(data)
        this.router.navigateByUrl('/userProfile');
       
      },
      error => {
        console.log("error")
        alert("Incorrect Username or Password")
      });
    }

}

