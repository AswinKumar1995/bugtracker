import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NotificationComponent } from './notification/notification.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';





@NgModule({
  declarations: [DashboardViewComponent, NotificationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "dashboard", component: DashboardViewComponent },
      { path: "searchView", component: NotificationComponent }

    ]),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule, BrowserModule
  ]
})
export class DashboardModule { }
