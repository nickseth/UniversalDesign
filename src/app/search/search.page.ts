import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  userRecords:any;
  token: string;
  loading: any;
  constructor(public router: Router
    ,private products :ProductService,
    public wishlistService:WishlistService,
    private authenticationService: AuthenticationService,
    public loadingController:LoadingController
    ) { 
   
      this.authenticationService.getToken().then(val => {
        this.token = val.value;
      });

      this.getProductWithCategory();
    }
    
  async getProductWithCategory() {
    await this.products.getBooks().subscribe(val =>{
     
      this.getBookmark(val)
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
      this.userRecords = pro_array;
      this.loading.dismiss();
      console.log(pro_array)
    }
//   userRecords = [{
//     "id": 1,
//     "name": "Leanne Graham",
//     "email": "Sincere@april.biz"
//   },
//   {
//     "id": 2,
//     "name": "Ervin Howell",
//     "email": "Shanna@melissa.tv"
//   },
//   {
//     "id": 3,
//     "name": "Clementine Bauch",
//     "email": "Nathan@yesenia.net"
//   },
//   {
//     "id": 4,
//     "name": "Patricia Lebsack",
//     "email": "Julianne.OConner@kory.org"
//   },
//   {
//     "id": 5,
//     "name": "Chelsey Dietrich",
//     "email": "Lucio_Hettinger@annie.ca"
//   },
//   {
//     "id": 6,
//     "name": "Mrs. Dennis Schulist",
//     "email": "Karley_Dach@jasper.info"
//   },
//   {
//     "id": 7,
//     "name": "Kurtis Weissnat",
//     "email": "Telly.Hoeger@billy.biz"
//   },
//   {
//     "id": 8,
//     "name": "Nicholas Runolfsdottir V",
//     "email": "Sherwood@rosamond.me"
//   },
//   {
//     "id": 9,
//     "name": "Glenna Reichert",
//     "email": "Chaim_McDermott@dana.io"
//   },
//   {
//     "id": 10,
//     "name": "Clementina DuBuque",
//     "email": "Rey.Padberg@karina.biz"
//   }
// ]

  ngOnInit() {
  }
  // browsecatg() {
  //   this.router.navigateByUrl('/browsecatg');
  // }


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
