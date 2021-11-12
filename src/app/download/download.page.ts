import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DownloadedfileService } from '../services/localstorage/downloadedfile.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-download',
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage implements OnInit {
  bookData:any;
  constructor(public router: Router,
    public downloadedfile:DownloadedfileService,
    public storage:Storage
    ) { }

  ngOnInit() {
    this.datafunc()
  }
  datafunc(){
    this.downloadedfile.getDownloadedBookLocation().then(val=>{
      this.bookData = val;
      console.log(val)
    });
  }
  

getUsersList(event) {
  return  this.downloadedfile.getDownloadedBookLocation().then(val=>{
    this.bookData = val;
      if (event)
        event.target.complete();
    }, error => {
      console.log(error);
      if (event)
        event.target.complete();
    })
}
viewItem(book_location) {


   this.router.navigate(['/bookreader', { id: book_location }]);

}

   


}
