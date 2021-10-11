import { Component, OnInit } from '@angular/core';
import SwiperCore from 'swiper';
import { IonicSwiper } from '@ionic/angular';
import { Router } from '@angular/router';
SwiperCore.use([IonicSwiper]);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private router: Router) { }
  option = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10,
    // autoplay:true,
  }
  segmentChanged(event: any) {
    console.log(event.target.value);
  }
  ngOnInit() {
  
      document.getElementById("defaultOpen").click();
      this.openCity(event, 'AllContent');

   
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

  }
  movemorePage(){
    this.router.navigateByUrl('/morelink');
  }
  imgclick(){
    this.router.navigateByUrl('/imgclick');
  }
}
