import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Cookie} from 'ng2-cookies/ng2-cookies'
import {HttpClient,HttpHeaders, HttpParams, HttpErrorResponse, HttpBackend} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // private url = "http://localhost:3000";
  private url = "http://api.kiddify.co.in";
  constructor(private http:HttpClient) { }

  public getUserInfoFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public setUserInFoInLocalStorage = (data) => {
    localStorage.setItem('userInfo',JSON.stringify(data));
  }

  public signUpFunction(data): Observable<any> {
    const params = new HttpParams()
    .set('firstName',data.firstName)
    .set('lastName',data.lastName)
    .set('email',data.email)
    .set('password',data.password)
  return this.http.post(`${this.url}/api/v1/users/signup`,params)
  }

  public signinFunction(data): Observable<any> {
    const params = new HttpParams()
    .set('email',data.email)
    .set('password',data.password)
    return this.http.post(`${this.url}/api/v1/users/login`,params)
  }

  public getAllUsers():any{
    let myResponse = this.http.get(this.url+"/api/v1/users/view/all")
    console.log(myResponse)
    return myResponse
  }

  public logout(): Observable<any> {
    let userId = Cookie.get("receiverId")
    const params = new HttpParams()
      .set('authToken',Cookie.get('authToken'))
    return this.http.post(`${this.url}/api/v1/users/${userId}/logout`,params);

  }
}
