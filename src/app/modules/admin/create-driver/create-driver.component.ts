import { Component } from '@angular/core';
import { CarType } from '../../driver/car-profile/car-profile.component';

@Component({
  selector: 'app-create-driver',
  templateUrl: './create-driver.component.html',
  styleUrls: ['./create-driver.component.css']
})
export class CreateDriverComponent {
  carTypes: CarType[] = [
    {value: 'LUXURY', viewValue: 'LUXURY'},
    {value: 'STANDARD', viewValue: 'STANDARD'},
    {value: 'VAN', viewValue: 'VAN'},
  ];
}
