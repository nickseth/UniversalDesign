import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from './../services/authentication.service';
import { UserdetailsService } from './../services/userdetails.service';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-accinformation',
  templateUrl: './accinformation.page.html',
  styleUrls: ['./accinformation.page.scss'],
})
export class AccinformationPage implements OnInit {
  token: any;
  userdetails: any;
  user_email: any;
  loading: any;
  constructor(public router: Router,
    public alertController: AlertController,
    public authenticationService: AuthenticationService,
    public userdetailsService: UserdetailsService,
    public loadingController: LoadingController,
    private storage: Storage
  ) {

    this.authenticationService.getToken().then(val => {
      this.token = val.value;

    });
    this.getData();

  }

  ngOnInit() {
  }
  async getData() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      translucent: true,
      spinner: 'bubbles',
      animated: true,
    });
    await this.loading.present();
    let data = { 'token': this.token };
    this.userdetailsService.getUserDeatils(data).subscribe(val => {
      this.userdetails = val;
      this.user_email = this.userdetails.email;
      this.loading.dismiss();
    })
  }
  paymentmethod() {
    this.router.navigateByUrl('/payment');
  }
  async logout() {
    if (this.authenticationService.logout()) {
      this.storage.remove('username');
      this.router.navigateByUrl('/', { replaceUrl: true });
    }


  }
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class22',
      header: 'Are you sure you want to sign out?',
      message: 'You wont be able to access Saved, and any titles you have download will be deleted.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary22',
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


