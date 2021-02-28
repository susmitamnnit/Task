import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LoginModule} from '../../src/app/view/login/login.module'
import {Routes,RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {RegisterModule} from '../../src/app/view/register/register.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthenticationService} from '../../src/app/services/authentication.service'
import {UserService} from '../../src/app/services/user.service'
import {UserProfileModule} from '../../src/app/view/user-profile/user-profile.module';
import { EditUserComponent } from './view/edit-user/edit-user.component'
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';


const routes: Routes= [
  {
    path:'',redirectTo:'/login',pathMatch:'full'
  },
  
]




@NgModule({
  declarations: [
    AppComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    LoginModule,
    UserProfileModule,
    FormsModule,
    RegisterModule,
    MatDialogModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    RouterModule.forRoot(routes, { enableTracing: true }),
  
  ],
  entryComponents: [EditUserComponent],
  providers: [UserService,AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
