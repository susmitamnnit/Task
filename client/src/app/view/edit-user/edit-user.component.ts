import { Component, OnInit } from '@angular/core';
import { Inject } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { User } from '../../models/user.model';
import {UserService} from '../../services/user.service'


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  fname : any;
  lname : any;
  email : any;
  uname : any;
  constructor( public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService : UserService) { }

  ngOnInit() {
  }
  onSave() {
    // localStorage.setItem(this.dataArray, this.data);
    console.log(this.data);

    this.userService.updateUser(this.data).then(success => {
      alert ("Your data has been changed!");
      this.dialogRef.close();
    })
  }
  onCancel(): void {
    this.dialogRef.close();
  }

}
