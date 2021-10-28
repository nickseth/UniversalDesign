import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InternetfailedPageRoutingModule } from './internetfailed-routing.module';

import { InternetfailedPage } from './internetfailed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InternetfailedPageRoutingModule
  ],
  declarations: [InternetfailedPage]
})
export class InternetfailedPageModule {}
