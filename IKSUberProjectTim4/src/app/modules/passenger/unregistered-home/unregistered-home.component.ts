import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapComponent } from '../../map/map/map.component';

@Component({
  selector: 'app-unregistered-home',
  templateUrl: './unregistered-home.component.html',
  styleUrls: ['./unregistered-home.component.css']
})
export class UnregisteredHomeComponent {

  @ViewChild(MapComponent) mapComponent: any;

  departure: string = "";
  destination: string = "";

  update(locations: Array<string>) {
    this.departure = locations[0];
    this.destination = locations[1];
    this.mapComponent.markDeparture(this.departure);
    this.mapComponent.markDestination(this.destination);

  }


}
