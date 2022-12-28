import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/security/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (
    private router: Router,
    private authService: AuthService
  ) {
  }

  email: string = "";       
  password: string = "";

  login() {
    console.log(this.email, this.password)
    this.authService.login(this.email, this.password).subscribe(console.log);
  }
}
