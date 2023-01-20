import { AfterViewInit, Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Driver } from 'src/app/services/driver.service';
import { Passenger } from 'src/app/services/passenger.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { RideServiceService } from 'src/app/services/ride-service.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { RidePopupComponent } from '../ride-popup/ride-popup.component';
@Component({
  selector: 'app-passenger-ride-history',
  templateUrl: './passenger-ride-history.component.html',
  styleUrls: ['./passenger-ride-history.component.css']
})
export class PassengerRideHistoryComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['endTime', "departure", 'destination', 'startTime', 'totalCost'];
  dataSource = new MatTableDataSource<Ride>;
  rides: Ride[] = [];
  
  @ViewChild(MatPaginator) paginator!: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(RidePopupComponent) ridePopupComponent:any; 
  sharedService: any;
  popup:boolean = false;
  
 

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
    private rideService:RideServiceService, private _liveAnnouncer:LiveAnnouncer
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  

  ngOnInit(): void {
    this.rideService.getAll(2).subscribe({                      // ovdje ces vjerovatno proslijedjvati id iz tokena
      next: (res) => {
        this.rides= res;
        this.dataSource = new MatTableDataSource<Ride>(this.rides);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
         this.sharedService.openSnack('Oops, something went wrong! No data available!');
      },
    });
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
    //this.ridePopupComponent.setUpRide(rideId);
    
  }

}

export enum RideStatus{
  PENDING, 
  ACCEPTED,
  CANCELED,
  ACTIVE,
  FINISHED, 
  REJECTED
}
export enum VehicleName{
  STANDARD, 
  LUXURY,
  VAN
}
export interface Location{
  address:String,
  latitude:number,
  longitude:number
}
export interface Route{
  departure:Location,
  destination:Location

}

export interface Review{
  id:number,
  rating:number,
  comment:string;
  passenger: Passenger
}
export interface Ride{
  id:number,
  startTime:Date,
  endTime:Date,
  totalCost:number,
  driver:Driver,
  estimatedTimeInMinutes:number,
  status:RideStatus,
  babyTransport:boolean,
  petTransport:boolean,
  vehicleType: VehicleName,
  passengers: Passenger[],
  locations: Route[],
  departure: string,
  destination: string,
  reviews:Review[]

}

