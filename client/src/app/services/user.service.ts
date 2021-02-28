import { Inject, Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';


@Injectable()
export class UserService{
    baseUrl = environment.apiBaseUrl;
    currentUser : User;

    constructor(private http: HttpClient, private authService: AuthenticationService){}

    private async request(method: string , url : string, data?: any){
         const token = await this.authService.currentUserValue.token;

        // console.log('request ' + JSON.stringify(data));
        const result = this.http.request(method, url, {
            body: data,
            responseType: 'json',
            observe: 'body',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return new Promise<any>((resolve, reject) => {
            result.subscribe(resolve as any, reject as any);
        });
    }
    
    private async request1(method: string , url : string, data?: any){
        

       // console.log('request ' + JSON.stringify(data));
       const result = this.http.request(method, url, {
           body: data,
           responseType: 'json',
           observe: 'body',
       });
       return new Promise<any>((resolve, reject) => {
           result.subscribe(resolve as any, reject as any);
       });
   }

    async getCurrentUser(force: boolean) {
        if (this.currentUser === undefined || this.currentUser === null || force) {
            console.log('in getCurrentUser');
            await this.request('get', this.baseUrl + '/users/current').then(user => {
                console.log(user)
                this.currentUser = user;
            });
        }
        return this.currentUser;
    }

    getAllUser(){
        return this.request('get', this.baseUrl + '/users/');
    }

    uploadImage(uploadPic: any, user: any) {
        console.log('profile uploding' + uploadPic)
        console.log(uploadPic);
        console.log(user)
        return this.request('post', this.baseUrl + '/profile/' + user, uploadPic);
    }

    getUserById(id:any){
        console.log(id)
        return this.request('get', this.baseUrl +'/users/'+id);
      }

    updateUser(data: any) {
        console.log('profile updating' + data.id)
        console.log(data);
        return this.request('put', this.baseUrl+'/users/'+data.id, data);
    }
    newUser(user: User) {
        console.log("new User")
        console.log(user)
        return this.request1('post', this.baseUrl + '/users/register', user);
    }
    deleteUser(id:any){
        return this.request('delete', this.baseUrl +'/users/'+id);   
    }
}
