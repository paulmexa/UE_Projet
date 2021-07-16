import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignalerPage } from './signaler.page';

const routes: Routes = [
  {
    path: '',
    component: SignalerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignalerPageRoutingModule {}
