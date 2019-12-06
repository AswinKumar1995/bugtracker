import { Component, OnInit,OnDestroy,ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketHttpService } from 'src/app/ticket-http.service';
import { AppService } from 'src/app/app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { NotificationsHttpService } from 'src/app/notifications-http.service';
import { UploadService } from 'src/app/upload.service';
import { ToastrService } from 'ngx-toastr';
import { CKEditor4 } from 'ckeditor4-angular';



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
    public uploadService:UploadService,
    public toastr:ToastrService,
    public vcr:ViewContainerRef


  ) { }

  ngOnInit() {
    this.checkStatus()
    let myTicketId = this._route.snapshot.paramMap.get("ticketId");
    console.log("Extracted ticket Id");
    console.log(myTicketId);
   //extracting all user details
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
    //extracting ticket details to edit
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
 // saving the changes in database

  public editThisTicket(): any {
    
    this.currentTicket.assignee = this.getName(this.currentTicket.assigneeId)
    this.currentTicket.reporter = this.getName(this.currentTicket.reporterId)
    console.log("File Name in Edit getting stored")
    console.log(Cookie.get("fileLocation"))

    if(Cookie.get("fileLocation") != "" && Cookie.get("fileLocation") != null){
      this.currentTicket["attachment"] = Cookie.get("fileLocation")

    }
    this.ticketHttpService.editTicket(this.currentTicket.ticketId, this.currentTicket).subscribe(
      data => {
        this.toastr.success("Ticket updated successfully")
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

  

  // checking authtoken

  public checkStatus = () => {
    if (Cookie.get('authToken') === undefined || Cookie.get('authToken') === '') {
      this.router.navigate(["/"]);
      return false;
    }
    else {
      return true;
    }
  }
  //extracting username with user id
  public getName(Id): any {
    for (let user of this.userAndIdArray) {
      if (user[1] === Id) {
        return user[0]
      }
    }
  }

  //used for uploading the files to aws s3

  public upload() :any {
   // this.toastr.warning("Please wait the file is loading..")
    const file = this.selectedFiles.item(0);
    let data = this.uploadService.uploadFile(file);
    console.log("Upload completed")
    this.toastr.success("File Upload Completed")
    return true
    }
    
   public  selectFile(event) {
    this.selectedFiles = event.target.files;
    }

    // create notification

  public checkChangesInData(oldData): any {
    console.log("Old Data")
    console.log(oldData)
    let userName = Cookie.get("receiverName")
    let notification = "Ticket ID "+  oldData["ticketId"] +  " is updated by " + userName
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
// check changes in text editor
  public onChange( event: CKEditor4.EventInfo ) {
    // console.log( );
    this.currentTicket.description = event.editor.getData() 
}
}
