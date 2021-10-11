import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrowsecatgPageRoutingModule } from './browsecatg-routing.module';

import { BrowsecatgPage } from './browsecatg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrowsecatgPageRoutingModule
  ],
  declarations: [BrowsecatgPage]
})
export class BrowsecatgPageModule {}
