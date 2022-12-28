import {AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LatLngTuple } from 'leaflet';
import { UnregFormComponent } from '../unreg-form/unreg-form.component';
import { Vehicle, VehicleService } from 'src/app/services/vehicle.service';
import { MapComponent } from '../../map/map/map.component';


@Component({
  selector: 'app-unregistered-home',
  templateUrl: './unregistered-home.component.html',
  styleUrls: ['./unregistered-home.component.css']
})
export class UnregisteredHomeComponent implements OnInit{

  @ViewChild(MapComponent) mapComponent: any;
  @ViewChild(UnregFormComponent) unregFormComponent:any;
  vehicles: Vehicle[] = [];
  departure: string = "";
  destination: string = "";

  constructor(private vehicleService:VehicleService){}
  ngOnInit(): void {
    this.vehicleService.getAll().subscribe((result) => {
      this.vehicles = result;
      let v:Vehicle;
      for(v of this.vehicles){
        if(v.available){
        this.mapComponent.markAvailableCar(v.currentLocation.address);
        }else{
          this.mapComponent.markUnavailableCar(v.currentLocation.address);
        } 
    
      }
    });

  }

  

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
