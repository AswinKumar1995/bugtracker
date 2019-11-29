import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketHttpService } from 'src/app/ticket-http.service';
import { AppService } from 'src/app/app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { NotificationsHttpService } from 'src/app/notifications-http.service';
import { UploadService } from 'src/app/upload.service';



@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit {

  public currentTicket;

  public possibleStatuses = ["In Progress", "Testing", "Closed"];

  public ticketAssigneeId: String;
  public ticketReporterId: String;
  public assigneeFlag = false;
  public reporterFlag = false;
  public allUsers = []
  public allusersArray = []
  public userAndIdArray = []
  public currentTicketAssignee: String;
  public currentTicketReporter: String;
  public oldTicketData
  public ticketAttachments : string;
  public selectedFiles:any;

  constructor(private _route: ActivatedRoute, private router: Router,
    public ticketHttpService: TicketHttpService, private appService: AppService,
    public notificationHttpService:NotificationsHttpService,
    public uploadService:UploadService

  ) { }

  ngOnInit() {
    this.checkStatus()
    let myTicketId = this._route.snapshot.paramMap.get("ticketId");
    console.log("Extracted ticket Id");
    console.log(myTicketId);
   


    this.appService.getAllUsers().subscribe(
      data => {
        this.allUsers = data["data"]
        for (let userdetails in this.allUsers) {
          // console.log(this.allUsers[userdetails]["firstName"])
          let temp = this.allUsers[userdetails]["firstName"] + " " + this.allUsers[userdetails]["lastName"]
          this.allusersArray.push(temp);
          let tempId = this.allUsers[userdetails]["userId"]
          this.userAndIdArray.push([temp, tempId])
        }
      },
      error => {
        console.log(error)
      }
    )
    this.ticketHttpService.getSingleTicketInformation(myTicketId).subscribe(

      data => {
        console.log("ticket id data extracted")
        this.currentTicket = data["data"];
        this.oldTicketData = this.currentTicket
        for (let user of this.userAndIdArray) {
          if (user[1] === this.currentTicket.reporter) {
            this.currentTicketReporter = user[0]
          }
          if (user[1] == this.currentTicket.assignee) {
            this.currentTicketAssignee = user[0]
          }
        }
      },
      error => {
        console.log("Error is received")
        console.log(error.errorMessage)
      }
    )

  }


  public editThisTicket(): any {
    this.upload()
    this.currentTicket.assignee = this.getName(this.currentTicket.assigneeId)
    this.currentTicket.reporter = this.getName(this.currentTicket.reporterId)
    console.log("File Name in Edit getting stored")
    console.log(Cookie.get("fileLocation"))

    if(Cookie.get("fileLocation") != "" && Cookie.get("fileLocation") != null){
      this.currentTicket["attachment"] = Cookie.get("fileLocation")

    }
    this.ticketHttpService.editTicket(this.currentTicket.ticketId, this.currentTicket).subscribe(
      data => {
        alert("Ticket edited successfully");
        setTimeout(() => {
          this.router.navigate(["/ticket", this.currentTicket.ticketId]);
          Cookie.delete('fileLocation')
        }, 2000
        )
        this.checkChangesInData(this.currentTicket)
      },
      error => {
        console.log(error.errorMessage)
        alert("some error occured")
      }
    )
  }

  

  

  public checkStatus = () => {
    if (Cookie.get('authToken') === undefined || Cookie.get('authToken') === '') {
      this.router.navigate(["/"]);
      return false;
    }
    else {
      return true;
    }
  }
  public getName(Id): any {
    for (let user of this.userAndIdArray) {
      if (user[1] === Id) {
        return user[0]
      }
    }
  }

  public upload() {
    const file = this.selectedFiles.item(0);
    let data = this.uploadService.uploadFile(file);
    }
    
   public  selectFile(event) {
    this.selectedFiles = event.target.files;
    }

  public checkChangesInData(oldData): any {
    console.log("Old Data")
    console.log(oldData)
    let userName = Cookie.get("receiverName")
    let notification = "Ticket ID "+  oldData["ticketId"] +  "is updated by " + userName
    let sendUsersArray = [...new Set(oldData["watcherlist"].concat( [oldData["reporterId"]].concat([oldData["assigneeId"]])))]
    for (let UserId of sendUsersArray) {
      let notificationData = { "notification": notification, "userId": UserId,"ticketId":oldData["ticketId"] }
      this.notificationHttpService.createNotification(notificationData).subscribe(
        data => {
          console.log(data)
        },
        error =>{
          console.log(error)
        }
      )
    }
  }
}
