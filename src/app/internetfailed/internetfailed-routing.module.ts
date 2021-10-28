import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InternetfailedPage } from './internetfailed.page';

const routes: Routes = [
  {
    path: '',
    component: InternetfailedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternetfailedPageRoutingModule {}
