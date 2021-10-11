import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvitefrdPage } from './invitefrd.page';

const routes: Routes = [
  {
    path: '',
    component: InvitefrdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitefrdPageRoutingModule {}
