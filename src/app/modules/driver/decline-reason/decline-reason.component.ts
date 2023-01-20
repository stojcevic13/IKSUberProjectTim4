import { Component } from '@angular/core';

@Component({
  selector: 'app-decline-reason',
  templateUrl: './decline-reason.component.html',
  styleUrls: ['./decline-reason.component.css']
})
export class DeclineReasonComponent {
  show:boolean = true;

  hide(){
    this.show=false;
  }
}
