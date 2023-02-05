import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/security/auth.service';
import { Role, UserService } from '../../security/user.service';
import { EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { WorkingHoursDTO, WorkingHoursService } from '../../security/working-hours.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  roleEmitter = new EventEmitter<string>();
  constructor (
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private sharedService: SharedService,
  ) {
  }

  email: string = "";       
  password: string = "";


  handleError(error: HttpErrorResponse) {
    console.log(error);
    alert("An error occurred: " + error.error.message);
  }

  sendEmail(){
    if(this.email==''){
      alert("You need to enter your email!")
    }else{
      this.userService.getUserByEmail(this.email).subscribe(
        (user) => {
          this.userService.sendEmailToReset(user.id).subscribe(
            () => {
              alert('We successfully sent you an email. Please check your mail to reset password! ');
            },
            (error) => {
              console.error(error);
              this.handleError(error);
            }
          );
        },
        (error) => {
          console.error(error);
          this.handleError(error);
        }
      );
   // this.router.navigate(['/login/reset']);
    }
  }

  login() {
    console.log(this.email, this.password);
    this.authService.login(this.email, this.password).subscribe(()=>(
      this.userService.getUser().subscribe((user) =>{
        console.log(user.role.toString());
        this.sharedService.currentRole.next(user.role.toString());
        this.roleEmitter.emit(user.role.toString());
        if(user.role == "DRIVER"){
          this.router.navigate(['driverHome']);
        }else if(user.role == "PASSENGER"){
         this.router.navigate(['passengerHome']);
        }else if(user.role == "ADMIN"){
          this.router.navigate(['adminHome']);
        }



      }) 
    ),
    (error) => {
      this.handleError(error);
    }
    );  

  }
}
