import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinkshowPageRoutingModule } from './linkshow-routing.module';

import { LinkshowPage } from './linkshow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LinkshowPageRoutingModule
  ],
  declarations: [LinkshowPage]
})
export class LinkshowPageModule {}
