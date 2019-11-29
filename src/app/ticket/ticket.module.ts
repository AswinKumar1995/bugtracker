import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketViewComponent } from './ticket-view/ticket-view.component';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';
import { RouterModule,Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [TicketViewComponent, TicketCreateComponent, TicketEditComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:"ticket/:ticketId",component:TicketViewComponent},
      {path:"create",component:TicketCreateComponent},
      {path:"edit/:ticketId",component:TicketEditComponent}
    ]),
    MaterialModule,
    SharedModule
  ]
})
export class TicketModule { }
