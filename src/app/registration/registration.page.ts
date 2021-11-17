import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  ionicForm: FormGroup;
  requestOptions: any;
  constructor(public formBuilder: FormBuilder, 
    public http: HttpClient, 
    private router: Router,
    public alertController:AlertController
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
    let headers = new HttpHeaders({
      "Content-type": "application/json",
      // "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdW5pdmVyc2FsYm9va3Mud3BlbmdpbmUuY29tIiwiaWF0IjoxNjI4ODQ5NzgwLCJuYmYiOjE2Mjg4NDk3ODAsImV4cCI6MTYyOTQ1NDU4MCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.poCyawLi2pl_tT6P5bzHXHpbuyqOxiyvIhkGm4UuXtY",

    });

    let options = {
      headers: headers
    }

    await this.http.post(`https://universalbooks.wpengine.com/wp-json/mobileapi/v1/register`, JSON.stringify(this.ionicForm.value), options)
      .subscribe(data => {
        this.ionicForm.reset();
        this.showAlert('Alert','User Successfully Saved.');
        this.router.navigate(['/login']);
      }, error => {
        this.showAlert('Alert',error)
        this.ionicForm.reset();

      });


  }
  async showAlert(title,mess) {
    const alert = await this.alertController.create({
      header: title,
      // subHeader: 'Subtitle for alert',
      message: mess,
      buttons: ['OK']
    });

    await alert.present();
  }

}
