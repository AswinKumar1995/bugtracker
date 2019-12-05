import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketHttpService } from 'src/app/ticket-http.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  public allTickets = []
  statusFilter = new FormControl('')
  titleFilter = new FormControl('')
  reporterFilter = new FormControl('')
  createdFilter = new FormControl('')
  filterValues = {
    status: "",
    title: "",
    reporter: "",
    created: ""
  }

  constructor(private _route: ActivatedRoute, private router: Router, public ticketHttpService: TicketHttpService) { }



  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['status', 'title', 'reporter', "created", "actions"];
  searchKey: string;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.checkStatus()
    this.ticketHttpService.getAllTickets().subscribe(
      data => {
        console.log("Retrived data data")
        console.log(data["data"]);
        this.allTickets = data["data"]

        console.log("Extracted data")
        this.dataSource = new MatTableDataSource(this.allTickets);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        //this.dataSource.filterPredicate = this.createFilter();
        console.log(this.dataSource)
      },
      error => {
        console.log(error)
      })
  }

  logData(row) {
    console.log(row);
    console.log(row.ticketId)
    this.router.navigate(["/ticket", row.ticketId])

  }
  editData(row) {
    console.log(row);
    console.log(row.ticketId)
    this.router.navigate(["/edit", row.ticketId])

  }
  createTicket() {
    this.router.navigate(["/create"])
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.toString().trim().toLowerCase();
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




}
