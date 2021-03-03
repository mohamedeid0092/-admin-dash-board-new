import { Restaurant } from './../../shared/restaurant';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator'
import {MatTableDataSource } from '@angular/material/table'
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.css']
})
export class RestaurantsListComponent implements OnInit {
   //restaurants:Restaurant[]=[];
  RestaurantData: any = [];
  dataSource: MatTableDataSource<Restaurant>;
  @ViewChild(MatPaginator,{ static: false }) paginator: MatPaginator;
  displayedColumns: string[] = [ 'name','price_range', 'image_path', 'restaurant_features', 'action'];

  constructor(private restaurantApi: ApiService) {
    this.restaurantApi. GetRestaurants().subscribe(data => {
      this.RestaurantData = data;
      this.dataSource = new MatTableDataSource<Restaurant>(this.RestaurantData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }

  DeleteRestaurant(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.restaurantApi.DeleteRestaurant(e._id).subscribe()
    }
  }

}
