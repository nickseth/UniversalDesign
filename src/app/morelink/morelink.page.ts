import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { WishlistService } from '../services/localstorage/wishlist.service';
import { LoadingController } from '@ionic/angular';
import { AnyRecord } from 'dns';
@Component({
  selector: 'app-morelink',
  templateUrl: './morelink.page.html',
  styleUrls: ['./morelink.page.scss'],
})
export class MorelinkPage implements OnInit {
  private toppings;
  products: any;
  category_id: any;
  category_name: any;
  token: any;
  loading: any;
  constructor(
    private product: ProductService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private wishlistService: WishlistService,
    public loadingController: LoadingController,
  ) {
    this.authenticationService.getToken().then(val => {
      this.token = val.value;
    });

    let category_id = this.activeRouter.snapshot.paramMap.get('id');
    this.category_name = this.activeRouter.snapshot.paramMap.get('title');

    this.getProductWithCategory(category_id);
  }

  ngOnInit() {

  }

  async getProductWithCategory(id) {
    await this.product.getCategoryOnes(id).subscribe((res) => {
      this.getBookmark(res);
      console.log(res)
    })

  }

  async getBookmark(pro_array) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      translucent: true,
    });
    await this.loading.present();
    let book_cmk = await this.wishlistService.getWishlistData();
    pro_array.forEach(element => {
      if(book_cmk != null){
      if (book_cmk.some(obj => element.id == obj.id)) {
        element['isBookMark'] = true;
      }
    }
    });
    this.products = pro_array;
    this.loading.dismiss();
    console.log(pro_array)
  }
  read() {
    this.toppings = ["Bacon", "Black Olives", "Extra Cheese", "Mushrooms", "Pepperoni", "Sausage"];
    console.log(this.toppings);
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
      product['isBookMark'] = true;
      console.log(product.id)
      this.wishlistService.addBookWishlist(product.id, this.token, product.name, product.images[0].src);
      console.log(product);

    }

  }

}
