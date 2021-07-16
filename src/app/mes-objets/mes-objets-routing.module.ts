import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesObjetsPage } from './mes-objets.page';

const routes: Routes = [
  {
    path: '',
    component: MesObjetsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesObjetsPageRoutingModule {}
