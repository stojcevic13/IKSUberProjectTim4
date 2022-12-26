import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UnregInfoComponent } from '../unreg-info/unreg-info.component';

@Component({
  selector: 'app-unreg-form',
  templateUrl: './unreg-form.component.html',
  styleUrls: ['./unreg-form.component.css']
})
export class UnregFormComponent {

  estimateShow: boolean = false;        
  departure: string = "";       
  destination: string = "";
  startLocationChosen:boolean = false;
  @ViewChild(UnregInfoComponent) unregInfoComponent: any; 
  @Output() emitter: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

  notify() {
    console.log([this.departure, this.destination]);
    this.emitter.emit([this.departure, this.destination]);
  }
  showEstimate(){
    this.estimateShow = true;
  }

  setChosenStartLocation(){
    this.startLocationChosen = true;
  }

  setUnchosenStartLocation(){
    this.startLocationChosen = false;
  }

  setLengthRoute(length:string){
    this.unregInfoComponent.setKilometersLength(length);
  }

  setTimeRoute(time:string){
    this.unregInfoComponent.setTimeLength(time);
  }


  setStartAndEndLocation(startLocation:string){
    if(!this.startLocationChosen){
      this.departure=startLocation;
    }else{
      this.destination =  startLocation;
    }
  }
}
