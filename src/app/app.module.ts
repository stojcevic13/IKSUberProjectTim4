import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { DummyComponent } from './components/dummy/dummy.component';
import { LoginComponent } from './components/login/login.component'
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import {MatOptionModule } from '@angular/material/core';
import { RegistrationComponent } from './components/registration/registration.component';
import { UnregFormComponent } from './components/unreg-form/unreg-form.component';
import{MatInputModule} from '@angular/material/input';
import { UnregInfoComponent } from './components/unreg-info/unreg-info.component';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { RegFormComponent } from './components/reg-form/reg-form.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PlaymarketBadge } from './components/playmarket-badge/playmarket-badge.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarProfileComponent } from './components/car-profile/car-profile.component';
// import { UnregPageComponent } from './components/unreg-page/unreg-page.component';
// import { RegPageComponent } from './components/reg-page/reg-page.component';
// import { DriverPageComponent } from './components/driver-page/driver-page.component';
import { UnregNavbarComponent } from './components/unreg-navbar/unreg-navbar.component';
import { DriverNavbarComponent } from './components/driver-navbar/driver-navbar.component';
import { DriverProfileComponent } from './components/driver-profile/driver-profile.component';
import { RideRequestComponent } from './components/ride-request/ride-request.component';
import { PanicComponent } from './components/panic/panic.component';
import { EndRideComponent } from './components/end-ride/end-ride.component';
import { PassengerComponent } from './components/passenger/passenger.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MapComponent } from './modules/map/map/map.component';
import { PassengerHomeComponent } from './modules/passenger/passenger-home/passenger-home.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { UnregisteredHomeComponent } from './modules/passenger/unregistered-home/unregistered-home.component';
import { InviteFriendComponent } from './components/invite-friend/invite-friend.component';
import { SupportChatComponent } from './components/support-chat/support-chat.component';
import { DriverNextRidesComponent } from './components/driver-next-rides/driver-next-rides.component';
import { DriverHomePageComponent } from './components/driver-home-page/driver-home-page.component';
import { RideHistoryComponent } from './components/ride-history/ride-history.component';
import { PassengerRideHistoryComponent } from './modules/passenger/passenger-ride-history/passenger-ride-history.component';
import { TokenInterceptor } from './modules/security/token.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './modules/security/auth.service';
import { MapService } from './modules/map/map.service';
import { UserService } from './modules/security/user.service';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DummyComponent,
    LoginComponent,
    RegistrationComponent,
    UnregFormComponent,
    UnregInfoComponent,
    RegFormComponent,
    UserProfileComponent,
    PlaymarketBadge,
    FooterComponent,
    UnregFormComponent,
    CarProfileComponent,
    // UnregPageComponent,
    // RegPageComponent,
    // DriverPageComponent,
    UnregNavbarComponent,
    DriverNavbarComponent,
    DriverProfileComponent,
    RideRequestComponent,
    PanicComponent,
    EndRideComponent,
    PassengerComponent,
    MapComponent,
    PassengerHomeComponent,
    UnregisteredHomeComponent,
    InviteFriendComponent,
    SupportChatComponent,
    DriverNextRidesComponent,
    DriverHomePageComponent,
    RideHistoryComponent,
    PassengerRideHistoryComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatListModule,
    MatDividerModule,
    MatCheckboxModule,
    MatChipsModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService,
    MapService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
