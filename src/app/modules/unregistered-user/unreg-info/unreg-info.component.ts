import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-unreg-info',
  templateUrl: './unreg-info.component.html',
  styleUrls: ['./unreg-info.component.css']
})
export class UnregInfoComponent {

  setKilometersLength(kilometers:string){
    let l = document.getElementById("length");
    if(l!=undefined){
      l.textContent = kilometers + "km";
    }
  }

  setTimeLength(minutes:string){
    let t = document.getElementById("time");
    if(t!=undefined){
      t.textContent = minutes + "min";
    }
  }
}
