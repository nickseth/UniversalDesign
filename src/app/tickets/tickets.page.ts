import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {

  constructor(public router: Router,private location: Location) { }

  ngOnInit() {
  }
  contactpage() {
    this.router.navigateByUrl('/contactus');
  }
  myBackButton(){
    this.location.back();
  }
}
