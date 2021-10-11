import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-accinformation',
  templateUrl: './accinformation.page.html',
  styleUrls: ['./accinformation.page.scss'],
})
export class AccinformationPage implements OnInit {


  constructor(public router: Router,  public alertController: AlertController) {
   
   }

  ngOnInit() {
  }
  paymentmethod() {
    this.router.navigateByUrl('/payment');
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
            console.log('Confirm Create List');
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

