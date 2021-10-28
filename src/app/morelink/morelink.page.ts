import { Component, OnInit } from '@angular/core';
import { ProductService  } from '../services/product.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-morelink',
  templateUrl: './morelink.page.html',
  styleUrls: ['./morelink.page.scss'],
})
export class MorelinkPage implements OnInit {
  private toppings;
  products:any;
  category_id:any;
  category_name:any;
  constructor(
    private product:ProductService,
    private activeRouter:ActivatedRoute,
    private router:Router,
  ) { }

  ngOnInit() {
    let category_id = this.activeRouter.snapshot.paramMap.get('id');
    this.category_name = this.activeRouter.snapshot.paramMap.get('title');

    this.getProductWithCategory(category_id);
  }

  async getProductWithCategory(id){
    await this.product.getCategoryOnes(id).subscribe((res)=>{
      this.products = res;
      console.log(res)
    })
  
    }
  read(){
    this.toppings = ["Bacon", "Black Olives", "Extra Cheese", "Mushrooms", "Pepperoni", "Sausage"];
    console.log(this.toppings);
  }

  imgclick(item_id) {
    this.router.navigate(['imgclick', { id: item_id }]);
  }
  
}
