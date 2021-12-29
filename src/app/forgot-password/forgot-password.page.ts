import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { FormGroup, FormBuilder} from "@angular/forms";
import { Router } from '@angular/router';
import { LoadingController  } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  ionicForm_reset:any;
  loading: any;
  constructor(
    public formBuilder: FormBuilder,
    public http: HttpClient,
    private router: Router,
    private loadingController:LoadingController,
   
    ) { 

    this.ionicForm_reset = this.formBuilder.group({
      user_login: [''],
    
   })
  }

  ngOnInit() {
  }

  async submitForm() {
    
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'bubbles',
      animated: true,
    });
    await this.loading.present();
    let headers = new HttpHeaders({
    "Content-type": "application/json"
   });

   let options = {
      headers: headers
   }
 
   await this.http.post(`https://universalbooks.wpengine.com/wp-json/mobileapi/v1/retrieve_password`, JSON.stringify(this.ionicForm_reset.value),options)
    .subscribe(async data => {
      await this.loading.dismiss();
      this.ionicForm_reset.reset();
    this.router.navigate(['/login']); 
     }, error => {
      alert(error.error.message);
       this.ionicForm_reset.reset();
        
    });

    
  }

}
