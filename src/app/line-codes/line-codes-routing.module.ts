import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LineCodesPage } from './line-codes.page';

const routes: Routes = [
  {
    path: '',
    component: LineCodesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LineCodesPageRoutingModule {}
