import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {
  constructor(public router:Router) { }

  ngOnInit() {
  }

  // supportpage() {
  //   this.router.navigateByUrl('/support');
  // }

  // askquespage(){
  //   this.router.navigateByUrl('/askques');
  // }

  // ticketpage() {
  //   this.router.navigateByUrl('/tickets');
  // }
}
