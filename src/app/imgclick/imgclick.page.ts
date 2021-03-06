import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { WishlistService } from '../services/localstorage/wishlist.service';
import { AuthenticationService } from './../services/authentication.service';
import { DownloadedfileService } from '../services/localstorage/downloadedfile.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Share } from '@capacitor/share';

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
  full_desc: any;
  wishlistData: any;
  wishlist_index: any;
  product_id: any;
  fileCreated: any;
  loading: any;
  author_name: any;
  book_publisher: any;
  extenstion: any;
  related_pro: any;
  upselling_pro: any;
  isReadMore: any = true
  permalink1: any;
  book_exist: boolean = false;
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
    public toast: ToastController,
  ) {

    this.authenticationService.getToken().then(val => {
      this.token = val.value;
      console.log(this.token)
    });
  }

  ngOnInit() {
    this.product_id = this.rec_router.snapshot.paramMap.get('id');
    this.getProduct(this.product_id);
    this.addAndFetchWishlist();
  }

getExistUrl(){
  this.platform.ready().then(() => {
    if (this.platform.is('android')) {
      this.file.checkDir(this.file.cacheDirectory, 'UniversalApp').then(response => {
        let filename1 = this.file_url_download.substring(this.file_url_download.lastIndexOf('/') + 1);
        this.file.checkFile(this.file.cacheDirectory + "UniversalApp/",filename1).then(res=>{
      this.book_exist = res;
        },error=>{
          console.log(error)
        });
      }).catch(err => {
        console.log('Directory doesn\'t exist' + JSON.stringify(err));
        this.file.createDir(this.file.cacheDirectory, 'UniversalApp', false).then(response => {
          console.log('Directory create' + response);
        }).catch(err => {
          console.log('Directory no create' + JSON.stringify(err));
        });
      });


    } else {
      this.file.checkDir(this.file.documentsDirectory, 'UniversalApp').then(response => {
        console.log('Directory exists' + response);
      }).catch(err => {
        console.log('Directory doesn\'t exist' + JSON.stringify(err));
        this.file.createDir(this.file.documentsDirectory, 'UniversalApp', false).then(response => {
          console.log('Directory create' + response);
        }).catch(err => {
          console.log('Directory no create' + JSON.stringify(err));
        });
      });

    }
  });
}
  
  async getProduct(id) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      translucent: true,
      spinner: 'bubbles',
      animated: true,
    });
    await this.loading.present();
    this.productService.getBookone(id).subscribe(res => {
      console.log(res)

      this.data = res;
      this.title = this.data.name;
      this.imagescr = this.data.images[0].src;
      this.short_desc = this.data.short_description;
      this.file_url_download = this.data.downloads[0].file;
      this.full_desc = this.data.description;
      this.permalink1 = this.data.permalink;
      this.related_pro = [];
      this.upselling_pro = [];
      
      if (this.data.related_ids && this.data.related_ids.length > 0) {
        this.data.related_ids.forEach(element22 => {
          this.productService.getBookone(element22).subscribe(val2 => {
            this.related_pro.push(val2);
          });
        });
      }

      if (this.data.upsell_ids && this.data.upsell_ids.length > 0) {
        this.data.upsell_ids.forEach(element22 => {
          this.productService.getBookone(element22).subscribe(async val3 => {
            this.upselling_pro.push(val3);
            await this.loading.dismiss();
          }, error => {
            this.loading.dismiss();
          }
          );

        });
      }
   

      this.getExistUrl();
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
    this.getExistUrl();
    if (this.token != null) {
      const fileTransfer: FileTransferObject = this.transfer.create();
      let fileexternalurl = this.platform.is('android') ? this.file.cacheDirectory + "UniversalApp/" : this.file.documentsDirectory + "UniversalApp/";

      // this.file.createDir(this.file.externalRootDirectory, 'UniversalBook',true);

      // let url = "https://standardebooks.org/ebooks/robert-louis-stevenson/treasure-island/downloads/robert-louis-stevenson_treasure-island.epub";
      let url = fileurl;
      let filename1 = url.substring(url.lastIndexOf('/') + 1);

      let geturlfinal = encodeURI(url);
      if(this.book_exist != true){
      this.loading = await this.loadingController.create({
        cssClass: 'my-custom-class2',
        message: 'Downloading...',
      });
      await this.loading.present();
     
      fileTransfer.download(geturlfinal, fileexternalurl + filename1).then((entry) => {
        this.downloadedfile.addBookDownload(this.product_id, this.token, this.title, this.imagescr, filename1, this.extenstion);
        this.showToast('Downloading Complete');
        this.loading.dismiss();
        this.getExistUrl();
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
    } else{
      this.toast.create({
        message: "Book already Downloaded",
        duration: 2000
      }).then((toastData) => {
  
        toastData.present();
      });

    }


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
  imgclick(item_id) {
    this.router.navigate(['imgclick', { id: item_id }]);
  }


  showText() {
    this.isReadMore = !this.isReadMore
  }
  async socialSharing() {
    await Share.share({
      title: this.title,
      // text: this.short_desc.innerHTML,
      url: this.permalink1,
      dialogTitle: 'Share with Buddies',
    });
  }

}
