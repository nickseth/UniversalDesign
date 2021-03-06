import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalendarComponent } from 'ionic2-calendar';
import { ScheduleService } from '../services/schedule.service';
import { AuthenticationService } from '../services/authentication.service';
import { ToastController } from '@ionic/angular';
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

  eventSource: any;
  viewTitle;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  getscheduleData: any;
  token: any;
  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string,
    public schedule: ScheduleService,
    private authentication: AuthenticationService,
    public toast: ToastController
  ) {
    this.authentication.getToken().then(val => {
      this.token = val.value;
      
      this.getScheduleData(this.token);
    });
  }
  ngOnInit() {
    this.resetEvent();
  }
  getScheduleData(token1) {
    let stoken = { token: token1 }
    this.schedule.getSchedule(stoken).subscribe(res => {
      this.getscheduleData = res;
console.log(res)
      const newArray = this.getscheduleData.map(item => {
        let newallDate;
        if (item.all_day == 0) {
          newallDate = false;
        } else {
          newallDate = true;
        }

        return {
          title: item.time_title,
          startTime: new Date(item.start_time),
          endTime: new Date(item.end_time),
          allDay: newallDate,
          desc: item.time_description
        };
      });
      this.eventSource = newArray;

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
      // token: this.token,
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }

    if (eventCopy.allDay) {

      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }
    //  alert(eventCopy.start_time);
    this.schedule.addSchedulefun(eventCopy).subscribe(val => {
      this.showToast('Set Schedule Successfully');
      // this.getScheduleData(this.token);
     
    })

    this.myCal.loadEvents();
    this.resetEvent();
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

  showToast(message) {
    this.toast.create({
      message: message,
      position: 'middle',
      duration: 2000,
    }).then((toastData) => {

      toastData.present();
    });
  }

}