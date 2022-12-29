import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverHomePageComponent } from './driver-home-page/driver-home-page.component';
import { MapModule } from '../map/map/map.module';
import { DriverNextRidesComponent } from './driver-next-rides/driver-next-rides.component';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatToolbarModule} from '@angular/material/toolbar';
import { DriverNavbarComponent } from './driver-navbar/driver-navbar.component';
import { DriverProfileComponent } from './driver-profile/driver-profile.component';
import { CarProfileComponent } from './car-profile/car-profile.component';
import { UserModule } from '../user/user.module';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DriverProfilePageComponent } from './driver-profile-page/driver-profile-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DriverHomePageComponent,
    DriverNextRidesComponent,
    DriverNavbarComponent,
    DriverProfileComponent,
    CarProfileComponent,
    DriverProfilePageComponent
  ],
  imports: [
    CommonModule,
    MapModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    FlexLayoutModule,
    UserModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
 
  ]
})
export class DriverModule { }
