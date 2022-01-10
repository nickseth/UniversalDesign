import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserdetailsService } from '../services/userdetails.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private userdetailsService: UserdetailsService,
    private storage: Storage,
  ) {
    this.storage.create();
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: [''],
    });
  }
  // [Validators.required, Validators.minLength(6)]
  async login() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      translucent: true,
      spinner: 'bubbles',
      animated: true,
    });
    await loading.present();

    this.authService.login(this.credentials.value).subscribe(
      async (res) => {
        this.authService.getToken().then(authe => {
          this.userdetailsService.getUserDeatils({ token: authe['value'] }).subscribe(async (val: any) => {
            console.log(val);
            this.storage.set('username', val['fname'] + ' ' + val['lname']);
            await loading.dismiss();
            this.router.navigateByUrl('/tabs', { replaceUrl: true });
          });
        })

      },
      async (res) => {
        console.log(res)
        await loading.dismiss();
        const alert = await this.alertController.create({
          cssClass: 'error_mess',
          header: 'Login failed',
          message: res.error.message,
          buttons: ['OK'],
        });

        await alert.present();
      }
    );
  }

  // Easy access for form fields
  get email() {
    return this.credentials.get('username');
  }

  get password() {
    return this.credentials.get('password');
  }



}