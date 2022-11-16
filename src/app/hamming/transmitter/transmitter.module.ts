import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransmitterPageRoutingModule } from './transmitter-routing.module';

import { TransmitterPage } from './transmitter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransmitterPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [TransmitterPage],
})
export class TransmitterPageModule {}
