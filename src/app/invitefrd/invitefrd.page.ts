import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invitefrd',
  templateUrl: './invitefrd.page.html',
  styleUrls: ['./invitefrd.page.scss'],
})
export class InvitefrdPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  joinedpage() {
    this.router.navigateByUrl('/joined');
  }
}
