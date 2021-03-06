import { Component, OnInit } from '@angular/core';
import { WishlistService } from './../services/localstorage/wishlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NotesService } from './../services/notes.service';
import { AuthenticationService } from './../services/authentication.service';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage implements OnInit {
  segmentModel = "wishlist";
  wishlistData: any;
  notes_data: any;
  token: any;
  data1: any;
  loading: any;
  connected_net: boolean;
  length_notes: boolean = false;

  colors:any = [
    {
      code: "#fff",
     name: "White"
    },
    {
       
      code: '#000',
      name: "Black"
    },
    {
     
      code: '#FFFF00',
      name: "Yellow"
    },
    {
     
      code: '#FF00FF',
      name:"Magenta"
    }
    ,{
      code: '#00FFFF',
      name: "Cyan"
    }
  ];

  constructor(private storagewishlistService: WishlistService, private activatedRouter: Router,
    private storage: Storage,
    private route: Router,
    private alertController: AlertController,
    public notesService: NotesService,
    private authenticationService: AuthenticationService,
    public loadingController: LoadingController,
    private activatedRoute: ActivatedRoute
  ) {
    
    activatedRoute.params.subscribe(async val => {
      this.storagewishlistService.getWishlistData().then(val => {
        this.wishlistData = val;
      });
      let connection = await Network.getStatus();
      this.connected_net = connection.connected;
      if (connection.connected == true) {
        this.authenticationService.getToken().then(val => {
          this.dataRetrieve(val.value);
          this.token = val.value;
  
        });
      }
    });

    Network.addListener('networkStatusChange', status => {
      if (status.connected == false) {
        this.route.navigate(['/download']);
        this.connected_net = false;
      } else {
        this.connected_net = true;
        this.storagewishlistService.getWishlistData().then(val => {
          this.wishlistData = val;
        });
        this.authenticationService.getToken().then(val => {
          this.dataRetrieve(val.value);
          this.token = val.value;
        });
      }
    });



 

  }
  getSelectedText(text_fun){
    if(document.getSelection){
      var sText = document.getSelection();
      document.execCommand('foreColor',true,'#FFFF00');
    }
  }

  ngOnInit() {

  }

  segmentChanged(ev: any) {

  }

  viewItem(item_id) {
    this.activatedRouter.navigate(['/imgclick', { id: item_id }]);

  }
  getUsersList(event) {
    return this.storagewishlistService.getWishlistData().then(val => {
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
    // console.log()
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'bubbles',
      animated: true,
      backdropDismiss: true,
      translucent: true,
    });
    await this.loading.present();
    this.notesService.getNotes(token1).subscribe(data => {
      this.notes_data = data;
     this.length_notes = this.notes_data.length <= 0;
      this.loading.dismiss();
    }, error => {
    });

    // this.storage.get('notes').then(val=>{
    //   this.notes_data = val;

    // })
  }

  getUsersList2(event, token1) {
    var token2 = { 'token': token1 };
    return this.notesService.getNotes(token2).subscribe(data => {
      this.notes_data = data;
      console.log("notes leng",this.notes_data.length)
      if (event)
        event.target.complete();
    }, error => {
      event.target.complete();
    })
  }
  deleteItem(index, id) {
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
  viewNotes(index, id) {

    this.route.navigate(['/readnote', { index: index, notes_id: id }]);

  }
  async createNew(token) {
    let title = document.getElementById('newtitle').innerHTML;
    let description = document.getElementById('newcontent').innerHTML;
    var notesData = { 'token': token, 'title': title, 'description': description };
     this.notesService.addNotes(notesData);
     setTimeout(() => {
      this.dataRetrieve(this.token)
    }, 1000);
    
  }

  compareWith(e){
    // var sText = document.getSelection();
    document.execCommand('foreColor',true,e.target.value);
    document.designMode = "off";
  }

}
