import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Reservation, User } from 'src/app/shared/models';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit, OnDestroy {

  reservations: Reservation[] = [];
  displayedColumns: string[] = ['date', 'space', 'phoneNumber', 'status'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  reservationsSub: Subscription;
  userSub: Subscription;
  
  constructor(
    private location: Location,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.apiService.loadReservations();
    this.reservationsSub = this.apiService.reservations$.subscribe((reservations: Reservation[]) => {
      if (reservations) {
        this.userSub = this.authService.user$.subscribe((user: User) => {
          if (user) {
            this.reservations = [];
            reservations.forEach(element => {
              if (element.pub == user.pubUid) {
                this.reservations.push(element);
              }
            });
            this.dataSource = new MatTableDataSource(this.reservations);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.reservationsSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  back() {
    this.location.back();
  }

  navigateToEditPage(uid) {
    this.router.navigateByUrl('/admin/reservations/' + uid);
  }
}