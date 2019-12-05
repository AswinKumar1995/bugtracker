import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { TicketHttpService } from 'src/app/ticket-http.service';
import { AppService } from 'src/app/app.service';

import { Cookie } from 'ng2-cookies/ng2-cookies';
import { UploadService } from 'src/app/upload.service';
import { FormGroup, FormControl } from '@angular/forms';
import { NotificationsHttpService } from 'src/app/notifications-http.service';
import { ToastrService } from 'ngx-toastr';
import { CKEditor4 } from 'ckeditor4-angular';







@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {
  constructor(private ticketHttpService:TicketHttpService,private _route:ActivatedRoute,
    private router:Router,
    private appService:AppService,
    private uploadService:UploadService,
    private notificationHttpService:NotificationsHttpService,
    public toastr : ToastrService) { }

  public ticketTitle : string;
  public ticketDescription:string;
  public ticketStatus :string;
  public ticketReporter : string;
  public ticketAssignee : string;
  public ticketAssigneeId : string;
  public ticketReporterId : string;
  public ticketAttachments:string;
  public possibleStatuses = ["In Progress","Testing","Closed"];
  public allUsers = []
  public allusersArray = []
  public userAndIdArray = []
  public selectedFiles:any;
  public tick
  editorForm :FormGroup
  


  ngOnInit() {
    this.checkStatus()
    this.appService.getAllUsers().subscribe(
      data => {
        console.log("All Users Data")
        console.log(data["data"]);
        this.allUsers = data["data"]
        for (let userdetails in this.allUsers) {
         // console.log(this.allUsers[userdetails]["firstName"])
          let temp = this.allUsers[userdetails]["firstName"] + " " + this.allUsers[userdetails]["lastName"]
          let tempId = this.allUsers[userdetails]["userId"]
          this.userAndIdArray.push([temp,tempId])
          // this.allusersArray.push(temp);
        }
        console.log(this.allusersArray)
        // console.log("All users")
        // console.log(this.allusersArray)
      },
      error => {
        console.log(error)
      }
    )

    
  }
  public createTicket():any {
    this.ticketReporter = this.getName(this.ticketReporterId)
    this.ticketAssignee = this.getName(this.ticketAssigneeId)
    console.log("Ticket getting created")
    console.log(Cookie.get("fileLocation"))
    let ticketData = {
      title:this.ticketTitle,
      description:this.ticketDescription,
      status:this.ticketStatus,
      reporter:this.ticketReporter,
      assignee:this.ticketAssignee,
      reporterId : this.ticketReporterId,
      assigneeId : this.ticketAssigneeId,
      attachment:Cookie.get("fileLocation")
    }
    
    console.log("New data of ticket")
    console.log(ticketData)

    this.ticketHttpService.createTicket(ticketData).subscribe(
      data => {
        console.log("Ticket created")
        this.toastr.success("Ticket created successfully")
        console.log(data)
        this.checkChangesInData(data)
        setTimeout(()=>{
         // this.router.navigate(["/dashboard"]); 
          
          this.router.navigate(["/ticket",data.ticketId]); 
          Cookie.delete('fileLocation')
        },1000);
      },
      error => {
        console.log("some error occured")
        console.log(error.errorMessage)
        alert("Some error occured")
      }
    )
  }
  public setAssigneeId(assigneeid):any{
    this.ticketAssigneeId = assigneeid;
  }
  public setReporterId(reporterid):any{
    this.ticketReporterId = reporterid;
  }
  public checkStatus = () => {
    if(Cookie.get('authToken') === undefined || Cookie.get('authToken') === '' || Cookie.get('authToken') === null ){
      this.router.navigate(["/"]);
      return false;
    }
    else {
      return true;
    }
  }

  public getName(Id):any{
    for(let user of this.userAndIdArray){
      console.log(user)
      if(user[1] === Id){
        return user[0]
      }
    }
  }


   public upload() {
    const file = this.selectedFiles.item(0);
    let data = this.uploadService.uploadFile(file);
    this.toastr.success("File uploaded successfully")
   
    }
    
   public  selectFile(event) {
    this.selectedFiles = event.target.files;
    }
     
  
  
    public checkChangesInData(oldData): any {
      console.log(oldData)
      let notification = "NEW Ticket ID" +  oldData["ticketId"] +  " is assigned to you" 
      let sendUsersArray = [...new Set( [oldData["reporterId"]].concat([oldData["assigneeId"]]))]
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

    public onChange( event: CKEditor4.EventInfo ) {
      // console.log( );
      this.ticketDescription = event.editor.getData() 
  }
  

  }
 


