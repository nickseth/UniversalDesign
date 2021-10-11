import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatepagePageRoutingModule } from './updatepage-routing.module';

import { UpdatepagePage } from './updatepage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatepagePageRoutingModule
  ],
  declarations: [UpdatepagePage]
})
export class UpdatepagePageModule {}
