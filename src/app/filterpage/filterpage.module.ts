import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterpagePageRoutingModule } from './filterpage-routing.module';

import { FilterpagePage } from './filterpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterpagePageRoutingModule
  ],
  declarations: [FilterpagePage]
})
export class FilterpagePageModule {}
