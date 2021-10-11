import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-imgclick',
  templateUrl: './imgclick.page.html',
  styleUrls: ['./imgclick.page.scss'],
})
export class ImgclickPage implements OnInit {

  constructor(private router: Router, public alertController: AlertController) { 

  }

  ngOnInit() {
  }

like() {
    let like= document.getElementById("like-icon");
    let dislike= document.getElementById("dislike-icon");
    like.classList.add('like-icon');
    dislike.classList.remove('dislike-icon');
}

dislike() {
  let dislike= document.getElementById("dislike-icon");
  let like= document.getElementById("like-icon");
  dislike.classList.add('dislike-icon');
  like.classList.remove('like-icon');
}
async presentAlertPrompt() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'New List',
    inputs: [
        {
        name: 'name1',
        type: 'text',
        placeholder: 'Placeholder 1'
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
        text: 'Create List',
        handler: () => {
          console.log('Confirm Create List');
        }
      }
    ]
  });

  await alert.present();
}
}
