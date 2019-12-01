import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import {Observable,Subject,throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentHttpService {

  public allComments
  public currentComments
//public baseUrl = "http://localhost:3000/api/v1/comments"
    public baseUrl = "*****"

  constructor(private _http:HttpClient) { 
    console.log("comment http called")
  }
  public getSingleTicketComments(currentTicketId):any{
    let myResponse = this._http.get(this.baseUrl+"/"+currentTicketId+"/view")
    console.log(myResponse)
    return myResponse
  }

  public createComment(commentData):any{
    let data = {}
    let myResponse = this._http.post(this.baseUrl+"/create",commentData)
    console.log(myResponse)
    return myResponse
  }
}

