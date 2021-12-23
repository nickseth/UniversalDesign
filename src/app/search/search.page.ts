import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Network } from '@capacitor/network';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { WishlistService } from '../services/localstorage/wishlist.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  filterTerm: string;
  userRecords: any = null;
  token: string;
  loading: any;
  constructor(
    public router: Router
    ,private products: ProductService,
    public wishlistService: WishlistService,
    private authenticationService: AuthenticationService,
    public loadingController: LoadingController,
    private activatedRoute:ActivatedRoute
  ) {
    activatedRoute.params.subscribe(async val => {
    this.authenticationService.getToken().then(val => {
      this.token = val.value;
      // this.getProductWithCategory();
    });

    
  });
  }

  async onChangeSearch(e) {
    let connection = await Network.getStatus();
    if (connection.connected != false) {
      await this.products.getSearch(e.target.value).subscribe(val => {

        this.getBookmark(val)

      })
    }

  }

  async getProductWithCategory() {


  }

  async getBookmark(pro_array) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      translucent: true,
      spinner: 'bubbles',
      animated: true,
    });
    await this.loading.present();
    let book_cmk = await this.wishlistService.getWishlistData();
    pro_array.forEach(element => {
      if (book_cmk != null) {
        if (book_cmk.some(obj => element.id == obj.id)) {
          element['isBookMark'] = true;
        }
      }
    });
    this.userRecords = pro_array;
    this.loading.dismiss();
    console.log(pro_array)
  }


  ngOnInit() {
  }

  imgclick(item_id) {
    this.router.navigate(['imgclick', { id: item_id }]);
  }
  setwishlist(product) {
    // console.log(product.id)
    if (product['isBookMark']) { //deleting the bookmark
      this.wishlistService.deletewishlist1(product.id);


      product['isBookMark'] = false;

    } else { /// adding the bbookmark
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
