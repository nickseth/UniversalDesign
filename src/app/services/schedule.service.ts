import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  baseUrl:any='https://universalbooks.wpengine.com/';
 
  constructor(private http: HttpClient) { }

  addSchedulefun(scheduledata){
    let headers = new HttpHeaders({
      "Content-type": "application/json",
     });
  
     let options = {
        headers: headers
     }
   return this.http.post(this.baseUrl+ `wp-json/mobileapi/v1/add_schedule`, JSON.stringify(scheduledata),options);
   
  }
}
