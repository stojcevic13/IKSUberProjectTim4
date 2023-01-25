import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms'
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-annotation'
import { RideServiceService } from 'src/app/services/ride-service.service';
import { Ride } from '../../passenger/passenger-ride-history/passenger-ride-history.component';
@Component({
  selector: 'app-driver-reports',
  templateUrl: './driver-reports.component.html',
  styleUrls: ['./driver-reports.component.css']
})
export class DriverReportsComponent implements OnInit{
    show:boolean = false;
    chart!:Chart; 
    startDate!: Date;
    endDate!: Date; 
    form!: FormGroup;
    rides: Ride[] = [];
    @ViewChild('start') start!: ElementRef;
    @ViewChild('end') end!: ElementRef;
    @ViewChild('averageRidesPerDay') averageRidesPerDay!: ElementRef;
    @ViewChild('sumRidesPerDay') sumRidesPerDay!: ElementRef;
    constructor(private fb: FormBuilder, private rideService:RideServiceService){

    }
    onSubmit(){ 
        this.show = true;
        console.log(this.form.value);
        let numOfSeconds =  this.form.value.daterange.end.valueOf() - this.form.value.daterange.start.valueOf();
        let numOfDays = Math.ceil(numOfSeconds / (1000 * 3600 * 24)); 
        const startDate = this.getCorrectFormat(this.start.nativeElement.value);
        const endDate = this.getCorrectFormat(this.end.nativeElement.value);
        let ridesByDate: { [key: string]: number } = {};
        let sum = 0;
        this.rideService.getDriverRidesByDate(startDate, endDate, 6).subscribe(({
            next: (rides) => {
                this.rides= rides;
                sum = this.rides.length;
                this.rides.forEach(ride => {
                    const splitted = ride.startTime.toString().split(",");
                    const d = new Date(Number(splitted[0]), Number(splitted[1]) - 1, Number(splitted[2])).toISOString();
                    let date = d.split("T")[0];
                    if(ridesByDate[date]){
                        ridesByDate[date]++;
                    }else{
                        ridesByDate[date] = 1;    
                    }
                    }
                  );

                  var average = sum/numOfDays;
                
               this.createGraph(ridesByDate, average, sum); 
            }}
        )
          );
        
        console.log(ridesByDate);    
    }

    createGraph(ridesByDate:any, average:number, sum:number){
        this.averageRidesPerDay.nativeElement.value = average.toFixed(2);
        this.sumRidesPerDay.nativeElement.value = sum;
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
