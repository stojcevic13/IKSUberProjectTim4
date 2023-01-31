import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InviteFriendComponent} from './invite-friend/invite-friend.component';
import { RegFormComponent } from './reg-form/reg-form.component';
import { PassengerHomeComponent } from './passenger-home/passenger-home.component';
import { PassengerRideHistoryComponent } from './passenger-ride-history/passenger-ride-history.component';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../security/token.service';
import { AuthService } from '../security/auth.service';
import { UserService } from '../security/user.service';
import { AppComponent } from 'src/app/app.component';
import { MapModule } from '../map/map/map.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatInputModule} from '@angular/material/input';
import { RideRequestComponent } from './ride-request/ride-request.component';
import { EndRideComponent } from './end-ride/end-ride.component';
import { UserModule } from '../user/user.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RidePopupComponent } from './ride-popup/ride-popup.component';
import { MatListModule } from '@angular/material/list';
import { RemarkComponent } from './remark/remark.component';
import { PassengerReportsComponent } from './passenger-reports/passenger-reports.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    InviteFriendComponent,
    RegFormComponent,
    PassengerHomeComponent,
    PassengerRideHistoryComponent,
    RideRequestComponent,
    EndRideComponent,
    RidePopupComponent,
    RemarkComponent,
    PassengerReportsComponent

  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatChipsModule,
    MapModule,
    MatInputModule,
    FlexLayoutModule,
    UserModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent],
  exports:[PassengerHomeComponent, RidePopupComponent]
})
export class PassengerModule { }
