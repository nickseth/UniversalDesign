import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-askques',
  templateUrl: './askques.page.html',
  styleUrls: ['./askques.page.scss'],
})
export class AskquesPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  closebtn() {
    this.router.navigateByUrl('/faq');
  }
  updatecta() {
    this.router.navigateByUrl('/updatepage');
  }
}
