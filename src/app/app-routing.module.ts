import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'home' } },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule), data: { animation: 'auth' } },
  { path: 'pubs', loadChildren: () => import('./pubs/pubs.module').then(m=>m.PubsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
