import { Component, OnInit, ViewChild } from '@angular/core';
import {DataService} from '../services/data.service';
import {MatDialog } from '@angular/material/dialog';
import {User} from '../models/user';
import {DataSource} from '@angular/cdk/collections';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AddDialogComponent} from '../dialogs/add/add.dialog.component';
import {EditDialogComponent} from '../dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from '../dialogs/delete/delete.dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  displayedColumns = ['firstName', 'lastName', 'email', 'city', 'dept', 'actions'];
  dataSource = new MatTableDataSource<User>();
  actualDataSource= new MatTableDataSource<User>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    if (!this.dataSource.sort) {
        this.dataSource.sort = sort;
    }
}
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public searchForm: FormGroup;
  public firstName = '';
  public email = '';
  public lastName = '';

  constructor(
        public dialog: MatDialog,
        public dataService: DataService
        ) {}

  ngOnInit() {
    this.loadData();
    
  }

  searchFormInit() {
    this.searchForm = new FormGroup({
      firstName: new FormControl(''),
      email: new FormControl(''),
      lastName: new FormControl('')
    });
  }

  /* this method well be called for each row in table  */
  getFilterPredicate() {
    return (row: User, filters: string) => {
      // split string per '$' to array
      const filterArray = filters.split('$');
      const firstName = filterArray[0]
      const email = filterArray[2];
      const lastName = filterArray[1];

      const matchFilter = [];

      const columnFirstName = row.firstName;
      const columnUserName = row.email;
      const columnLastName = row.lastName;

      const customFilterFN = columnFirstName.toLowerCase().includes(firstName);
      const customFilterUN = columnUserName.toLowerCase().includes(email);
      const customFilterLN = columnLastName.toLowerCase().includes(lastName.trim());

      matchFilter.push(customFilterFN);
      matchFilter.push(customFilterUN);
      matchFilter.push(customFilterLN);

      return matchFilter.every(Boolean);
    };
  }

  applyFilter() {
    const fn = this.searchForm.get('firstName').value;
    const un = this.searchForm.get('email').value;
    const ln = this.searchForm.get('lastName').value;

    this.firstName = fn === null ? '' : fn;
    this.email = un === null ? '' : un;
    this.lastName = ln === null ? '' : ln;

    // create string of our searching values and split if by '$'
    const filterValue = this.firstName + '$' + this.lastName + ' $' + this.email;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  

  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
         this.loadData();
      }
    });
  }

  startEdit(row, i) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {
              id: row.id,
              firstName: row.firstName,
              lastName: row.lastName,
              email: row.email,
              city: row.city,
              dept: row.dept
           }
    });

    dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
       this.loadData();

      }
   });
  }

  deleteItem(i: number, row: User) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
    data: {
                  id: row.id,
                  firstName: row.firstName,
                  lastName: row.lastName,
                  email: row.email,
                  city: row.city,
                  dept: row.dept
               }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataService.deleteUser(row.id).subscribe(response => {
                this.loadData();

        })
    }
    })
  }

  public loadData() {
    this.dataService.getAllUsers().subscribe(response => {
    this.dataSource = new MatTableDataSource(response);
    this.actualDataSource = this.dataSource;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.searchFormInit();
      this.dataSource.filterPredicate = this.getFilterPredicate();
    });
}

}
