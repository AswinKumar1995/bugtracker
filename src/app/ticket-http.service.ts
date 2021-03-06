import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable,Subject,throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TicketHttpService {
  public allTickets
  public currentTicket
 //public baseUrl = "http://localhost:3000/api/v1/tickets"
   public baseUrl = "*****"
  constructor(private _http:HttpClient) {
    console.log("ticket http constructor is called")
   }
   // get all ticket data
  public getAllTickets(): any {
    let myResponse = this._http.get(this.baseUrl + "/all")
    console.log(myResponse)
    return myResponse
  }

  //get single ticket information

  public getSingleTicketInformation(currentTicketId):any{
    let myResponse = this._http.get(this.baseUrl+"/"+ currentTicketId+"/view")
    console.log(myResponse)
    return myResponse
  }
  //create ticket
  public createTicket(ticketData):any {
    let data = {}
    let myResponse = this._http.post(this.baseUrl+"/create",ticketData)
    console.log(myResponse)
    return myResponse
  }
  //edit ticket
  public editTicket(ticketId,ticketData) : any {
    let data = {}
    let myResponse = this._http.put(this.baseUrl+"/"+ticketId+"/edit",ticketData)
    console.log(myResponse)
    return myResponse;
  }
// add watcher to ticket
  public addWatcherToTicket(ticketId,userId):any{

    let myResponse = this._http.get(this.baseUrl+"/"+ticketId+"/addWatcher/"+userId)
    console.log(myResponse)
    return myResponse
  }
//remove watcher from ticket
  public removeWatcherToTicket(ticketId,userId):any{
    let myResponse = this._http.get(this.baseUrl+"/"+ticketId+"/removeWatcher/"+userId)
    console.log(myResponse)
    return myResponse
  }


}
