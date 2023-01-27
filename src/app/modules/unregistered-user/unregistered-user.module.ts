import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapModule } from '../map/map/map.module';
import { UnregisteredHomeComponent } from './unregistered-home/unregistered-home.component';
import { UnregFormComponent } from './unreg-form/unreg-form.component';
import { UnregInfoComponent } from './unreg-info/unreg-info.component';
import { UnregNavbarComponent } from './unreg-navbar/unreg-navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import {MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import{MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from "@angular/flex-layout";
import { UserModule } from '../user/user.module';
import { ActivationPageComponent } from './activation-page/activation-page.component';

@NgModule({
  declarations: [
    UnregisteredHomeComponent,
    UnregFormComponent,
    UnregInfoComponent,
    UnregNavbarComponent,
    LoginComponent,
    RegistrationComponent,
    ActivationPageComponent
  ],
  imports: [
    CommonModule,
    MapModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    MatOptionModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    UserModule
    
  ],
  providers: [
  ],
  exports:[]

})
export class UnregisteredUserModule { }
