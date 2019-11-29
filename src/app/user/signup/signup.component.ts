import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName:any;
  public lastName:any;
  public mobile:any;
  public email:any;
  public password:any;
  constructor(
    public appService : AppService,
    public router : Router,
    public toastr:ToastrService,
    vcr:ViewContainerRef
  ) { }

  ngOnInit() {

  }
  public goToSignIn:any = () => {
    this.router.navigate(["/"]);
  }
  public signupFunction:any = () => {
    if (!this.firstName) {
      this.toastr.warning("Please enter first name");
    }
    else if (!this.lastName) {
      this.toastr.warning("Please enter last name");
    }
    else if (!this.mobile) {
      this.toastr.warning("Please enter mobile number");
    }
    else if (!this.email) {
      this.toastr.warning("Please enter email");
    }
    else if (!this.password) {
      this.toastr.warning("Please enter password");
    }
    else {

      let data = {
        firstName:this.firstName,
        lastName:this.lastName,
        mobile:this.mobile,
        email:this.email,
        password:this.password
      }
      console.log(data)
      this.appService.signUpFunction(data).subscribe((apiResponse) => {
        console.log(apiResponse);
        if(apiResponse.status == 200){
          this.toastr.success("SignUp Successful");
          setTimeout(() => {
            this.goToSignIn();
          },2000)
        }
        else{
          this.toastr.error(apiResponse.message);
        }
  
        
      },(err) => {
        console.log(err)
        this.toastr.error(err);
      }); //end service call

    }
  }
}
