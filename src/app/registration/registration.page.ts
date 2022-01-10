import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  ionicForm: FormGroup;
  requestOptions: any;
  showEyeVal: any = true;
  constructor(public formBuilder: FormBuilder,
    public http: HttpClient,
    private router: Router,
    public alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.ionicForm = this.formBuilder.group({
      fname: [''],
      lname: [''],
      email: [''],
      password: [''],
      conpassword: ['']
    })

  }
  ngOnInit() { }

  async submitForm() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      translucent: true,
      spinner: 'bubbles',
      animated: true,
    });
    await loading.present();
    let headers = new HttpHeaders({
      "Content-type": "application/json",
      // "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdW5pdmVyc2FsYm9va3Mud3BlbmdpbmUuY29tIiwiaWF0IjoxNjI4ODQ5NzgwLCJuYmYiOjE2Mjg4NDk3ODAsImV4cCI6MTYyOTQ1NDU4MCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.poCyawLi2pl_tT6P5bzHXHpbuyqOxiyvIhkGm4UuXtY",

    });

    let options = {
      headers: headers
    }

    this.http.post(`https://universalbooks.wpengine.com/wp-json/mobileapi/v1/register?consumer_key=ck_97758e7f0f2e208f8cf639f7129755391f0a0e19&consumer_secret=cs_685bdd86613cb687337e13237872c831478d32bb'`, JSON.stringify(this.ionicForm.value), options)
      .subscribe(async data => {
        console.log(data)
        await loading.dismiss();
        this.ionicForm.reset();
        this.showAlert('Alert', 'User Successfully Saved.');
        this.router.navigate(['/login']);
      }, async error => {
        await loading.dismiss();
        this.showAlert('Alert', error.error.message);

        this.ionicForm.reset();

      });


  }
  async showAlert(title, mess) {
    const alert = await this.alertController.create({
      header: title,
      // subHeader: 'Subtitle for alert',
      message: mess,
      buttons: ['OK']
    });

    await alert.present();
  }
  openHideEye() {
    this.showEyeVal = false;
    document.getElementById("conpassword").setAttribute("type", "text");

  }
  openEye() {
    this.showEyeVal = true;
    document.getElementById("conpassword").setAttribute("type", "password");
  }

}
