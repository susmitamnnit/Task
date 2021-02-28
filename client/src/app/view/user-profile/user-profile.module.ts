import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserProfileComponent} from './user-profile.component';
import { FormsModule } from '@angular/forms';
import {UserProfileRoutingModule} from './user-profile-routing.module';
import { MatDialogModule } from "@angular/material/dialog";
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    UserProfileRoutingModule,
    MatDialogModule,
    MatButtonModule

  ],
  exports:[UserProfileComponent]
})
export class UserProfileModule { }
