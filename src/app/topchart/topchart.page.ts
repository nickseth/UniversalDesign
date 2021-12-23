import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { WishlistService } from '../services/localstorage/wishlist.service';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from './../services/authentication.service';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-topchart',
  templateUrl: './topchart.page.html',
  styleUrls: ['./topchart.page.scss'],
})
export class TopchartPage implements OnInit {
  data: any;
  wishlistData: any;
  token: any;
  wishlist_index: any;
  loading: any;
  book_cmk: any;
  connected_net: boolean;
  constructor(public router: Router,
    public products: ProductService,
    private wishlistService: WishlistService,
    public loadingController: LoadingController,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.getToken().then(async val => {
      this.token = val.value;
      let connection = await Network.getStatus();
      this.connected_net = connection.connected;
      if (connection.connected == true) {
        this.fetData();
      }
    });

    Network.addListener('networkStatusChange', status => {
      if (status.connected == false) {
        this.router.navigate(['/download']);
        this.connected_net = false;
      } else {
        this.connected_net = true;
        this.fetData();
      }
    });

  }

  ngOnInit() {


  }



  async fetData() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      translucent: true,
      spinner: 'bubbles',
      animated: true,
    });
    await this.loading.present();
    this.products.getCategoryOnes(34).subscribe(res => {

      this.getBookmark(res);

    })
  }
  async getBookmark(pro_array) {
  
    this.book_cmk = await this.wishlistService.getWishlistData();
    pro_array.forEach(element => {

      if (this.book_cmk != null) {
        if (this.book_cmk.some(obj => element.id == obj.id)) {
          element['isBookMark'] = true;
        }
      }

    });
    this.data = pro_array;
    this.loading.dismiss();
    console.log(pro_array)
  }

  imgclick(item_id) {
    this.router.navigate(['imgclick', { id: item_id }]);
  }
  addAndFetchWishlist() {

    this.wishlistService.getWishlistData().then(val => {


    });
  }

  setwishlist(product) {

    if (product['isBookMark']) {
      this.wishlistService.deletewishlist1(product.id);

      product['isBookMark'] = false;

    } else {
      if (this.token != null) {
        product['isBookMark'] = true;
        console.log(product.id)
        this.wishlistService.addBookWishlist(product.id, this.token, product.name, product.images[0].src);
        console.log(product);
      } else {
        this.router.navigate(['/login']);
      }

    }

  }



}
