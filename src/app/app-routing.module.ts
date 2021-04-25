import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from './admin/admin-guard.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'home' } },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule), data: { animation: 'auth' }, canActivate: [AuthGuardService] },
  { path: 'pubs', loadChildren: () => import('./pubs/pubs.module').then(m=>m.PubsModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m=>m.AdminModule), canActivate: [AdminGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
