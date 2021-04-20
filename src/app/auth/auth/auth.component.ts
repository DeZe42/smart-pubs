import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { fader } from 'src/app/route-animations';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    fader
  ]
})
export class AuthComponent implements OnInit {

  constructor(
    public router: Router,
    private location: Location,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  prepareRoute(routerOutlet: RouterOutlet): string {
    return routerOutlet && routerOutlet.activatedRouteData && routerOutlet.activatedRouteData[ 'animation' ];
  }

  back() {
    this.location.back();
  }
}