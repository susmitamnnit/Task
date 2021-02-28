import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { Auth } from '../models/auth.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
// import { UserService } from './user.service';


@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Auth>;
    public currentUser: Observable<Auth>;

    baseUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Auth>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Auth {
        return this.currentUserSubject.value;
    }

    login(authCredentials) {
        console.log(authCredentials.username);
        return this.http.post<any>(this.baseUrl + '/users/authenticate', { username: authCredentials.username.value, password: authCredentials.password.value})
            .pipe(map(user => {
                console.log('user ' + JSON.stringify(user));
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    return true;
                }
                else {
                    return false;
                }
            }));
    }

 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
    

    verifyUser(username, password){

        return this.http.post<any>(this.baseUrl + '/users/authenticate', { username: username, password: password})
            .pipe(map(user => {
                if(user && user.token) {
                    return true;
                } else {
                    return false;
                }
            }));
    }
}