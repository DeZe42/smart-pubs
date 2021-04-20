import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'home' } },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule), data: { animation: 'auth' } },
  { path: 'pubs', loadChildren: () => import('./pubs/pubs.module').then(m=>m.PubsModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m=>m.AdminModule), canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
