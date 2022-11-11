import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HammingPage } from './hamming.page';

const routes: Routes = [
  {
    path: '',
    component: HammingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HammingPageRoutingModule {}
