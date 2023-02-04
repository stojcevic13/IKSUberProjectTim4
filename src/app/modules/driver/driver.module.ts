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
import { ActiveButtonComponent } from './active-button/active-button.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DeclineReasonComponent } from './decline-reason/decline-reason.component';
import { FinishRideComponent } from './finish-ride/finish-ride.component';
import { DriverRideHistoryComponent } from './driver-ride-history/driver-ride-history.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RidePopupDriverComponent } from './ride-popup-driver/ride-popup-driver.component';
import { DriverReportsComponent } from './driver-reports/driver-reports.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SurveyPopupComponent } from './survey-popup/survey-popup.component';

@NgModule({
  declarations: [
    DriverHomePageComponent,
    DriverNextRidesComponent,
    DriverNavbarComponent,
    DriverProfileComponent,
    CarProfileComponent,
    DriverProfilePageComponent,
    ActiveButtonComponent,
    DeclineReasonComponent,
    FinishRideComponent,
    DriverRideHistoryComponent,
    RidePopupDriverComponent,
    DriverReportsComponent,
    SurveyPopupComponent
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
    FormsModule,
    MatSlideToggleModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule

 
  ],
  exports:[
    CarProfileComponent,
    DriverProfileComponent
  ]
})
export class DriverModule { }
