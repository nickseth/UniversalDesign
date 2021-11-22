import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
// import { ConditionalExpr } from '@angular/compiler';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { WishlistService } from '../services/localstorage/wishlist.service';
import { AuthenticationService } from './../services/authentication.service';
import { DownloadedfileService } from '../services/localstorage/downloadedfile.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-imgclick',
  templateUrl: './imgclick.page.html',
  styleUrls: ['./imgclick.page.scss'],
})
export class ImgclickPage implements OnInit {
  title: any;
  imagescr: any;
  id: any;
  long_desc: any;
  data: any;
  short_desc: any;
  file_url_download: any;
  token: any;
  wishlistData: any;
  wishlist_index: any;
  product_id: any;
  fileCreated: any;
  loading: any;
  author_name: any;
  book_publisher: any;
  extenstion:any;
  constructor(private router: Router,
    private rec_router: ActivatedRoute,
    public alertController: AlertController,
    private productService: ProductService,
    private transfer: FileTransfer,
    private file: File,
    private platform: Platform,
    private androidPermissions: AndroidPermissions,
    private wishlistService: WishlistService,
    private authenticationService: AuthenticationService,
    public downloadedfile: DownloadedfileService,
    public loadingController: LoadingController,
    public toast: ToastController
  ) {

    this.authenticationService.getToken().then(val => {
      this.token = val.value;
      // console.log(this.token)
    });


  }

  ngOnInit() {
    this.product_id = this.rec_router.snapshot.paramMap.get('id');
    this.getProduct(this.product_id);
    this.addAndFetchWishlist();


    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.file.checkDir(this.file.cacheDirectory, 'UniversalApp').then(response => {
          console.log('Directory exists' + response);
        }).catch(err => {
          console.log('Directory doesn\'t exist' + JSON.stringify(err));
          this.file.createDir(this.file.cacheDirectory, 'UniversalApp', false).then(response => {
            console.log('Directory create' + response);
          }).catch(err => {
            console.log('Directory no create' + JSON.stringify(err));
          });
        });


      } else{
        
      }
    });

  }
  async getProduct(id) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      translucent: true,
    });
    await this.loading.present();
    this.productService.getBookone(id).subscribe(res => {
      this.data = res;
      this.title = this.data.name;
      this.imagescr = this.data.images[0].src;
      this.short_desc = this.data.short_description;
      this.file_url_download = this.data.downloads[0].file;
      this.loading.dismiss();

      let index_publisher = this.data.meta_data.findIndex(p => p.key == "book_publisher");
      let index_author = this.data.meta_data.findIndex(p => p.key == "book_author");
      this.author_name = this.data.meta_data[index_author].value;
      this.book_publisher = this.data.meta_data[index_publisher].value;
     this.extenstion = this.file_url_download.substring(this.file_url_download.lastIndexOf('.') + 1);
      
    })
  }

  // like() {
  //     let like= document.getElementById("like-icon");
  //     let dislike= document.getElementById("dislike-icon");
  //     like.classList.add('like-icon');
  //     dislike.classList.remove('dislike-icon');
  // }

  // dislike() {
  //   let dislike= document.getElementById("dislike-icon");
  //   let like= document.getElementById("like-icon");
  //   dislike.classList.add('dislike-icon');
  //   like.classList.remove('like-icon');
  // }
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'New List',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Placeholder 1'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Create List',
          handler: () => {
            console.log('Confirm Create List');
          }
        }
      ]
    });

    await alert.present();
  }
  readBook(id) {
    this.router.navigate(['/bookreader', { id: id }]);
  }


  async downloadFileone(fileurl) {
  if (this.token != null){
    const fileTransfer: FileTransferObject = this.transfer.create();
    
    // console.log(this.file)
    let fileexternalurl = this.platform.is('android') ? this.file.cacheDirectory + "UniversalApp/":this.file.documentsDirectory + "UniversalApp/";

    // this.file.createDir(this.file.externalRootDirectory, 'UniversalBook',true);

    // let url = "https://standardebooks.org/ebooks/robert-louis-stevenson/treasure-island/downloads/robert-louis-stevenson_treasure-island.epub";
    let url = fileurl;
    let filename1 = url.substring(url.lastIndexOf('/') + 1);

    let geturlfinal = encodeURI(url);

    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class2',
      message: 'Downloading...',

    });
    await this.loading.present();
    fileTransfer.download(geturlfinal, fileexternalurl + filename1).then((entry) => {
      this.downloadedfile.addBookDownload(this.product_id, this.token, this.title, this.imagescr, filename1,this.extenstion);
      this.showToast('Downloading Complete');
      this.loading.dismiss();
      setTimeout(() => {
        this.HideToast();
      }, 3000);
    }, (error) => {
      // console.log(error)
      this.loading.dismiss();
      this.showToast('Downloading Failed');
      setTimeout(() => {
        this.HideToast();
      }, 3000);

    });
    // fileTransfer.onProgress((progressEvent) => {
    //         this.progress = perc;
    // });
  } else {
    this.router.navigate(['/login']);
  }

  }


  async alertModel(titlle, message) {
    const alert = await this.alertController.create({
      header: titlle,
      message: message,
      buttons: [{
        text: 'Ok',
        role: 'cancel'
      }
      ]

    });
    await alert.present();
  }

  addAndFetchWishlist() {

    this.wishlistService.getWishlistData().then(val => {
      // console.log(val)
      if (val != null) {
        val.forEach((element, index) => {
          if (element.id == this.product_id) {
            this.wishlist_index = index;
            this.wishlistData = val;
          }
        });
      }

    });
  }

  setwishlist() {
    if (this.token != null) {
      this.wishlistService.addBookWishlist(this.product_id, this.token, this.title, this.imagescr);

      this.wishlistData = true;
    } else {
      this.router.navigate(['/login']);
    }

  }

  deletewishlist() {
    this.wishlistService.deletewishlist1(this.wishlist_index);

    this.wishlistData = false;

    // book_location

  }
  showToast(message) {
    this.toast.create({
      message: message,
      duration: 2000
    }).then((toastData) => {

      toastData.present();
    });
  }
  HideToast() {
    this.toast.dismiss();
  }

}
