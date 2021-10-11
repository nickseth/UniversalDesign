import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topchart',
  templateUrl: './topchart.page.html',
  styleUrls: ['./topchart.page.scss'],
})
export class TopchartPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  filetrpage() {
    this.router.navigateByUrl('/filterpage');
  }
}
