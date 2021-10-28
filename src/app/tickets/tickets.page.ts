import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  contactpage() {
    this.router.navigateByUrl('/contactus');
  }
}
