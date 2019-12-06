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
  //extract comments for that ticket
  public getSingleTicketComments(currentTicketId):any{
    let myResponse = this._http.get(this.baseUrl+"/"+currentTicketId+"/view")
    console.log(myResponse)
    return myResponse
  }
//create comments and save
  public createComment(commentData):any{
    let data = {}
    let myResponse = this._http.post(this.baseUrl+"/create",commentData)
    console.log(myResponse)
    return myResponse
  }
}

