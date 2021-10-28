import { Component, OnInit } from '@angular/core';
import { WishlistService } from './../services/localstorage/wishlist.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NotesService } from './../services/notes.service';
import { AuthenticationService } from './../services/authentication.service';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage implements OnInit {
  segmentModel = "wishlist";
  wishlistData:any;
  notes_data: any;
  token: any;
  data1: any;
  loading:any;
  constructor(private storagewishlistService:WishlistService,private activatedRouter: Router,
    private storage: Storage,
    private route: Router,
    private alertController: AlertController,
    public notesService: NotesService,
    private authenticationService: AuthenticationService,
    public loadingController: LoadingController,
    
    ) { }

  ngOnInit() {
    this.storagewishlistService.getWishlistData().then(val=>{
      this.wishlistData = val;
      
    this.authenticationService.getToken().then(val => {
      this.dataRetrieve(val.value);
      this.token = val.value;
    });
     
    });
  }

  segmentChanged(ev: any) {
  
  }

  viewItem(item_id) {
    this.activatedRouter.navigate(['/product-view', { id: item_id }]);

  }
  getUsersList(event) {
    return  this.storagewishlistService.getWishlistData().then(val=>{
      this.wishlistData = val;

        if (event)
          event.target.complete();
      }, error => {
        console.log(error);
        if (event)
          event.target.complete();
      })
  }
  async dataRetrieve(token_val) {
   
    let token1 = { 'token': token_val };
     this.loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'Please wait...',
        });
        await this.loading.present();
    this.notesService.getNotes(token1).subscribe(data => {
      this.notes_data = data;
     this.loading.dismiss();
    }, error => {
    });

    // this.storage.get('notes').then(val=>{
    //   this.notes_data = val;

    // })
  }

   getUsersList2(event,token1) {
     
    var token2 = { 'token': token1 };
    return  this.notesService.getNotes(token2).subscribe(data => {
      this.notes_data = data;
        if (event)
          event.target.complete();
      }, error => {
        console.log(error);
        if (event)
          event.target.complete();
      })
  }
  deleteItem(index,id) {
    let notes_array = this.storage.get('notes');
    notes_array.then(val => {
      val.splice(index, 1);
      this.storage.set('notes', notes_array);
      setTimeout(() => {
        this.dataRetrieve(this.token)
      }, 1000);

    })
  }

  async editNotesModel(index, title, text, location, book_id) {
    const alert = await this.alertController.create({
      inputs: [
        {
          name: 'notesName',
          value: title,
          placeholder: 'Notes Title'
        },
        {
          name: 'text1',
          type: 'textarea',
          value: text,
        }
      ],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'update',
        handler: data => {
          this.updateNotes(index, data.notesName, data.text1, location, book_id);
        }
      }
      ]

    });
    await alert.present();
  }


  updateNotes(index, title, text, location, book_id) {
    let notes1 = this.storage.get('notes');
    let list_notes = { book_id: book_id, location: location, note_text: text, title: title }

    notes1.then(val => {

      val[index] = list_notes;
      this.storage.set('notes', notes1);
    })
    setTimeout(() => {
      this.dataRetrieve(this.token)
    }, 1000);
  }
  viewItem2(index,id) {

    this.route.navigate(['/readnote', { index: index,notes_id:id }]);

  }

}
