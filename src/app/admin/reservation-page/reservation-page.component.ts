import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Pub, Reservation } from 'src/app/shared/models';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.scss']
})
export class ReservationPageComponent implements OnInit, OnDestroy {

  reservation: Reservation;
  pub: Pub;
  reservationSub: Subscription;
  pubSub: Subscription;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.apiService.loadReservations();
    this.reservationSub = this.apiService.reservations$.subscribe((reservations: Reservation[]) => {
      if (reservations) {
        reservations.forEach(element => {
          if (element.uid == this.route.snapshot.params['id']) {
            this.reservation = element;
            this.apiService.loadPub(element.pub);
          }
        });
      }
    });
    this.pubSub = this.apiService.pub$.subscribe((pub: Pub) => {
      if (pub) {
        this.pub = pub;
      }
    });
  }

  ngOnDestroy() {
    this.reservationSub.unsubscribe();
    this.pubSub.unsubscribe();
  }

  setDone(value) {
    this.apiService.editReservation(this.reservation, value);
    if (value == 'declined') {
      this.apiService.changeCurrentSpacePub(this.pub, this.pub.currentSpace + this.reservation.spaceNumber);
    }
    this.router.navigateByUrl('/admin/reservations');
  }
}