import { Component } from '@angular/core';

interface CarType {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'car-profile',
  templateUrl: './car-profile.component.html',
  styleUrls: ['./car-profile.component.css']
})

export class CarProfileComponent {
  carTypes: CarType[] = [
    {value: 'luxury-0', viewValue: 'Lukury'},
    {value: 'standard-1', viewValue: 'Standard'},
    {value: 'van-2', viewValue: 'Van'},
  ];

}
