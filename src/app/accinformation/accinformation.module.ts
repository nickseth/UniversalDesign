import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccinformationPageRoutingModule } from './accinformation-routing.module';

import { AccinformationPage } from './accinformation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccinformationPageRoutingModule
  ],
  declarations: [AccinformationPage]
})
export class AccinformationPageModule {}
