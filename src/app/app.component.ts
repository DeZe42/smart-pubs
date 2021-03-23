import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { slider } from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slider
  ]
})
export class AppComponent implements OnInit {

  currentLanguage;
  showFiller = false;
  loading: boolean = false;
  darkModeCtrl = new FormControl(false);
  isLoggedIn: Observable<any>;
  user;

  constructor(
    private translate: TranslateService,
    private overlay: OverlayContainer,
    public authService: AuthService,
    public router: Router
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
    translate.setDefaultLang('hu');
    translate.addLangs(['ro']);
    if (localStorage.getItem('language')) {
      this.translate.use(localStorage.getItem('language'));
    }
    if (localStorage.getItem('mode')) {
      this.className = localStorage.getItem('mode');
      if (this.className != '') {
        this.darkModeCtrl.setValue(true);
      }
    }
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit() {
    this.authService.user$.subscribe(data => {
      this.user = data;
    });
    this.translate.onLangChange.subscribe(data => {
      this.currentLanguage = data.lang;
    });
    if (localStorage.getItem('language')) {
      this.currentLanguage = localStorage.getItem('language');
    } else {
      this.currentLanguage = 'hu';
    }
    this.darkModeCtrl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'dark-mode';
      this.className = darkMode ? darkClassName : '';
      localStorage.setItem('mode', this.className);
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });
  }

  prepareRoute(routerOutlet: RouterOutlet): string {
    return routerOutlet && routerOutlet.activatedRouteData && routerOutlet.activatedRouteData[ 'animation' ];
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.currentLanguage = this.translate.currentLang;
    localStorage.setItem('language', this.currentLanguage);
  }

  signOut() {
    this.authService.signOut();
  }

  @HostBinding('class') className = '';
}