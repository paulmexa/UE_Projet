import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignalerPageRoutingModule } from './signaler-routing.module';

import { SignalerPage } from './signaler.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignalerPageRoutingModule
  ],
  declarations: [SignalerPage]
})
export class SignalerPageModule {}
