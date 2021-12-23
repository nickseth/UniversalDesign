import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class NotesService {
  baseUrl: any = 'https://universalbooks.wpengine.com/';
  addreturndata: any;
  loading: any;
  constructor(private http: HttpClient,
    private router:Router,
    public toast: ToastController,
    private loadingController:LoadingController
    ) { }

  async addNotes(addnotesdata) {
    let headers = new HttpHeaders({
      "Content-type": "application/json",
    });

    let options = {
      headers: headers
    }
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'bubbles',
      animated: true,
      backdropDismiss: true,
      translucent: true,
    });
    await this.loading.present();
    this.http.post(this.baseUrl + `wp-json/mobileapi/v1/add_notes`, JSON.stringify(addnotesdata), options)
      .subscribe(async data => {
        this.addreturndata = data;
        await this.loading.present();
        if (this.addreturndata.status == 'success') {
          this.toast.create({
            message: this.addreturndata.errormsg,
            position: 'middle',
            duration: 2000,
          }).then((toastData) => {
      
            toastData.present();
          });
          // alert(this.addreturndata.errormsg);
          // this.router.navigate(['/notes']);
        } else {
          this.toast.create({
            message: this.addreturndata.errormsg,
            position: 'middle',
            duration: 2000,
          }).then((toastData) => {
      
            toastData.present();
          });
          // alert(this.addreturndata.errormsg);
          // this.router.navigate(['/notes']);
        }
      }, async error => {
        console.log(error.error.message);
        await this.loading.present();
      });
  }

  getNotes(token_val) {
    let headers = new HttpHeaders({
      "Content-type": "application/json",
    });

    let options = {
      headers: headers
    }
    return this.http.post(this.baseUrl + `wp-json/mobileapi/v1/view_notes`, JSON.stringify(token_val), options);
  }

  deleteNotes(data) {
    let headers = new HttpHeaders({
      "Content-type": "application/json",
    });

    let options = {
      headers: headers
    }
    return this.http.post(this.baseUrl + 'wp-json/mobileapi/v1/delete_notes', JSON.stringify(data), options);
  }

  getoneNotes(data) {
    let headers = new HttpHeaders({
      "Content-type": "application/json",
    });

    let options = {
      headers: headers
    }

    return this.http.post(this.baseUrl + `wp-json/mobileapi/v1/edit_notes`, JSON.stringify(data), options);
  }
  updateNotes(data) {
    let headers = new HttpHeaders({
      "Content-type": "application/json",
    });

    let options = {
      headers: headers
    }

    return this.http.post(this.baseUrl + `wp-json/mobileapi/v1/update_notes`, JSON.stringify(data), options);
  }

}
