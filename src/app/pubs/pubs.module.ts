import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PubsRoutingModule } from './pubs-routing.module';
import { PubsComponent } from './pubs/pubs.component';

@NgModule({
  declarations: [
      PubsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PubsRoutingModule,
    MaterialModule,
    TranslateModule.forChild()
  ]
})
export class PubsModule { }