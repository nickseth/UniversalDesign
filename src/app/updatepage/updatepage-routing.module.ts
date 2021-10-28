import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatepagePage } from './updatepage.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatepagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatepagePageRoutingModule {}
