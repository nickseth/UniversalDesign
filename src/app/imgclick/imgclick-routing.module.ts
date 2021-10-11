import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImgclickPage } from './imgclick.page';

const routes: Routes = [
  {
    path: '',
    component: ImgclickPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImgclickPageRoutingModule {}
