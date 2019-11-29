import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketHttpService } from 'src/app/ticket-http.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';



@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit {

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


    console.log("Inside ng on it")
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
        this.dataSource.filterPredicate = this.createFilter();
        console.log(this.dataSource)
      },
      error => {
        console.log(error)
      })


    // adding filters


    this.statusFilter.valueChanges
      .subscribe(
        status => {
          console.log(status)
          this.filterValues.status = status;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.titleFilter.valueChanges
      .subscribe(
        title => {
          this.filterValues.title = title;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.reporterFilter.valueChanges
      .subscribe(
        reporter => {
          this.filterValues.reporter = reporter;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.createdFilter.valueChanges
      .subscribe(
        created => {
          this.filterValues.created = created;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )


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

  searchview() {
    this.router.navigate(["/searchView"])
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  public checkStatus = () => {
    console.log("checking auth token")
    console.log(Cookie.get("authToken"))
    if (Cookie.get('authToken') === undefined || Cookie.get('authToken') === '' || Cookie.get('authToken') === null) {
      this.router.navigate(["/"]);
      return false;
    }
    else {
      return true;
    }
  }


  public createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.status.toLowerCase().indexOf(searchTerms.status) !== -1
        && data.reporter.toString().toLowerCase().indexOf(searchTerms.reporter) !== -1
        && data.title.toLowerCase().indexOf(searchTerms.title) !== -1
        && data.created.toLowerCase().indexOf(searchTerms.created) !== -1;
    }
    return filterFunction;
  }




}
