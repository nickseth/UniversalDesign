import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-morelink',
  templateUrl: './morelink.page.html',
  styleUrls: ['./morelink.page.scss'],
})
export class MorelinkPage implements OnInit {
  private toppings;
  constructor() { }

  ngOnInit() {
  }


  read(){
    this.toppings = ["Bacon", "Black Olives", "Extra Cheese", "Mushrooms", "Pepperoni", "Sausage"];
    console.log(this.toppings);
  }
  
}
