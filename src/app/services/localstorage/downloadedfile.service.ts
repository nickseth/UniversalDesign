import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class DownloadedfileService {
  book_download_array:any;
  constructor(private storage: Storage) {  this.storage.create(); }

  addBookDownload(id,user_name,book_name,image_url,book_location,extenstion){
    var list_wishlist = {id:id,user_name:user_name,book_name:book_name,image_url:image_url,book_location:book_location,extenstion:extenstion};
    this.book_download_array = this.storage.get('download_book_location');
    this.book_download_array.then(val=>{
      if(val != null){
       val.push(list_wishlist);
        this.storage.set('download_book_location',this.book_download_array);
      } else{
        this.book_download_array = [];
        this.book_download_array.push(list_wishlist);
        this.storage.set('download_book_location',this.book_download_array);
      }
    })
  }
  
  getDownloadedBookLocation(){
    return this.storage.get('download_book_location');
  }

}
