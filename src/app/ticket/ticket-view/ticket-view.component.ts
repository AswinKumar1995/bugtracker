import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketHttpService } from 'src/app/ticket-http.service';
import { Location } from '@angular/common'
import { SharedModule } from 'src/app/shared/shared.module';
import { AppService } from 'src/app/app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css'],
  providers: [Location]
})
export class TicketViewComponent implements OnInit {

  color = 'accent';
  public checked :boolean;
  disabled = false;

  public currentTicket;
  public ticketId: any;
  public allUsers: any;
  public allusersArray = [];
  public allusersIdArray = [];
  public watcherNameArray = [];
  public receiverId: String;
  public receiverName: String;
  public allUsersObject = {};
  public userAndIdArray = []
  public currentTicketAssignee :String;
  public currentTicketReporter : String;
  public currentAttachement : String;
  public isChecked:any;
  public currentTicketId
  public currentTitle :string;
  public currentDescription:string;




  constructor(private appService: AppService, private _route: ActivatedRoute, private router: Router, public location: Location, public ticketHttpService: TicketHttpService) {
    this.receiverId = Cookie.get('receiverId');
    console.log(this.receiverId)
    this.receiverName = Cookie.get('receiverName');
    console.log(this.receiverName)
  }

  ngOnInit() {
    this.checkStatus()
    
    let ticketId = this._route.snapshot.paramMap.get("ticketId")
    this.currentTicketId = ticketId
    //extract all user details
    this.appService.getAllUsers().subscribe(
      data => {
        // console.log("All Users Data")
        this.allUsers = data["data"]
        //console.log(this.allUsers)
        for (let userdetails in this.allUsers) {
          // console.log(this.allUsers[userdetails]["firstName"])
          let _id = this.allUsers[userdetails]["userId"];
          this.allusersIdArray.push(_id);

          let temp = this.allUsers[userdetails]["firstName"] + " " + this.allUsers[userdetails]["lastName"]
          this.allusersArray.push(temp);
          let tempId = this.allUsers[userdetails]["userId"]
          this.userAndIdArray.push([temp,tempId])
        }
      },
      error => {
        console.log(error)
      }
    )

    this.allUsersObject = { "userName": this.allusersArray, "userId": this.allusersIdArray }


//get single ticket details to view
    this.ticketHttpService.getSingleTicketInformation(ticketId).subscribe(
      data => {
        this.currentTicket = data["data"]
        console.log(this.currentTicket)
        this.currentAttachement = this.currentTicket.attachment
        this.currentTitle = this.currentTicket.title
        this.currentDescription = this.currentTicket.description
        this.updateWatcherList()
        console.log("Watcher Array")
        console.log(this.watcherNameArray)
        for (let user of this.userAndIdArray){
          if(user[1] === this.currentTicket.reporter){
            this.currentTicketReporter = user[0]
            console.log(this.currentTicketAssignee)
          }
          if(user[1] == this.currentTicket.assignee){
            this.currentTicketAssignee = user[0]
          }
        }
      },
      error => {
        console.log("some error occured")
        console.log(error.errorMessage)
      }
    )
      
  }

  public goBackToPreviousPage(): any {
    this.location.back();
  }
  public onChange(buttonStatus,ticket): any {
    //console.log("Toggle Status")
    //console.log(buttonStatus)
    if (buttonStatus === true) {
      console.log("Add Watcher")
      // console.log(ticket)
      console.log(ticket)
      console.log(this.receiverId)
      this.ticketHttpService.addWatcherToTicket(ticket, this.receiverId).subscribe(
        data => {
          this.currentTicket = data
          //console.log("new data")
          //console.log(data)
          this.updateWatcherList()
        },
        error => {
          console.log(error)
        }
      )
    }
    else {
      console.log("Remove Watcher")
      console.log(this.receiverId)
      this.ticketHttpService.removeWatcherToTicket(ticket, this.receiverId).subscribe(
        data => {
          this.currentTicket = data
          //console.log("new data")
          //console.log(data)
          this.updateWatcherList()
        },
        error => {
          console.log(error)
        }

      )

    }
  }

  // updating watcherlist upon clicking toggle button
  public updateWatcherList():any{
    this.watcherNameArray = [];
    var varUserId = this.allusersIdArray
    var varUserName = this.allusersArray
    var newusersArray = varUserName.map(function (name, index) {
      return [varUserId[index], name]
    });
    for (let user of newusersArray) {
      for (let watcherId of this.currentTicket.watcherlist) {
        if (user[0] === watcherId) {
          this.watcherNameArray.push(user[1])
        }
        if(watcherId == this.receiverId){
          this.checked = true;
        }
      }
    }
    console.log(this.watcherNameArray)
  }

  ngOnDestroy() {
    console.log("ticket view component is destroyed")
  }

  public checkStatus = () => {
    if(Cookie.get('authToken') === undefined || Cookie.get('authToken') === ''){
      this.router.navigate(["/"]);
      return false;
    }
    else {
      return true;
    }
  }

}
