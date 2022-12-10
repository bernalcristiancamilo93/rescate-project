import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DigitalModulationPageRoutingModule } from './digital-modulation-routing.module';

import { DigitalModulationPage } from './digital-modulation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DigitalModulationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DigitalModulationPage]
})
export class DigitalModulationPageModule {}
