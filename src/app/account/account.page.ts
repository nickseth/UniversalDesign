import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from './../services/authentication.service';
import { UserdetailsService } from './../services/userdetails.service';
import { LoadingController } from '@ionic/angular';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  userdetails:any;
  token:any;
  user:any;
  loading:any;
  networkstatus: boolean;
  constructor(public router: Router,
     public alertController: AlertController,
     public authenticationService:AuthenticationService,
     public userdetailsService:UserdetailsService,
     public loadingController: LoadingController,
     ) { 
    
    // Network.addListener('networkStatusChange', status => {
    //   if (status.connected == false) {
    //     this.networkstatus = false;
     
    //     this.loading.dismiss();
    //     console.log(this.networkstatus+'false1');
    //   } else {
    //     this.networkstatus = true;
    //     this.authenticationService.getToken().then(val => {
    //       this.token = val.value;
    //       this.getData(this.token);
    //     });

    //     this.router.navigate(['/tabs/account']);
       
    //   }
    // });

    // const logCurrentNetworkStatus = async () => {
    //   const status = await Network.getStatus();
    //   if (status.connected == false) {
    //     this.networkstatus = false;
    //     this.router.navigate(['/account']);
    //     this.loading.dismiss();
    //   } else {
    //     this.networkstatus = true;
    //     console.log(this.networkstatus);
      
    //   }
    // };
    // console.log(logCurrentNetworkStatus)

    this.authenticationService.getToken().then(val => {
      this.token = val.value;
      this.getData(this.token);
    });
  

     }

  ngOnInit() {
 
  }
  async getData(token){
    
// console.log(token)
    // const logCurrentNetworkStatus = async () => {
    //   const status = await Network.getStatus();
    //   if (status.connected == false) {
    //     this.networkstatus = false;
    //     this.router.navigate(['/account']);
    //     this.loading.dismiss();
    //   } else {
    //     this.networkstatus = true;
    //     console.log(this.networkstatus);

    //   }
    // };
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      translucent: true,
    });
    await this.loading.present();
    let data = {'token':token};
    console.log(token)
    await this.userdetailsService.getUserDeatils(data).subscribe(val=>{
      this.userdetails = val;
      this.loading.dismiss();
      console.log(val)
      if(this.userdetails.fname == undefined){
        this.user = "Guest";
      } else{
        this.user = this.userdetails.fname +" " +this.userdetails.lname;
      }
     
    });
    
  }
  accinfo() {
    this.router.navigateByUrl('/accinformation');
  }
  faqinfo() {
    this.router.navigateByUrl('/faq');
  }
  audiopage() {
    this.router.navigateByUrl('/audiopage');
  }
  login(){
    
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
