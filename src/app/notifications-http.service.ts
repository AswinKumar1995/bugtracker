import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import {Observable,Subject,throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsHttpService {
  public allNotifications
  public currentNotification
  // public baseUrl = "http://localhost:3000/api/v1/notifications"
  public baseUrl = "http://api.kiddify.co.in/api/v1/notifications"

  constructor(private _http:HttpClient) {
    console.log("nottification http called")
   }
   public getAllNotificationByUserId(userId):any{
     let myResponse = this._http.get(this.baseUrl+"/"+userId+"/view")
     console.log(myResponse)
     return myResponse
   }

   public setNotificationSeen(userId):any{
     let myResponse = this._http.get(this.baseUrl+"/"+userId+"/seen")
     console.log(myResponse)
     return myResponse
   }


   public createNotification(notificationData):any{
     let data = []
     let myResponse = this._http.post(this.baseUrl+"/create",notificationData)
     console.log(myResponse)
     return myResponse
   }

   public getUnseenNotifications(userId):any{
     let data = []
     console.log("User id while sending request")
     console.log(userId)
     let myResponse = this._http.get(this.baseUrl+"/"+userId+"/dashboard")
     console.log(myResponse)
     return myResponse
   }




}
