import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import{User} from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from '../../services/authentication.service'
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import {EditUserComponent} from '../../view/edit-user/edit-user.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  imageSrc: any;
  currentUser: any
  user = new User();


  constructor(private domSanitizer: DomSanitizer,
    private userService:UserService,
    private router:Router,
    private authService: AuthenticationService,
    public dialog: MatDialog 
    ) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    console.log(this.currentUser)
    this.userService.getUserById(this.currentUser._id).then(data => {
      this.user = data;
      console.log(this.user)
    })
  }
  uploadFile(event: any) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      console.log(fileList[0])
      const file: File = fileList[0];
      let checkFileType = file.name.split('.').pop();
      if (checkFileType == "png" || checkFileType == "jpeg" || checkFileType == "jpg" || checkFileType == "Gif" || checkFileType == "tiff" || checkFileType == "eps" || checkFileType == "ai" || checkFileType == "indd" || checkFileType == "raw") {
        const formData: FormData = new FormData();
        formData.append('uploadPic', file, file.name);
        this.userService.uploadImage(formData, this.currentUser._id).then(user => {
        alert("The profile is updated");
        location.reload();
        });
      }
      else {
        alert("Please choose valid image file type ")
      }
    }
  }

  transform() {
    return this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.user.imageSrc);
  }

  openEditProfile(): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
  
    });
  }

  deleteUser(){
  this.userService.deleteUser(this.currentUser._id).then(data=>{
   alert("user delete successfully");
   location.reload();
 })

  }
  logout(){
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }

}
