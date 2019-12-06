import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserModule } from './user/user.module';
import { TicketModule } from './ticket/ticket.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule } from '@angular/common/http';
import { TicketHttpService } from './ticket-http.service';
import { CommentHttpService } from './comment-http.service';
import {CKEditorModule} from 'ckeditor4-angular';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DashboardModule,
    UserModule,
    TicketModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path:'login',component:LoginComponent,pathMatch:'full'},
      {path:'',redirectTo:'login',pathMatch:'full'},
      {path:'*',component:LoginComponent},
      {path:'**',component:LoginComponent}
    ]),
    CKEditorModule
  ],
  providers: [TicketHttpService,CommentHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
