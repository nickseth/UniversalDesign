import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopchartPage } from './topchart.page';

const routes: Routes = [
  {
    path: '',
    component: TopchartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopchartPageRoutingModule {}
