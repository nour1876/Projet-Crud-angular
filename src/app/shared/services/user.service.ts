import { HttpClient } from "@angular/common/http";
import { Container } from "@angular/compiler/src/i18n/i18n_ast";
import { Injectable } from "@angular/core";
import { User } from "../Models/User.model";
@Injectable({
    providedIn: 'root'
  })
export class UserService{
    constructor(private http:HttpClient){}
    login(user:User){
        return this.http.post("http://localhost:8000/api/login",user);
    }
    register(user:User){
        return this.http.post("http://localhost:8000/api/register",user);
    }
    

}
