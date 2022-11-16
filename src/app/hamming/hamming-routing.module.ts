import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HammingPage } from './hamming.page';

const routes: Routes = [
  {
    path: '',
    component: HammingPage
  },
  {
    path: 'transmitter',
    loadChildren: () => import('./transmitter/transmitter.module').then( m => m.TransmitterPageModule)
  },
  {
    path: 'receiver',
    loadChildren: () => import('./receiver/receiver.module').then( m => m.ReceiverPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HammingPageRoutingModule {}
