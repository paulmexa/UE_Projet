import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApercuObjetPageRoutingModule } from './apercu-objet-routing.module';

import { ApercuObjetPage } from './apercu-objet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApercuObjetPageRoutingModule
  ],
  declarations: [ApercuObjetPage]
})
export class ApercuObjetPageModule {}
