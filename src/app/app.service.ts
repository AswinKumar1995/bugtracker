import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Cookie} from 'ng2-cookies/ng2-cookies'
import {HttpClient,HttpHeaders, HttpParams, HttpErrorResponse, HttpBackend} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // private url = "http://localhost:3000";
  private url = "8****";
  constructor(private http:HttpClient) { }
// get user data from local storage
  public getUserInfoFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  }
// store user data to local storage
  public setUserInFoInLocalStorage = (data) => {
    localStorage.setItem('userInfo',JSON.stringify(data));
  }
//store register details
  public signUpFunction(data): Observable<any> {
    const params = new HttpParams()
    .set('firstName',data.firstName)
    .set('lastName',data.lastName)
    .set('email',data.email)
    .set('password',data.password)
  return this.http.post(`${this.url}/api/v1/users/signup`,params)
  }
//check email and password for signin
  public signinFunction(data): Observable<any> {
    const params = new HttpParams()
    .set('email',data.email)
    .set('password',data.password)
    return this.http.post(`${this.url}/api/v1/users/login`,params)
  }
// get all user details
  public getAllUsers():any{
    let myResponse = this.http.get(this.url+"/api/v1/users/view/all")
    console.log(myResponse)
    return myResponse
  }
// start logout functionality
  public logout(): Observable<any> {
    let userId = Cookie.get("receiverId")
    const params = new HttpParams()
      .set('authToken',Cookie.get('authToken'))
    return this.http.post(`${this.url}/api/v1/users/${userId}/logout`,params);

  }
}
