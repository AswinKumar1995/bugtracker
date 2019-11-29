import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute,Router, RouterModule } from '@angular/router';
import { CommentsComponent } from './comments/comments.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentHttpService } from '../comment-http.service';
import { MaterialModule } from '../material/material.module';




@NgModule({
  declarations: [NavbarComponent, CommentsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forChild([
      {path:'comments',component:CommentsComponent,pathMatch:'full'}
    ]),
    MaterialModule
  ],
  exports:[
    NavbarComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    CommentsComponent,
    MaterialModule
  ]
})
export class SharedModule { }
