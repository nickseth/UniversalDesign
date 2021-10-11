import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterpagePage } from './filterpage.page';

const routes: Routes = [
  {
    path: '',
    component: FilterpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterpagePageRoutingModule {}
