import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { PlaymarketBadge } from './playmarket-badge/playmarket-badge.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SupportChatComponent } from './support-chat/support-chat.component';
import { RideHistoryComponent } from './ride-history/ride-history.component';
import { PanicComponent } from './panic/panic.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    FooterComponent,
    PlaymarketBadge,
    NavbarComponent,
    PanicComponent,
    RideHistoryComponent,
    SupportChatComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule

  ],
  exports:[NavbarComponent, PanicComponent, RideHistoryComponent, SupportChatComponent, UserProfileComponent, FooterComponent]
})
export class UserModule { }
