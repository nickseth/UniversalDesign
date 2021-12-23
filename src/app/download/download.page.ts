import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DownloadedfileService } from '../services/localstorage/downloadedfile.service';
import { Storage } from '@ionic/storage-angular';
// import { AudioService } from '../services/Audio/audio.service';
// import { Media, MediaObject } from '@ionic-native/media/ngx';
import { IonRange } from '@ionic/angular';
import { Howl } from 'howler';
export interface Track {
	name: string;
	path: string;
}
@Component({
  selector: 'app-download',
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage implements OnInit {
  bookData:any;
  playlist: Track[] = [
		{
			name: 'Jazzy Sounds',
			path: '/assets/js/music.mp3',
		},
		
	];

  activeTrack: Track = null;
	player: Howl = null;
	isPlaying = false;
	progress = 0;
  @ViewChild('range', { static: false }) range: IonRange;
  constructor(public router: Router,
    public downloadedfile:DownloadedfileService,
    public storage:Storage,
    // private audioService:AudioService,
    // public media:Media
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
start(path) {
  if (this.player) {
    this.player.stop();
  }
  this.player = new Howl({
    src: [path],
    html5: true,
    onplay: () => {
      console.log('onplay');
      this.isPlaying = true;
      // this.activeTrack = track;
      this.updateProgress();
    },
    onend: () => {
      console.log('onend');
    },
  });
  this.player.play();
}

togglePlayer(pause: any) {
  this.isPlaying = !pause;
  if (pause) {
    this.player.pause();
  } else {
    this.player.play();
  }
}

// next() {
//   const index = this.playlist.indexOf(this.activeTrack);
//   if (index !== this.playlist.length - 1) {
//     this.start(this.playlist[index + 1]);
//   } else {
//     this.start(this.playlist[0]);
//   }
// }

// prev() {
//   const index = this.playlist.indexOf(this.activeTrack);
//   if (index > 0) {
//     this.start(this.playlist[index - 1]);
//   } else {
//     this.start(this.playlist[this.playlist.length - 1]);
//   }
// }

seek() {
  const newValue = +this.range.value;
  const duration = this.player.duration();
  this.player.seek(duration + newValue / 100);
}

updateProgress() {
  const seek = this.player.seek();
  this.progress = (seek / this.player.duration()) * 100 || 0;
  setTimeout(() => {
    this.updateProgress();
  }, 1000);
}

playCurrent(item){
  if(item['isplay']){
    this.player.pause();
    item['isplay'] = false;
  } else{
    item['isplay'] = true;
   this.start(`${item}`);
  }
}

}
