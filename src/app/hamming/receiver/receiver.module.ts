import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiverPageRoutingModule } from './receiver-routing.module';

import { ReceiverPage } from './receiver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceiverPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ReceiverPage],
})
export class ReceiverPageModule {}
