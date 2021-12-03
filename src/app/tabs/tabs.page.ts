import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  token: string;

  constructor(public router: Router,
    private auth:AuthenticationService,
    ) {
      // this.auth.getToken().then(val => {
      
      //   this.token = val.value;
    
      // });
    }

  // serchpage() {
  //   this.router.navigateByUrl('/search');
  // }
}
