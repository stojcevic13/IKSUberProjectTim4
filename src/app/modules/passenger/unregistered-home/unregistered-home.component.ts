import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LatLngTuple } from 'leaflet';
import { RegFormComponent } from 'src/app/components/reg-form/reg-form.component';
import { UnregFormComponent } from 'src/app/components/unreg-form/unreg-form.component';
import { MapComponent } from '../../map/map/map.component';

@Component({
  selector: 'app-unregistered-home',
  templateUrl: './unregistered-home.component.html',
  styleUrls: ['./unregistered-home.component.css']
})
export class UnregisteredHomeComponent {

  @ViewChild(MapComponent) mapComponent: any;
  @ViewChild(UnregFormComponent) unregFormComponent:any;
  departure: string = "";
  destination: string = "";


  pinToGetLocation(location:Array<string>){
    this.unregFormComponent.setStartAndEndLocation(location);
  }

  setLengthRoute(kilometers:string){
    this.unregFormComponent.setLengthRoute(kilometers);
  }

  setTimeRoute(time:string){
    this.unregFormComponent.setTimeRoute(time);
  }

  update(locations: Array<string>) {
    this.departure = locations[0];
    this.destination = locations[1];
    this.mapComponent.markDeparture(this.departure);
    this.mapComponent.markDestination(this.destination);
    this.mapComponent.route(this.departure, this.destination);
    
  }


}
