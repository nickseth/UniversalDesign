import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopchartPageRoutingModule } from './topchart-routing.module';

import { TopchartPage } from './topchart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopchartPageRoutingModule
  ],
  declarations: [TopchartPage]
})
export class TopchartPageModule {}
