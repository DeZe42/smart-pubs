import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
  }

  canActivate(
    next?: ActivatedRouteSnapshot,
    state?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.afAuth.user.pipe(
            map(user => {
                if(user != null) {
                    this.router.navigateByUrl("/");
                    return false;
                } else {
                    return true;
                }
            })
        );
  }
}