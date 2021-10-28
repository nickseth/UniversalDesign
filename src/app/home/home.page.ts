import { Component, OnInit } from '@angular/core';
import SwiperCore from 'swiper';
import { IonicSwiper } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProductService  } from '../services/product.service';
import { WishlistService } from '../services/localstorage/wishlist.service';
import { AuthenticationService } from './../services/authentication.service';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

SwiperCore.use([IonicSwiper]);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  produtCategoryData:any;
  segmentModel = "All";
categoryid:any;
combine_array_data:any = []; 
banner_title:any;
banner_tagline:any;
button_text:any;
button_link:any;
button_tagline:any;
banner_image:any;
getData:any;
fullonePro:any;
  constructor(private router: Router,
    private productService:ProductService,
    private wishlistService:WishlistService,
    private authenticationService:AuthenticationService
    ) { }
  option = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10,
   
    // autoplay:true,
  }
  segmentChanged(event: any) {
    // console.log(event.target.value);
  }
  ngOnInit() {


this.getbannerData();

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

  
   
    if(this.getProductCategory()){
      setTimeout(() => {
        document.getElementById("defaultOpen").click();
        this.openCity(event, 'AllContent'); 
      }, 50);
    }

this.getProductWithCategory();

  }

   async getProductCategory(){
  await this.productService.getCategory().subscribe((res)=>{
    this.produtCategoryData = res;

  })
return true;
  }

  async getProductWithCategory(){
    await this.productService.getCategory().subscribe((res)=>{
      this.categoryid = res;
      this.categoryid.forEach(element => {
        this.products(element.id,element.name);
      });
     
     
    })
  
    }
    products(id,name){
        this.productService.getCategoryOnes(id).subscribe((res)=>{
          // {'category_id':id,'category_name':name,product:res};
        let product = {'category_id':id,'category_name':name,product:res};
        this.combine_array_data.push(product);
        // console.log(this.combine_array_data);
      })
 
      
    }
    getbannerData(){
      this.productService.getBannerData().subscribe((response)=>{
        this.getData = response;
        // console.log(this.getData);
    this.banner_title = this.getData.banner_title;
    this.banner_image  = this.getData.banner_image;
    this.banner_tagline  = this.getData.banner_tagline;
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


  movemorePage(category_id,category_title) {
    // this.router.navigateByUrl('/morelink');
    this.router.navigate(['morelink', { id: category_id,title: category_title}]);
  }
  imgclick(item_id) {
    this.router.navigate(['imgclick', { id: item_id }]);
  }



}
