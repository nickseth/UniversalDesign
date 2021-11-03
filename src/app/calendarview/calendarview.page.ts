import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalendarComponent } from 'ionic2-calendar';
import { ScheduleService } from '../services/schedule.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-calendarview',
  templateUrl: 'calendarview.page.html',
  styleUrls: ['calendarview.page.scss'],
})
export class CalendarviewPage implements OnInit {
 
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };
  redhat = [];
  minDate = new Date().toISOString();
 
  eventSource:any;
  viewTitle;
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
 
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  getscheduleData:any;
  token:any;
  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string,
  public schedule:ScheduleService,
  private authentication:AuthenticationService
  ) {
    this.authentication.getToken().then(val => {
      this.token = val.value;
      // this.getScheduleData(this.token);
    });
   }
  ngOnInit() {
    this.resetEvent();
  }
  getScheduleData(token1){
    let stoken = {token:token1}
    this.schedule.getSchedule(stoken).subscribe(res=>{
      this.getscheduleData = res;
      
      const newArray = this.getscheduleData.map(item => {
        return {
          title: item.time_title, 
          startTime: item.start_time,
          endTime:item.end_time,
          allDay:false,
          desc:item.time_description
         };
      });
     this.eventSource = newArray;
     console.log(newArray)
    })
  }
 
  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }
 
  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      token:this.token,
      time_title: this.event.title,
      start_time:  new Date(this.event.startTime),
      end_time: new Date(this.event.endTime),
      all_Day: this.event.allDay,
      time_description: this.event.desc
    }
 
    if (eventCopy.all_Day) {

      let start = eventCopy.start_time;
      let end = eventCopy.end_time;
 
      eventCopy.start_time = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.end_time = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }
//  alert(eventCopy.start_time);
    this.schedule.addSchedulefun(eventCopy).subscribe(val=>{
      alert('Schedule Saved');
      
    })

    this.redhat.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
    console.log(this.redhat)
    this.getScheduleData(this.token)
  }

 // Change current month/week/day
 next() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slideNext();
}
 
back() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slidePrev();
}
 
// Change between month/week/day
changeMode(mode) {
  this.calendar.mode = mode;
}
 
// Focus today
today() {
  this.calendar.currentDate = new Date();
}
 
// Selected date reange and hence title changed
onViewTitleChanged(title) {
  this.viewTitle = title;
}
 
// Calendar event was clicked
async onEventSelected(event) {
  // Use Angular date pipe for conversion
  let start = formatDate(event.startTime, 'medium', this.locale);
  let end = formatDate(event.endTime, 'medium', this.locale);
 
  const alert = await this.alertCtrl.create({
    header: event.title,
    subHeader: event.desc,
    message: 'From: ' + start + '<br><br>To: ' + end,
    buttons: ['OK']
  });
  alert.present();
}
 
// Time slot was clicked
onTimeSelected(ev) {
  let selected = new Date(ev.selectedTime);
  this.event.startTime = selected.toISOString();
  selected.setHours(selected.getHours() + 1);
  this.event.endTime = (selected.toISOString());
}
}