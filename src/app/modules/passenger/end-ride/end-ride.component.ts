import { ChangeDetectorRef, Component } from '@angular/core';
import { RideDTOResponse } from 'src/app/services/ride-service.service';

@Component({
  selector: 'app-end-ride',
  templateUrl: './end-ride.component.html',
  styleUrls: ['./end-ride.component.css']
})
export class EndRideComponent {
  show: boolean = false;
  ride: RideDTOResponse = <RideDTOResponse>{};

  constructor(private changeDetectorRef: ChangeDetectorRef){
  }
  
  setRide(ride: RideDTOResponse) {
    this.show = true;
    this.ride = ride
    this.changeDetectorRef.detectChanges();
  }

  close(){
    this.show = false;
  }
}
