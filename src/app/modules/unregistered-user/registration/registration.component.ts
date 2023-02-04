import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from '../../security/auth.service';
import { PassengerPost, UserService } from '../../security/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})


export class RegistrationComponent {
  name:string="";
  surname:string="";
  email:string="";
  password:string="";
  confirmPassword:string="";
  telephoneNumber:string="";
  address:string = "";
  activating:boolean=false;
  activationId!:number;
  constructor(private userService:UserService, private router: Router, private authService:AuthService, private sharedService:SharedService){

  }


  submit(){
    let passenger:PassengerPost = {
      name:this.name,
      surname:this.surname,
      email:this.email,
      password:this.password,
      telephoneNumber:this.telephoneNumber,
      address:this.address,
      confirmPassword: this.confirmPassword
    } 
  
    this.userService.postPassenger(passenger).subscribe({
      next: (response) => {
        //this.router.navigate(['activation']);
        this.activating = true;
      },
      error: (error) => {
        console.error(error);
        this.handleError(error);
      }
  });

  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    alert("An error occurred: " + error.error.message);
  }
  

  submitActivation(){
    this.userService.activatePassenger(this.activationId).subscribe({
      //this.roleEmitter.emit(user.role.toString());
      next: (response) => {
        this.sharedService.currentRole.next('PASSENGER');
        console.log(response);
        this.authService.login(this.email, this.password).subscribe();
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
