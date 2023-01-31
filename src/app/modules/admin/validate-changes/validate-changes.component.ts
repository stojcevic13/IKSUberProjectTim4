import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DriverRequest, DriverRequestService } from 'src/app/services/driver-request.service';
import { Driver, DriverService } from 'src/app/services/driver.service';
import { ChangesComponent } from '../changes/changes.component';

@Component({
  selector: 'app-validate-changes',
  templateUrl: './validate-changes.component.html',
  styleUrls: ['./validate-changes.component.css']
})
export class ValidateChangesComponent implements OnInit {

  requests: DriverRequest[] = [];
  driver!:Driver;
  @ViewChild(ChangesComponent) changesComponent:any; 
  constructor(private driverRequestService:DriverRequestService, private driverService:DriverService){

  }


  ngOnInit(): void {
    this.driverRequestService.getAll().subscribe({
      next:(res) =>{
          this.requests = res.results;
     //     this.driverService.getDriver(res.results).subscribe((driver)=> (this.driver = driver)),
      }
    })
  }


  getDriver(id:number){
    this.driverService.getDriver(id).subscribe((driver)=> (this.driver = driver));
  }


  showRequest(request:DriverRequest){
    this.changesComponent.show=true;
    this.changesComponent.setDriverRequest(request);
    }
  


  deleteRequest(request:DriverRequest){
    this.driverRequestService.deleteDriverRequest(request).subscribe();
    this.requests = this.requests.filter(req => req !== request);
  }
  
}
