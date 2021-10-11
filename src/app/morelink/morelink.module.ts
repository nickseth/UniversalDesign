import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MorelinkPageRoutingModule } from './morelink-routing.module';

import { MorelinkPage } from './morelink.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MorelinkPageRoutingModule
  ],
  declarations: [MorelinkPage]
})
export class MorelinkPageModule {}
