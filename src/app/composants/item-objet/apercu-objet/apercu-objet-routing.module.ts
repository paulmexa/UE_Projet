import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApercuObjetPage } from './apercu-objet.page';

const routes: Routes = [
  {
    path: '',
    component: ApercuObjetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApercuObjetPageRoutingModule {}
