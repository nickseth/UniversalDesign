import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImgclickPageRoutingModule } from './imgclick-routing.module';

import { ImgclickPage } from './imgclick.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImgclickPageRoutingModule
  ],
  declarations: [ImgclickPage]
})
export class ImgclickPageModule {}
