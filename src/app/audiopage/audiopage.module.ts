import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AudiopagePageRoutingModule } from './audiopage-routing.module';

import { AudiopagePage } from './audiopage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AudiopagePageRoutingModule
  ],
  declarations: [AudiopagePage]
})
export class AudiopagePageModule {}
