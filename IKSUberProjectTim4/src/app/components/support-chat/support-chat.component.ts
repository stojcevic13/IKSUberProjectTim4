import { Component } from '@angular/core';

@Component({
  selector: 'support-chat',
  templateUrl: './support-chat.component.html',
  styleUrls: ['./support-chat.component.css']
})
export class SupportChatComponent {
  showSupportChat = true;

  hideSupportChat() {
    this.showSupportChat = false;
  }
}
