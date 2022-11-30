import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LineCodesPageRoutingModule } from './line-codes-routing.module';

import { LineCodesPage } from './line-codes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LineCodesPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [LineCodesPage],
})
export class LineCodesPageModule {}
