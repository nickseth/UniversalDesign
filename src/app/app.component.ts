import { Component,ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Platform, AlertController,IonRouterOutlet } from '@ionic/angular';
import { Network } from '@capacitor/network';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonRouterOutlet,{ static : true}) routerOutlet:IonRouterOutlet;
  networkstatus:any;
  constructor(private platform: Platform, private _location: Location,
    public alertController: AlertController,private router:Router) {

      Network.addListener('networkStatusChange', status => {
        if (status.connected == false) {
          this.networkstatus = false;
       
         
          console.log(this.networkstatus+'false1');
        } else {
          this.networkstatus = true;
        
  
          this.router.navigate(['/download']);
         
        }
      });
      this.backButtonEvent();

    }
    backButtonEvent(){
      this.platform.backButton.subscribeWithPriority(10,()=>{
     console.log(this._location.isCurrentPathEqualTo('/tabs/home'));
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
