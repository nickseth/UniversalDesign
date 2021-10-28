import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvitefrdPageRoutingModule } from './invitefrd-routing.module';

import { InvitefrdPage } from './invitefrd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvitefrdPageRoutingModule
  ],
  declarations: [InvitefrdPage]
})
export class InvitefrdPageModule {}
