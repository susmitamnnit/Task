import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import { from } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstNameText: any;
  lastNameText: any;
  EmailText: any;
  usernameText: any;
  passwordText: any;
  phoneText:any;
 

  constructor(private userService:UserService,
    private router:Router) { }

  ngOnInit() {
  
  }


  async onSubmit(userForm: any) {

    this.userService.newUser(userForm.value).then( data => {
      alert(" A New User has been register successfully !! ");
      this.router.navigateByUrl('/login');
      
      })
    }
  
}
