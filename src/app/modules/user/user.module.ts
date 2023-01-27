import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { PlaymarketBadge } from './playmarket-badge/playmarket-badge.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SupportChatComponent } from './support-chat/support-chat.component';
import { PanicComponent } from './panic/panic.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    FooterComponent,
    PlaymarketBadge,
    NavbarComponent,
    PanicComponent,
    SupportChatComponent,
    UserProfileComponent,
    ChangePasswordComponent,

  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    FormsModule
  ],
  exports:[NavbarComponent, PanicComponent, SupportChatComponent, UserProfileComponent, FooterComponent, ChangePasswordComponent]
})
export class UserModule { }
