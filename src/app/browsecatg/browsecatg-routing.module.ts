import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrowsecatgPage } from './browsecatg.page';

const routes: Routes = [
  {
    path: '',
    component: BrowsecatgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrowsecatgPageRoutingModule {}
