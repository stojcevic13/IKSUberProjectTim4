import { Component } from '@angular/core';
import {FormBuilder} from '@angular/forms'
interface CarType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css']
})

export class RegFormComponent {

  carTypes: CarType[] = [
    {value: 'luxury-0', viewValue: 'Lukury'},
    {value: 'standard-1', viewValue: 'Standard'},
    {value: 'van-2', viewValue: 'Van'},
  ];



}
