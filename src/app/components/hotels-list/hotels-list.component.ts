import { Hotel } from './../../shared/hotel';
import { Api2Service } from './../../shared/api2.service';
import { Api3Service } from './../../shared/api3.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator'
import {MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.css']
})
export class HotelsListComponent implements OnInit {
    HotelData: any = [];
    dataSource: MatTableDataSource<Hotel>;
    @ViewChild(MatPaginator,{ static: false }) paginator: MatPaginator;
    displayedColumns: string[] = ['name', 'style','deals', 'rooms', 'amenities', 'action'];

  
    constructor(private hotelApi: Api2Service,
      private hotelCategoryApi: Api3Service) {
      this.hotelApi.GetHotels().subscribe(data => {
        this.HotelData = data;
        this.dataSource = new MatTableDataSource<Hotel>(this.HotelData);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      })
     
    }
  
    ngOnInit() { 
      
    }

    DeleteHotel(index: number, e){
      if(window.confirm('Are you sure')) {
        const data = this.dataSource.data;
        data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
        this.dataSource.data = data;
        this.hotelApi.DeleteHotel(e._id).subscribe()
      }
    }
  
  }
  

