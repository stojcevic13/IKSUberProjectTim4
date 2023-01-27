import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from '../../security/user.service';

@Component({
  selector: 'app-activation-page',
  templateUrl: './activation-page.component.html',
  styleUrls: ['./activation-page.component.css']
})
export class ActivationPageComponent {

  activationId:number=0;

  constructor(private userService:UserService, private router:Router,  private sharedService: SharedService,){

  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    alert("An error occurred: " + error.error.message);
  }
  

  submit(){
    this.userService.activatePassenger(this.activationId).subscribe({
      //this.roleEmitter.emit(user.role.toString());
      next: (response) => {
        this.sharedService.currentRole.next('PASSENGER');
        console.log(response);
        this.router.navigate(['passengerHome']);
      },
      error: (error) => {
        console.log(error);
        this.handleError(error);
      }
    }
    );

  }
}
