import { Component, OnInit,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import $ from './../../assets/js/jquery.min';
@Component({
  selector: 'app-linkshow',
  templateUrl: './linkshow.page.html',
  styleUrls: ['./linkshow.page.scss'],
})
export class LinkshowPage implements OnInit {
  @Input() linkshowany: string;
  url:any;
  constructor(public modalController: ModalController) { }

  ngOnInit() {
  
    $(document).ready(()=> {
     
        this.url = this.linkshowany;
        $("#myIframe").attr("src", this.url);
  
  });
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
