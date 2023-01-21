import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/security/auth.service';
import { Role, UserService } from '../../security/user.service';
import { EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
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
    private sharedService: SharedService
  ) {
  }

  email: string = "";       
  password: string = "";

  login() {
    console.log(this.email, this.password);
    
    this.authService.login(this.email, this.password).subscribe(()=>(
      this.userService.getUser().subscribe((user) =>{
        this.sharedService.currentRole.next(user.role.toString());
        this.roleEmitter.emit(user.role.toString());
        if(user.role.toString() == "DRIVER"){
          this.router.navigate(['driverHome/' + user.user.id]);
        }else if(user.role.toString() == "PASSENGER"){
         this.router.navigate(['passengerHome/' + user.user.id]);
        }else if(user.role.toString() == "ADMIN"){
          this.router.navigate(['adminHome']);
        }
      }) 
    ));
    

    
    
    
    

    

  }
}
