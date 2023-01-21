import { Component, OnInit } from '@angular/core';
import { DriverRequest, DriverRequestService } from 'src/app/services/driver-request.service';
import { Driver, DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-validate-changes',
  templateUrl: './validate-changes.component.html',
  styleUrls: ['./validate-changes.component.css']
})
export class ValidateChangesComponent implements OnInit {

  showReq:boolean = false;
  requests: DriverRequest[] = [];
  driver!:Driver;
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


  showRequest(){
    console.log("cao");
    this.showReq = true;
  }
  
}
