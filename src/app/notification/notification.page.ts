import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  darkValue:any;
  notify_on:any ='Off';
  account_on:any ='Off'
  constructor(public router: Router) { }
  
  ngOnInit() {
    let tg= document.getElementById('toggle-wrap');
    tg.classList.add('toggleon');
    
  }
  setTheme(toggle) {
    if(toggle.detail.checked) {
      let tg= document.getElementById('toggle-wrap');
      tg.classList.remove('toggleon');
      this.notify_on = 'On';
    }
    else {
      let tg= document.getElementById('toggle-wrap');
      tg.classList.add('toggleon');
      let dd1 = document.getElementById('notify_on');
      this.notify_on = 'Off';
    }
  }
  back() {
    this.router.navigateByUrl('/account');
  }
}
