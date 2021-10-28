import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audiopage',
  templateUrl: './audiopage.page.html',
  styleUrls: ['./audiopage.page.scss'],
})
export class AudiopagePage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }
  audiobtn() {
    this.router.navigateByUrl('/audiopage');
  }
  payment() {
    this.router.navigateByUrl('/payment');
  }
}
