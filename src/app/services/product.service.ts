import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  options:any;
baseUrl:any = "https://universalbooks.wpengine.com/";
  constructor(private http: HttpClient) { 
    let headers = new HttpHeaders({
      "Content-type": "application/json",
     });
  
     this.options = {
        headers: headers
     }
  }
  getBooks(){
    return  this.http.get(this.baseUrl+'wp-json/wc/v3/products?consumer_key=ck_97758e7f0f2e208f8cf639f7129755391f0a0e19&consumer_secret=cs_685bdd86613cb687337e13237872c831478d32bb');


}
getCategory(){
return   this.http.get(this.baseUrl+'wp-json/wc/v3/products/categories?consumer_key=ck_97758e7f0f2e208f8cf639f7129755391f0a0e19&consumer_secret=cs_685bdd86613cb687337e13237872c831478d32bb');
}
getBookone(id){
return this.http.get(this.baseUrl+"wp-json/wc/v3/products/"+id+"?consumer_key=ck_97758e7f0f2e208f8cf639f7129755391f0a0e19&consumer_secret=cs_685bdd86613cb687337e13237872c831478d32bb");
}
getCategoryOnes(id){
  return this.http.get(this.baseUrl+"wp-json/wc/v3/products?category="+id+"&consumer_key=ck_97758e7f0f2e208f8cf639f7129755391f0a0e19&consumer_secret=cs_685bdd86613cb687337e13237872c831478d32bb");
}

getBannerData(){
  
  return this.http.get(this.baseUrl+"wp-json/mobileapi/v1/add_banner");
}


getCategoryOnestopChart(id){
  return this.http.get(this.baseUrl+"wp-json/wc/v3/products?category="+id+"&consumer_key=ck_97758e7f0f2e208f8cf639f7129755391f0a0e19&consumer_secret=cs_685bdd86613cb687337e13237872c831478d32bb");
}

}