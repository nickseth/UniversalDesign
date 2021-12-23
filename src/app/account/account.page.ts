import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from './../services/authentication.service';
import { UserdetailsService } from './../services/userdetails.service';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  userdetails: any;
  token: any;
  user: any;
  loading: any;
  networkstatus: boolean;
  connected_net: boolean;
  constructor(
    public router: Router,
    public alertController: AlertController,
    public authenticationService: AuthenticationService,
    public userdetailsService: UserdetailsService,
    public loadingController: LoadingController,
    private storage:Storage,
    private activatedRoute:ActivatedRoute
  ) {
 
activatedRoute.params.subscribe(async val => {
  this.storage.create();
  this.authenticationService.getToken().then(val => {
    this.token = val.value;
  });
this.storage.get('username').then(val=>{
if(val != undefined){
  this.user = val;
} else{
  this.user = "Guest";
}
})

  let connection = await  Network.getStatus();
  this.connected_net = connection.connected;
 });
 Network.addListener('networkStatusChange', status => {
  if (status.connected == false) {
    this.router.navigate(['/download']);
    this.connected_net = false;
  } else {
    this.connected_net = true;
  }
});

  }

  ngOnInit() {

  }
  // async getData(token) {
  //   this.loading = await this.loadingController.create({
  //     cssClass: 'my-custom-class',
  //     backdropDismiss: true,
  //     translucent: true,
  //   });
  //   await this.loading.present();
  //   let data = { 'token': token };
  //   // console.log(token)
  //   await
  // }
  accinfo() {
    this.router.navigateByUrl('/accinformation');
  }
  faqinfo() {
    this.router.navigateByUrl('/faq');
  }
  audiopage() {
    this.router.navigateByUrl('/audiopage');
  }
  login() {

    this.router.navigateByUrl('/login');
  }
  // prefrencepage() {
  //     let prefrence= document.getElementById("prefrence");
  //     prefrence.classList.add('preadd');
  //     prefrence.classList.remove('preremove');

  // }
  async presentAlertCheckbox() {
    const alert = await this.alertController.create({
      header: 'Language Options',
      message: 'We will translate the app and tailor your personal recommendations where possible to match your preferred language selection.',
      inputs: [
        {
          name: 'English',
          type: 'radio',
          label: 'English',
          value: 'English',
          checked: true
        },
        {
          name: 'Espanol',
          type: 'radio',
          label: 'Espanol',
          value: 'Espanol'
        },
        {
          name: 'Francais',
          type: 'radio',
          label: 'Francais',
          value: 'Francais'
        },
        {
          name: 'Portugues',
          type: 'radio',
          label: 'Portugues',
          value: 'Portugues'
        },
        {
          name: 'Indonesia',
          type: 'radio',
          label: 'Indonesia',
          value: 'Indonesia'
        },
        {
          name: 'PyccKNN',
          type: 'radio',
          label: 'PyccKNN',
          value: 'PyccKNN'
        },
        {
          name: 'Deutsch',
          type: 'radio',
          label: 'PyccKNN',
          value: 'PyccKNN'
        },
        {
          name: 'Italian',
          type: 'radio',
          label: 'Italian',
          value: 'Italian'
        },
        {
          name: 'Romana',
          type: 'radio',
          label: 'Romana',
          value: 'Romana'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }
  downloadpage() {
    this.router.navigateByUrl('/download');
  }
  notificationpage() {
    this.router.navigateByUrl('/notification');
  }
  privacypage() {
    this.router.navigateByUrl('/privacy');
  }
  invitefrdpage() {
    this.router.navigateByUrl('/invitefrd');
  }
}
