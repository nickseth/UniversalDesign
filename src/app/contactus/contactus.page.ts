import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
})
export class ContactusPage implements OnInit {

  constructor(
private location:Location

  ) { }

  ngOnInit() {
  }
  openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
 closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
  myBackButton(){
    this.location.back();
  }
}
