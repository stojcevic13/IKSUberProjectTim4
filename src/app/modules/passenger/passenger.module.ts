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
import{MatInputModule} from '@angular/material/input';
import { RideRequestComponent } from './ride-request/ride-request.component';
import { EndRideComponent } from './end-ride/end-ride.component';
import { UserModule } from '../user/user.module';
@NgModule({
  declarations: [
    InviteFriendComponent,
    RegFormComponent,
    PassengerHomeComponent,
    PassengerRideHistoryComponent,
    RideRequestComponent,
    EndRideComponent
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
    UserModule
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
  exports:[PassengerHomeComponent]
})
export class PassengerModule { }