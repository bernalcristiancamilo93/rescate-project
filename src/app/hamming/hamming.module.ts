import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HammingPageRoutingModule } from './hamming-routing.module';

import { HammingPage } from './hamming.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HammingPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [HammingPage]
})
export class HammingPageModule {}
