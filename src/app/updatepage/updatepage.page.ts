import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatepage',
  templateUrl: './updatepage.page.html',
  styleUrls: ['./updatepage.page.scss'],
})
export class UpdatepagePage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  closebtn() {
    this.router.navigateByUrl('/askques');
  }
}
