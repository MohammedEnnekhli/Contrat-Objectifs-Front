import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  jwt: string;
  username: string;
  roles: Array<string>;
  host = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  login(data: any) {
   return this.http.post(this.host + '/login', data, {observe: 'response'});
  }

  saveToken(jwt: string) {
     localStorage.setItem('token', jwt);
     this.jwt = jwt;
     this.loadUserIdentity();


  }

  loadUserIdentity() {
    const jwtHelper = new JwtHelperService();
    const jwtObject = jwtHelper.decodeToken(this.jwt);
    this.username = jwtObject.sub;
    this.roles = jwtObject.roles;
    console.log(this.username);
    console.log(this.roles);
  }

  isAdmin(): boolean  {
    return this.roles === undefined ? false : this.roles.indexOf('ADMIN') >= 0;
  }
  isSimple(): boolean {
    return  this.roles === undefined ? false : this.roles.indexOf('PROF') >= 0;
  }

  isAuthenticated(): boolean {
    return (this.isAdmin() || this.isSimple());
  }


  loadToken() {
    this.jwt = localStorage.getItem('token');
    this.loadUserIdentity();
  }
  initParam() {
    this.jwt = undefined;
    this.username = undefined;
    this.roles = undefined;
  }

  logOut() {
     localStorage.removeItem('token');
     this.initParam();
  }



}
