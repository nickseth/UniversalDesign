import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {

  constructor(private location: Location) { 

  }

  ngOnInit() {
  }
  myFunction(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else { 
      x.className = x.className.replace(" w3-show", "");
    }
  }
  myBackButton(){
    this.location.back();
  }
}
