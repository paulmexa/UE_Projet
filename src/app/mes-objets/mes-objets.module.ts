import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesObjetsPageRoutingModule } from './mes-objets-routing.module';

import { MesObjetsPage } from './mes-objets.page';
import {ItemObjetComponent} from "../composants/item-objet/item-objet.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesObjetsPageRoutingModule
  ],
  declarations: [MesObjetsPage, ItemObjetComponent]
})
export class MesObjetsPageModule {}
