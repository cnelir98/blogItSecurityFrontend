import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {CommentPost} from "../models/commentPost";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  user: User = new User();
  token!: any;

  login(username:string, password:string) : Observable<any>{
    this.user.name = username;
    this.user.password = password;
    return this.http.post<any>('http://localhost:3000/users/auth',this.user);
  }

  isLoggedIn(){
    return localStorage.getItem('token')!=null;
  }

  getUser(): User{
    this.token = localStorage.getItem('token');
    return jwt_decode(this.token) as User;
  }

  getToken(){
    return localStorage.getItem('token')||'';
  }

}
