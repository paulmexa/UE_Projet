import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { RedirectGuardService } from './services/redirect-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'presentation',
    canActivate: [RedirectGuardService],
    loadChildren: () => import('./presentation/presentation.module').then( m => m.PresentationPageModule)
  },
  {
    path: 'login',
    canActivate: [RedirectGuardService],
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    canActivate: [RedirectGuardService],
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'signaler',
    loadChildren: () => import('./signaler/signaler.module').then( m => m.SignalerPageModule)
  },
  {
    path: 'save/:TypeOperation',
    loadChildren: () => import('./save/save.module').then(m => m.SavePageModule)
  },
  {
    path: 'mes-objets',
    loadChildren: () => import('./mes-objets/mes-objets.module').then( m => m.MesObjetsPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'apercu-objet',
    loadChildren: () => import('./composants/item-objet/apercu-objet/apercu-objet.module').then( m => m.ApercuObjetPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
