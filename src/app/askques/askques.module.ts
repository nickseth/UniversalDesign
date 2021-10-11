import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AskquesPageRoutingModule } from './askques-routing.module';

import { AskquesPage } from './askques.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AskquesPageRoutingModule
  ],
  declarations: [AskquesPage]
})
export class AskquesPageModule {}
