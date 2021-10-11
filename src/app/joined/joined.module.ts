import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinedPageRoutingModule } from './joined-routing.module';

import { JoinedPage } from './joined.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinedPageRoutingModule
  ],
  declarations: [JoinedPage]
})
export class JoinedPageModule {}
