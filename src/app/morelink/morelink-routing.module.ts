import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MorelinkPage } from './morelink.page';

const routes: Routes = [
  {
    path: '',
    component: MorelinkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MorelinkPageRoutingModule {}
