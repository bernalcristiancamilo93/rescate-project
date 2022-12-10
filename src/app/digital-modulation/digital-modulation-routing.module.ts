import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DigitalModulationPage } from './digital-modulation.page';

const routes: Routes = [
  {
    path: '',
    component: DigitalModulationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DigitalModulationPageRoutingModule {}
