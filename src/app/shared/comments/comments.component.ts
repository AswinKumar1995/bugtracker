import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { CommentHttpService } from 'src/app/comment-http.service';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  public authToken: any;
  public userInfo: any;
  public receiverId: any;
  public receiverName: any;
  public ticketid: any;
  public currentComment = [];
  public commentData: any;
  public commentMessage: string;


  constructor(private commentHttpService: CommentHttpService, private appService: AppService,
    private _route: ActivatedRoute, private router: Router) {
    this.receiverId = Cookie.get('receiverId');
    this.receiverName = Cookie.get('receiverName');
  }

  ngOnInit() {
    this.ticketid = this._route.snapshot.paramMap.get("ticketId")
    this.authToken = Cookie.get('authToken');
    this.userInfo = this.appService.getUserInfoFromLocalStorage();
    console.log(this.userInfo)
    this.commentHttpService.getSingleTicketComments(this.ticketid).subscribe(
      data => {
        console.log(data);
        this.currentComment = data["data"]
      },
      error => {
        console.log("some error occured in data extraction")
        console.log(error.errorMessage)
      }
    )
  }

  //shared module

  // create comment method

  public createComment(): any {
    console.log("ticket id")
    console.log(this.ticketid)

    this.commentData = {
      comment: this.commentMessage,
      ticketId: this.ticketid,
      userId: this.receiverId,
      userName: this.receiverName
    }
    console.log(this.commentData)
    this.commentHttpService.createComment(this.commentData).subscribe(
      data => {
        console.log("Comment is stored")
        console.log(data)
        console.log(this.currentComment)
        if (this.currentComment === null) {
          this.currentComment = [data]
        }
        else {
          this.currentComment.push(data);
        }
        this.commentMessage = "";

      },
      error => {
        console.log("some error occured")
        console.log(error.errorMessage)

      }
    )

  }

}
