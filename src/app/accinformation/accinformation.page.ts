import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from './../services/authentication.service';
import { UserdetailsService } from './../services/userdetails.service';


@Component({
  selector: 'app-accinformation',
  templateUrl: './accinformation.page.html',
  styleUrls: ['./accinformation.page.scss'],
})
export class AccinformationPage implements OnInit {
  token:any;
  userdetails:any;
  user_email:any;
  constructor(public router: Router,
      public alertController: AlertController,
      public authenticationService:AuthenticationService,
     public userdetailsService:UserdetailsService
      ) {
        this.authenticationService.getToken().then(val => {
          this.token = val.value;
          let data = {'token':this.token};
          this.userdetailsService.getUserDeatils(data).subscribe(val=>{
            this.userdetails = val;
            this.user_email = this.userdetails.email; 
            // if(this.userdetails.fname == undefined){
            //   this.user = "Guest";
            // } else{
            //   this.user = this.userdetails.fname +" " +this.userdetails.lname;
            // }
           
          })
      });
   
   }

  ngOnInit() {
  }
  paymentmethod() {
    this.router.navigateByUrl('/payment');
  }
  async logout() {
    await this.authenticationService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      subHeader: 'Are you sure you want to sign out?',
      message: 'You wont be able to access Saved, and any titles you have download will be deleted.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Sign Out',
          handler: () => {
            this.logout();
          }
        }
      ]
    });
  
    await alert.present();
  }

}
function presentAlertPrompt() {
  throw new Error('Function not implemented.');
}

