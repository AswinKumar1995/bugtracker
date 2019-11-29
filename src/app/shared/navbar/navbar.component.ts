import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NotificationsHttpService } from 'src/app/notifications-http.service';







@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private AppService:AppService,private toastr:ToastrService,
    private router:Router,private notificationHttpService:NotificationsHttpService) {

   }

  public matBadge :any;
  public allNotifications : []
  public userId : String;
  

  ngOnInit() {
    
    this.userId = Cookie.get("receiverId")
    console.log("new user Id ")
    console.log(this.userId)
    this.notificationHttpService.getUnseenNotifications(this.userId).subscribe(
      data => {
        console.log("Notifications")
        console.log(data)
        this.allNotifications = data["data"];
        if(this.allNotifications != null){
          this.matBadge=this.allNotifications.length
        }
      },
      error => {
        console.log(error)
      }
    )
  }


  public logout:any = () => {
    this.AppService.logout().subscribe((apiResponse) => {
      if(apiResponse.status == 200){
        console.log("logout called");
        Cookie.delete('authToken');
        Cookie.delete('receiverId');
        Cookie.delete('receiverName');
        this.router.navigate(["/"]);
      }
      else {
        this.toastr.error(apiResponse.message);
      }
  
    },(err) => {
      this.toastr.error("Some error occured");
    })
  }

  public changeBadge():any{
    this.matBadge = 0 ;
    this.notificationHttpService.setNotificationSeen(this.userId).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }

}
