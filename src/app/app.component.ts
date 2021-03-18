import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smart-pubs';
  showFiller = false;

  constructor(
    private translate: TranslateService,
    private authService: AuthService
    ) {
    translate.setDefaultLang('hu');
  }

  signOut() {
    this.authService.signOut();
  }
}