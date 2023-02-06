import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordDTO, UserService } from '../../security/user.service';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent implements OnInit{
 

  constructor(private userService:UserService, private route:ActivatedRoute, private router:Router){}
  password:string='';
  code!:string|undefined;
  userId!:string|undefined;

  
  handleError(error: HttpErrorResponse) {
    console.log(error);
    alert("An error occurred: " + error.error.message);
  }
  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      if(params.get('code')){
        console.log(params.get('code')?.split('/')[2].split("=")[2]);
        this.code = params.get('code')?.split('/')[0];
        this.userId = params.get('code')?.split('/')[2].split("=")[1];
      }
    });
  }
  confirm(){
      const passwordDTO = {
        code:this.code,
        newPassword:this.password
      }
      if(this.password!=""){
      this.userService.resetPassword(this.userId, passwordDTO).subscribe(
        res => {
          console.log(res);
          alert('Password reset successfull. Now you can login with new password');
          this.router.navigate(['/login']);
        },
        error => {
          console.error(error);
          this.handleError(error);
        }
      );
      }else{
        alert("You have to enter new password!");
      }
  }
}
