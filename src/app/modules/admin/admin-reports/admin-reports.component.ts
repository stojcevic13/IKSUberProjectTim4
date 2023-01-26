import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Chart from 'chart.js/auto';
import { RideServiceService } from 'src/app/services/ride-service.service';
import { Ride } from '../../passenger/passenger-ride-history/passenger-ride-history.component';
import { Role, UserService } from '../../security/user.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent {
  show:boolean = false;
  chart!:Chart; 
  startDate!: Date;
  endDate!: Date; 
  form!: FormGroup;
  rides: Ride[] = [];
  userId:number = 0;
  @ViewChild('start') start!: ElementRef;
  @ViewChild('end') end!: ElementRef;
  @ViewChild('averageRidesPerDay') averageRidesPerDay!: ElementRef;
  @ViewChild('sumRidesPerDay') sumRidesPerDay!: ElementRef;
  @ViewChild('averageEarningsPerDay') averageEarningsPerDay!: ElementRef;
  @ViewChild('sumEarningsPerDay') sumEarningsPerDay!: ElementRef;
  @ViewChild('averageKilometersPerDay') averageKilometersPerDay!: ElementRef;
  @ViewChild('sumKilometersPerDay') sumKilometersPerDay!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  constructor(private fb: FormBuilder, private rideService:RideServiceService, private userService:UserService){

  }
  handleError(error: HttpErrorResponse) {
    console.log(error);
    alert("An error occurred: " + error.error.message);
  }
  onSubmit(){
    this.show=true;
    this.userService.getUserByEmail(this.email.nativeElement.value).subscribe((user)=> this.getRides(user.id, user.role),
      (error) => {
        this.handleError(error);
      }
    )
  }

  getRides(userId:number, role:Role){
    this.show = true;
    let numOfSeconds =  this.form.value.daterange.end.valueOf() - this.form.value.daterange.start.valueOf();
    let numOfDays = Math.ceil(numOfSeconds / (1000 * 3600 * 24)); 
    const startDate = this.getCorrectFormat(this.start.nativeElement.value);
    const endDate = this.getCorrectFormat(this.end.nativeElement.value);
    let ridesByDate: { [key: string]: number } = {};                        // cuva broj voznji po danu
    let earnByDate: { [key: string]: number } = {};                        // cuva zaradu po danu
    let kilometersByDate: { [key: string]: number } = {};                   // cuva kilometre po danu
    let sumRides = 0;
    let sumCost = 0;
    let sumKilometers = 0;
    this.rideService.getAllRidesByDateAndRole(startDate, endDate, userId, role).subscribe(({
      next: (rides) => {
          this.rides= rides;
          sumRides = this.rides.length;
          this.rides.forEach(ride => {
              sumCost+=ride.totalCost;
              //sumKilometers+=;
              const splitted = ride.startTime.toString().split(",");
              const d = new Date(Number(splitted[0]), Number(splitted[1]) - 1, Number(splitted[2])).toISOString();
              let date = d.split("T")[0];
              if(ridesByDate[date]){
                  ridesByDate[date]++;
              }else{
                  ridesByDate[date] = 1;    
              }
              if(earnByDate[date]){
                  earnByDate[date] += ride.totalCost;
              }else{
                  earnByDate[date] = ride.totalCost;
              }
              if(kilometersByDate[date]){
                  kilometersByDate[date] += 1;                                                    // IZMJENA
              }else{
                  kilometersByDate[date] = 1;
              }
              }
            );
            var averageRides= sumRides/numOfDays;
            var averageEarnings = sumCost/numOfDays;
            //var averageKilometers = sumKilometers/numOfDays;
            
         this.createFirstGraph(ridesByDate,earnByDate, averageEarnings, averageRides); 
        
      }}
  )
    );
  }



createFirstGraph(ridesByDate:Object, earnByDate:Object, average:number, sum:number){
 // this.averageRidesPerDay.nativeElement.value = average.toFixed(2);
  //this.sumRidesPerDay.nativeElement.value = sum;
  if (this.chart) {
      this.chart.destroy();
  }
  this.chart = new Chart('ridesPerDay', {
      type: 'line',
      data: {
          labels:  Object.keys(ridesByDate),
          datasets: [{
             label: 'Number of Rides Per Day',
          data: Object.values(ridesByDate),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 149, 128, 1)',
          borderWidth: 3
          },
          {
            label: 'Earnings Per Day',
         data: Object.values(earnByDate),
         backgroundColor: 'rgba(255, 99, 132, 0.2)',
         borderColor: 'rgba(255, 170, 0, 1)',
         borderWidth: 3
         }
      ]
     },
     options: {
         scales: {
          y: {
              type: 'linear',
              beginAtZero: true
            }
         },
     }
  });

}



getCorrectFormat(date:string) : string{
  const splitted = date.split("/");
  const year = splitted[2];
  var month;
  var day;
  if(splitted[0].length == 1){
      month = "0" +  splitted[0];
  }else{
      month = splitted[0];
  }
  if(splitted[1].length == 1){
      day = "0" + splitted[1];
  }else{
      day = splitted[1];
  }
  const dFormat = year + '-' + month + "-" + day;
  return dFormat;
}

  ngOnInit():void {
    this.form = this.fb.group({
        daterange:new FormGroup({
            start: new FormControl(),
            end: new FormControl()
         })
    });
}
}
