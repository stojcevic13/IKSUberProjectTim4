import { Component } from '@angular/core';

@Component({
  selector: 'app-unreg-form',
  templateUrl: './unreg-form.component.html',
  styleUrls: ['./unreg-form.component.css']
})
export class UnregFormComponent {

  estimateShow: boolean = false;

  showEstimate(){
    this.estimateShow = true;
  }
}
