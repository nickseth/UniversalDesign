import { Component, OnInit } from '@angular/core';
import {  ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { WishlistService } from '../services/localstorage/wishlist.service';
import { AuthenticationService } from './../services/authentication.service';
import { LinkshowPage } from './../linkshow/linkshow.page';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { LoadingController } from '@ionic/angular';
import { Network } from '@capacitor/network';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  produtCategoryData: any;
  segmentModel = "All";
  categoryid: any;
  combine_array_data: any = [];
  banner_title: any;
  banner_tagline: any;
  button_text: any;
  button_link: any;
  button_tagline: any;
  banner_image: any;
  getData: any;
  loading: any;
  fullonePro: any;
  networkstatus: any;
  token1: any;
  pro_array: any;
  book_cmk: any;
  constructor(private router: Router,
    private productService: ProductService,
    private wishlistService: WishlistService,
    private authenticationService: AuthenticationService,
    public loadingController: LoadingController,
    private modalController: ModalController
  ) {
    this.authenticationService.getToken().then(val => {
      this.token1 = val.value;
    });

    if (this.getProductCategory()) {
      setTimeout(() => {
        document.getElementById("defaultOpen").click();
        // this.openCity(event, 'AllContent');
        this.getProductWithCategory();
      }, 50);
    }

    Network.getStatus().then(val => {
      if (val.connected == false) {
        this.networkstatus = false;
        this.router.navigate(['/download']);
        this.loading.dismiss();
      } else {
        this.networkstatus = true;

        this.getbannerData();
      }
    })

    Network.addListener('networkStatusChange', status => {
      if (status.connected == false) {
        this.networkstatus = false;
        this.router.navigate(['/download']);
        this.loading.dismiss();
      } else {
        this.networkstatus = true;
        console.log(this.networkstatus);
        this.getbannerData();
      }
    });

    // const logCurrentNetworkStatus = async () => {
    //   const status = await Network.getStatus();
    //   if (status.connected == false) {
    //     this.networkstatus = false;
    //     this.router.navigate(['/account']);
    //     this.loading.dismiss();
    //   } else {
    //     this.networkstatus = true;
    //     console.log(this.networkstatus);
    //     this.getbannerData();
    //   }
    // };

    this.getbannerData();
  }
  // option = {
  //   slidesPerView: 1.5,
  //   centeredSlides: true,
  //   loop: true,
  //   spaceBetween: 10,

  //   // autoplay:true,
  // }
  segmentChanged(event: any) {
    // console.log(event.target.value);
  }
  ngOnInit() {
    document.getElementById("defaultOpen").click();
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      // alert('Push registration success, token: ' + token.value);
      console.log('Push registration success, token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      },
    );

  }

  async getProductCategory() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      translucent: true,
    });
    await this.loading.present();
    await this.productService.getCategory().subscribe((res) => {
      this.produtCategoryData = res;
      this.loading.dismiss();
    })
    return true;
  }

  async getProductWithCategory() {

    await this.productService.getCategory().subscribe((res) => {
      this.categoryid = res;
      this.categoryid.forEach(element => {
        this.products(element.id, element.name);
      });


    })

  }
  async products(id, name) {
    this.book_cmk = await this.wishlistService.getWishlistData();
    this.productService.getCategoryOnes(id).subscribe(res => {
      this.pro_array = res;

      this.pro_array.forEach(element => {
        if(this.book_cmk != null){
        if (this.book_cmk.some(obj => element.id == obj.id)) {
          element['isBookMark'] = true;
        }
      }
      });
      let product = { 'category_id': id, 'category_name': name, product: this.pro_array };
      this.combine_array_data.push(product);
      // console.log(product)
    });
  }

  getbannerData() {
    this.productService.getBannerData().subscribe((response) => {
      this.getData = response;
      this.banner_title = this.getData.banner_title;
      this.banner_image = this.getData.banner_image;
      this.banner_tagline = this.getData.banner_tagline;
      this.button_link = this.getData.button_link;
      this.button_tagline = this.getData.button_tagline;
      this.button_text = this.getData.button_text;
    })
  }



  openCity(evt, cityName) {

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";

    evt.currentTarget.className += " active";
  }


  movemorePage(category_id, category_title) {
    this.router.navigate(['morelink', { id: category_id, title: category_title }]);
  }
  imgclick(item_id) {
    this.router.navigate(['imgclick', { id: item_id }]);
  }

  async presentModal(txt) {

    const modal = await this.modalController.create({
      component: LinkshowPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'linkshowany': txt,

      }
    });
    return await modal.present();
  }
  setwishlist(product) {
    // console.log(product.id)
    if (product['isBookMark']) { //deleting the bookmark
      this.wishlistService.deletewishlist1(product.id);


      product['isBookMark'] = false;

    } else { /// adding the bbookmark
      if (this.token1 != null){
      product['isBookMark'] = true;
      console.log(product.id)
      this.wishlistService.addBookWishlist(product.id, this.token1, product.name, product.images[0].src);
      console.log(product);
    } else {
      this.router.navigate(['/login']);
    }

    }

  }



}
