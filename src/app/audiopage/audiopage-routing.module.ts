import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AudiopagePage } from './audiopage.page';

const routes: Routes = [
  {
    path: '',
    component: AudiopagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudiopagePageRoutingModule {}
