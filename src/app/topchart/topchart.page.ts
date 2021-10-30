import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { WishlistService } from '../services/localstorage/wishlist.service';
@Component({
  selector: 'app-topchart',
  templateUrl: './topchart.page.html',
  styleUrls: ['./topchart.page.scss'],
})
export class TopchartPage implements OnInit {
data:any;
wishlistData:any;
token:any;
wishlist_index:any;
  constructor(public router: Router,
    public products:ProductService,
    private wishlistService:WishlistService,
    ) { }

  ngOnInit() {

  this.products.getCategoryOnes(34).subscribe(res=>{
   this.data = res;
   console.log(this.data)
   this.data.forEach(element => {
    this.addAndFetchWishlist(element.id)
   });
 
  })
  }
  // filetrpage() {
  //   this.router.navigateByUrl('/filterpage');
  // }

  imgclick(item_id) {
    this.router.navigate(['imgclick', { id: item_id }]);
  }
  addAndFetchWishlist(product_id) {

    this.wishlistService.getWishlistData().then(val => {
      // console.log(val)
      if (val != null) {
        val.forEach((element, index) => {
          if (element.id == product_id) {
            this.wishlist_index = index;
            this.wishlistData = val;
          }
        });
      }

    });
  }

  setwishlist(product_id,title,imagescr) {
    // if (this.token != null) {
      this.wishlistService.addBookWishlist(product_id, this.token, title, imagescr);

      this.wishlistData = true;
    // } else {
    //   this.router.navigate(['/login']);
    // }

  }

  deletewishlist() {
    this.wishlistService.deletewishlist1(this.wishlist_index);

    this.wishlistData = false;

    // book_location

  }
 
}
