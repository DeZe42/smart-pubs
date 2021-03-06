import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  currentLanguage;
  showFiller = false;
  loading: boolean = false;
  darkModeCtrl = new FormControl(false);
  isLoggedIn: Observable<any>;
  user;
  userSub: Subscription;
  darkModeSub: Subscription;

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
        this.overlay.getContainerElement().classList.add('dark-mode');
      } else {
        this.darkModeCtrl.setValue(false);
        this.overlay.getContainerElement().classList.remove('');
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
    this.userSub = this.authService.user$.subscribe(data => {
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
    this.darkModeSub = this.darkModeCtrl.valueChanges.subscribe((darkMode) => {
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

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.darkModeSub.unsubscribe();
  }

  isHome() {
    if (this.router.url == '/' || this.router.url.startsWith('/pubs')) {
      return true
    }
    return false;
  }

  onActivate(event) {
    document.getElementById('content').scrollTo(0, 0);
  }

  prepareRoute(routerOutlet: RouterOutlet): string {
    return routerOutlet && routerOutlet.activatedRouteData && routerOutlet.activatedRouteData[ 'animation' ];
  }

  useLanguagePanel(language: string, panel) {
    panel.close();
    this.translate.use(language);
    this.currentLanguage = this.translate.currentLang;
    localStorage.setItem('language', language);
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.currentLanguage = this.translate.currentLang;
    localStorage.setItem('language', language);
  }

  signOut() {
    this.authService.signOut();
    this.router.navigateByUrl('/');
  }

  @HostBinding('class') className = '';
}