import { Component,EventEmitter, ViewChild, OnInit } from '@angular/core';
import { User } from './../../shared/user';
import { ApiUserService } from './../../shared/api-user.service';
import { MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource } from '@angular/material/table';
import {DatePipe} from '@angular/common';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit{
  UserData: any = [];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator,{ static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['FirstName', 'LastName', 'Username','Joining_date','Phone_Number', 'Home_Airport','Email', 'action'];
   
   @ViewChild(MatSort,{ static: false }) sort: MatSort;

/*    myControl = new FormControl();
  options: string[] = ['test', 'waaa', 'd'];
  filteredOptions: Observable<string[]>; */
  
  constructor(private userApi: ApiUserService,
    public datepipe:DatePipe,) {
    this.userApi.GetUsers().subscribe(data => {
      this.UserData = data;
      this.dataSource = new MatTableDataSource<User>(this.UserData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
      }, 0);
    })
  }

  ngOnInit() { 
  /*    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      ); */
  }

  DeleteUser(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.userApi.DeleteUser(e._id).subscribe()
    }
  }

/*   private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
 */
 public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
