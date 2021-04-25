import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomeComponent } from './home/home.component';
import { ApiService } from './api.service';
import { SafePipe } from './shared/safe.pipe';
import { ErrorDialogComponent } from './shared/dialogs/error-dialog/error-dialog.component';
import { InformationalDialogComponent } from './shared/dialogs/informational-dialog/informational-dialog.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AuthService } from './auth/auth.service';
import { AdminGuardService } from './admin/admin-guard.service';
import { AuthGuardService } from './auth/auth-guard.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorDialogComponent,
    InformationalDialogComponent,
    SafePipe
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    TranslateModule.forRoot({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
    })
  ],
  providers: [
    AuthService,
    ApiService,
    AuthGuardService,
    AdminGuardService
    // { provide: LOCALE_ID, useValue: 'hu-HU'}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('dark-mode');
  }
}
