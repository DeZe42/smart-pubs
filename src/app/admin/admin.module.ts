import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { CompanyComponent } from './company/company.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';

@NgModule({
  declarations: [
    AdminComponent,
    ProfileComponent,
    CompanyComponent,
    ReservationsComponent,
    ReservationPageComponent
],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MaterialModule,
    TranslateModule.forChild()
  ]
})
export class AdminModule { }