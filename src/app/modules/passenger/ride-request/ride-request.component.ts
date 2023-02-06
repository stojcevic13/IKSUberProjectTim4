import { ChangeDetectorRef, Component } from '@angular/core';
import { RideDTOResponse } from 'src/app/services/ride-service.service';

@Component({
  selector: 'app-ride-request',
  templateUrl: './ride-request.component.html',
  styleUrls: ['./ride-request.component.css']
})
export class RideRequestComponent {
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
