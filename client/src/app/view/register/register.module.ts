import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import{RegisterComponent} from '../register/register.component'
import {RegisterRoutingModule} from '../../view/register/register-routing.module'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
  
    RegisterRoutingModule,
    FormsModule
    
  ],
  exports:[RegisterComponent]
})
export class RegisterModule { }
