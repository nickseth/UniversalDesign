import { Component,ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Platform, AlertController,IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonRouterOutlet,{ static : true}) routerOutlet:IonRouterOutlet;
  constructor(private platform: Platform, private _location: Location,
    public alertController: AlertController) {
      this.backButtonEvent();

    }
    backButtonEvent(){
      this.platform.backButton.subscribeWithPriority(10,()=>{
     console.log(this._location.isCurrentPathEqualTo('/home'));
        if(!this.routerOutlet.canGoBack()){
        
          this.backButtonAlert();
        } else{
          this._location.back();
        }
      });
    }
    
    async backButtonAlert(){
    const alert = await this.alertController.create({
      header: 'Universal Book',
      message: 'Are you sure you want to quit?',
      buttons:[{
        text: 'No',
        role: 'cancel'
      },{
        text: 'Yes',
        handler: ()=> {
          navigator['app'].exitApp();
        }
      }]
    });
    await alert.present();
  }
}
