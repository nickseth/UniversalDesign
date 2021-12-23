import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { FormGroup, FormBuilder } from "@angular/forms";
import { NotesService } from './../services/notes.service';
import { ToastController,AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from './../services/authentication.service';
import { Location } from "@angular/common";

declare var $;
@Component({
  selector: 'app-readnote',
  templateUrl: './readnote.page.html',
  styleUrls: ['./readnote.page.scss'],
})
export class ReadnotePage implements OnInit {
  title1: any = '';
  notes_text: any = '';
  dataone: any;
  notes_id: any;
  datarecieve: any;
  updationReturn: any;
  // public Editor = ClassicEditor;
  public config = {
    placeholder: 'Type the content here!'
  }
  ionicForm: FormGroup;
  requestOptions: any;
  token: any;
  loading: any;
 
  constructor(public notesService: NotesService,
    private route: ActivatedRoute,
    private storage: Storage,
    public router: Router,
    public authenticationService: AuthenticationService,
    public loadingController: LoadingController,
    public alertController:AlertController,
    public toast:ToastController,
    private location:Location,
  ) {


  }
  ngOnInit() {

    document.addEventListener('cut', this.cutCopyHandler);
    document.addEventListener('copy', this.cutCopyHandler);
    this.authenticationService.getToken().then(val => {
      let id = this.route.snapshot.paramMap.get('index');
      this.notes_id = this.route.snapshot.paramMap.get('notes_id');
      console.log(this.notes_id)
      this.dataFetch(this.notes_id, val.value);
    
     
    });
  }
  async dataFetch(id, token) {



    // this.storage.get('notes').then(val=>{
    //   if(id != null){
    //  this.title1 = val[id].title;
    //  this.notes_text = val[id].note_text;
    //  } 
    // })
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'bubbles',
      animated: true,
    });
    await this.loading.present();
    this.notes_id = id;
    this.token = token;
    let notes_todata = { 'token': token, 'notes_id': id };
    this.notesService.getoneNotes(notes_todata).subscribe(val => {
      this.dataone = val;


      this.title1 = this.dataone.title;
      this.notes_text = this.dataone.desc;
      this.loading.dismiss();
    });

  }
  cutCopyHandler(e) {
    e.preventDefault();
    const selection = document.getSelection();
    e.clipboardData.setData(
      'text/plain',
      'hello'
    );
    // if (e.type === 'cut') selection.deleteFromDocument();
    // const selection = document.getSelection();
    // e.clipboardData.setData(
    //   'text/plain',
    //   'hello'
    // );
  }
  async createNew(token) {
    let title = document.getElementById('newtitle').innerHTML;
    let description = document.getElementById('newcontent').innerHTML;
    var notesData = { 'token': token, 'title': title, 'description': description };
    await this.notesService.addNotes(notesData);

    // this.sqdatabaseService.createNotes('12',val1,title1);
    //   setTimeout(() => {
    //     this.dataFetch();
    //   }, 1000);
  }

  async updateNotes(token, id) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      translucent: true,
      spinner: 'bubbles',
      animated: true,
    });
    await this.loading.present();
    let title = document.getElementById('updatetitle').innerHTML;
    let description = document.getElementById('updatecontent').innerHTML;
    let data = { 'token': token, 'notes_id': id, 'title': title, 'description': description };
    this.notesService.updateNotes(data).subscribe(async val => {
      this.updationReturn = val;
      await this.loading.dismiss();
      this.showToast(this.updationReturn.success);
      // this.router.navigate(['/notes']);
      this.location.back();
    });
  }
  async deleteNotes(token, id) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      translucent: true,
      spinner: 'bubbles',
      animated: true,
    });
    await this.loading.present();
    let data = { 'token': token, 'notes_id': id };
    this.notesService.deleteNotes(data).subscribe(async val => {
      this.datarecieve = val;
      await this.loading.dismiss()
      this.showToast(this.datarecieve.success);
      // this.router.navigate(['/notes']);
      this.location.back();
    })
  }
  myBackButton(){
    this.location.back();
  }
  async showDeleteAlert(token,id) {
    const alert = await this.alertController.create({
      header: "Notes",
      // subHeader: 'Subtitle for alert',
      message: "Are you sure you want to Delete Note",
      buttons: [{
        text: 'cancel',
        handler: () => {
          console.log('cancel');
        }
      },
      {
        text: 'continue',
        handler: () => {
          this.deleteNotes(token,id); 
        }
      }

      ]
    });

    await alert.present();
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
  showToast(message) {
    this.toast.create({
      message: message,
      duration: 2000,
      position:"bottom"
    }).then((toastData) => {

      toastData.present();
    });
  }
}