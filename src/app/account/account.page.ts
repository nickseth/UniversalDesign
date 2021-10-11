import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
 

  constructor(public router:Router, public alertController: AlertController) { }

  ngOnInit() {
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
