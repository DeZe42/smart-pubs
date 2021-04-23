import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.scss']
})
export class ReservationPageComponent implements OnInit {

  reservation;
  pub;

  constructor(
    private location: Location,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.apiService.loadReservations();
    this.apiService.reservations$.subscribe(data => {
      if (data) {
        data.forEach(element => {
          if (element.uid == this.route.snapshot.params['id']) {
            this.reservation = element;
            this.apiService.loadPub(element.pub);
          }
        });
      }
    });
    this.apiService.pubs$.subscribe(data => {
      if (data) {
        this.pub = data;
      }
    });
  }

  back() {
    this.location.back();
  }

  setDone(value) {
    this.apiService.editReservation(this.reservation, value);
    if (value == 'declined') {
      this.apiService.changeCurrentSpacePub(this.pub, this.pub.currentSpace + this.reservation.spaceNumber);
    }
    this.router.navigateByUrl('/admin/reservations');
  }
}