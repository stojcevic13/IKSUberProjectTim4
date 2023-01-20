import { Component, EventEmitter, Output } from '@angular/core';

export interface ride {
  id: number,
  startPoint: string,
  endPoint: string
}

@Component({
  selector: 'driver-next-rides',
  templateUrl: './driver-next-rides.component.html',
  styleUrls: ['./driver-next-rides.component.css']
})
export class DriverNextRidesComponent {
  decline:boolean = false;
  @Output() emitter: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  rides: ride[] = [
    {id: 1, startPoint: "NEMANJE NEDOVICA 26", endPoint: "LUKE VILDOZE 1"},
    {id: 2, startPoint: "NEMANJE NEDOVICA 26", endPoint: "LUKE VILDOZE 1"},
    {id: 3, startPoint: "NEMANJE NEDOVICA 26", endPoint: "LUKE VILDOZE 1"},
    {id: 4, startPoint: "NEMANJE NEDOVICA 26", endPoint: "LUKE VILDOZE 1"}
  ]


  cancelClick(){
    this.decline = true;
    this.emitter.emit(this.decline);
  }
}
