import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransmitterPage } from './transmitter.page';

const routes: Routes = [
  {
    path: '',
    component: TransmitterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransmitterPageRoutingModule {}
