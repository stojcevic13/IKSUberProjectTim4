import { Component } from '@angular/core';

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
  rides: ride[] = [
    {id: 1, startPoint: "NEDOVICA 26", endPoint: "VILDOZE 1"},
    {id: 2, startPoint: "NEDOVICA 26", endPoint: "VILDOZE 1"},
    {id: 3, startPoint: "NEDOVICA 26", endPoint: "VILDOZE 1"},
    {id: 4, startPoint: "NEDOVICA 26", endPoint: "VILDOZE 1"}
  ]
}
