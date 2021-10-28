import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccinformationPage } from './accinformation.page';

const routes: Routes = [
  {
    path: '',
    component: AccinformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccinformationPageRoutingModule {}
