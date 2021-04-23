import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  reservations = [];
  displayedColumns: string[] = ['date', 'space', 'phoneNumber', 'status'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private location: Location,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.apiService.loadReservations();
    this.apiService.reservations$.subscribe(data => {
      if (data) {
        this.authService.user$.subscribe(user => {
          if (user) {
            this.reservations = [];
            data.forEach(element => {
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

  back() {
    this.location.back();
  }

  navigateToEditPage(uid) {
    this.router.navigateByUrl('/admin/reservations/' + uid);
  }
}