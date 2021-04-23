import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CompanyComponent } from './company/company.component';
import { ProfileComponent } from './profile/profile.component';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { ReservationsComponent } from './reservations/reservations.component';

const routes: Routes = [
    { path: '', component: AdminComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'company', component: CompanyComponent },
    { path: 'reservations', component: ReservationsComponent },
    { path: 'reservations/:id', component: ReservationPageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }