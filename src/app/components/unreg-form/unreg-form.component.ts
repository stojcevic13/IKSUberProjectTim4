import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-unreg-form',
  templateUrl: './unreg-form.component.html',
  styleUrls: ['./unreg-form.component.css']
})
export class UnregFormComponent {

  estimateShow: boolean = false;        
  departure: string = "";       
  destination: string = "";
  @Output() emitter: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

  notify() {
    console.log([this.departure, this.destination]);
    this.emitter.emit([this.departure, this.destination]);
  }

  showEstimate(){
    this.estimateShow = true;
  }
}
