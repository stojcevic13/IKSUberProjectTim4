import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DriverService } from 'src/app/services/driver.service';
import { RideServiceService } from 'src/app/services/ride-service.service';
import { Ride } from '../../passenger/passenger-ride-history/passenger-ride-history.component';
import { UserService } from '../../security/user.service';
import { RidePopupAdminComponent } from '../ride-popup-admin/ride-popup-admin.component';

@Component({
  selector: 'app-admin-ride-history',
  templateUrl: './admin-ride-history.component.html',
  styleUrls: ['./admin-ride-history.component.css']
})
export class AdminRideHistoryComponent {
  displayedColumns: string[] = ['endTime', "departure", 'destination', 'startTime', 'totalCost'];
  dataSource = new MatTableDataSource<Ride>;
  rides: Ride[] = [];
  popup:boolean = false;
  @ViewChild(MatPaginator) paginator!: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(RidePopupAdminComponent) ridePopupComponent:any;

  
changeDateFormat(date:number[]) : string{
  const d = new Date(date[0], date[1], date[2], date[3], date[4], date[5]);
  const res = d.toDateString();
  return res;
}

getTime(date:number[]): string{
  const d = new Date(date[0], date[1], date[2], date[3], date[4], date[5]);
  const res = d.toTimeString().split(" ")[0];
  return res;
}
constructor(
  private rideService:RideServiceService, private _liveAnnouncer:LiveAnnouncer,
) {}
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

ngOnInit(): void {

      this.rideService.getAllRides().subscribe({                   
      next: (res) => {
        this.rides= res;
        this.dataSource = new MatTableDataSource<Ride>(this.rides);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
 
      }});
}

announceSortChange(sortState: Sort) {
  if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }
}

showPopup(rideId:number){
  this.popup = true;
  this.ridePopupComponent.set(rideId);
}

}
