import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { WishlistService } from '../services/localstorage/wishlist.service';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from './../services/authentication.service';

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
  book_cmk:any;
  constructor(public router: Router,
    public products: ProductService,
    private wishlistService: WishlistService,
    public loadingController: LoadingController,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.getToken().then(val => {
      this.token = val.value;
    });
    this.fetData();
  }

  ngOnInit() {


  }
  async fetData() {

    this.products.getCategoryOnes(34).subscribe(res => {
      
        this.getBookmark(res);
     
    

    })
  }
  async getBookmark(pro_array) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      translucent: true,
    });
    await this.loading.present();
    this.book_cmk = await this.wishlistService.getWishlistData();
    pro_array.forEach(element => {
      
      if(this.book_cmk != null){
        if(this.book_cmk.some(obj => element.id == obj.id)) {
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
    // console.log(product.id)
    if (product['isBookMark']) { //deleting the bookmark
      this.wishlistService.deletewishlist1(product.id);


      product['isBookMark'] = false;


      this.wishlistData = true;
      // } else {
      //   this.router.navigate(['/login']);
      // }
    } else { /// adding the bbookmark
      if (this.token != null){
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
