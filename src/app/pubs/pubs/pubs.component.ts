import { DatePipe, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { InformationalDialogComponent } from 'src/app/shared/dialogs/informational-dialog/informational-dialog.component';
import { Pub, Reservation, User } from 'src/app/shared/models';

@Component({
  selector: 'app-pubs',
  templateUrl: './pubs.component.html',
  styleUrls: ['./pubs.component.scss'],
  providers: [DatePipe]
})
export class PubsComponent implements OnInit, OnDestroy {

  pub: Pub;
  reservations: Reservation[] = [];
  reservationsToday: Reservation[] = [];
  dateCtrl = new FormControl('', Validators.required);
  hoursCtrl = new FormControl('', Validators.required);
  minutesCtrl = new FormControl('', Validators.required);
  personalData: FormGroup;
  numberOfDay: number;
  currentSpace: number = 0;
  hours = [];
  minutes = [];
  tables;
  stage: number = 1;
  activeTable = null;
  today = new Date();
  dateFilter;
  imageSrc0;
  imageSrc1;
  imageSrc2;
  pubsSub: Subscription;
  reservationsSub: Subscription;
  userSub: Subscription;
  dateChanges: Subscription;

  constructor(
    private location: Location,
    private apiService: ApiService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private date: DatePipe,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.personalData = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
    for (let index = 0; index < 24; index++) {
      if (index < 10) {
        this.hours.push('0' + index);
      } else {
        this.hours.push(index);
      }
    }
    for (let index = 0; index < 60; index++) {
      if (index < 10) {
        this.minutes.push('0' + index);
      } else {
        this.minutes.push(index);
      }
    }
    this.numberOfDay = new Date().getDay();
    this.apiService.loadPub(this.route.snapshot.params['id']);
    this.pubsSub = this.apiService.pub$.subscribe((data: Pub) => {
      if (data) {
        this.pub = data;
        this.tables = data.tables;
        this.imageSrc0 = data.imageSrc0;
        this.imageSrc1 = data.imageSrc1;
        this.imageSrc2 = data.imageSrc2;
      }
    });
    this.apiService.loadReservations();
    this.reservationsSub = this.apiService.reservations$.subscribe((reservations: Reservation[]) => {
      if (reservations) {
        this.reservationsToday = [];
        reservations.forEach(element => {
          if (element.pub == this.route.snapshot.params['id']) {
            this.reservations.push(element);
            if (element.date == this.date.transform(new Date(), 'yyyy-LL-dd')) {
              this.reservationsToday.push(element);
            }
          }
        });
        this.currentSpace = 0;
        this.reservationsToday.forEach(e => {
          if (e.status == 'accepted' || e.status == 'pending') {
            this.currentSpace += e.table.persons;
          }
        });
      }
    });
    this.userSub = this.authService.user$.subscribe((user: User) => {
      if (user) {
        this.personalData.setValue({
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber
        });
      }
    });
    this.dateChanges = this.dateCtrl.valueChanges.subscribe(data => {
      if (data) {
        this.hours = [];
        if (data.getDay() == 1) {
          for (let index = Number(this.pub.startingHourMonday.slice(0, 2)); index < Number(this.pub.endingHourMonday.slice(0, 2)); index++) {
            if (index < 10) {
              this.hours.push('0' + index);
            } else {
              this.hours.push(index);
            }
          }
        } else if (data.getDay() == 2) {
          for (let index = Number(this.pub.startingHourTuesday.slice(0, 2)); index < Number(this.pub.endingHourTuesday.slice(0, 2)); index++) {
            if (index < 10) {
              this.hours.push('0' + index);
            } else {
              this.hours.push(index);
            }
          }
        } else if (data.getDay() == 3) {
          for (let index = Number(this.pub.startingHourWednesday.slice(0, 2)); index < Number(this.pub.endingHourWednesday.slice(0, 2)); index++) {
            if (index < 10) {
              this.hours.push('0' + index);
            } else {
              this.hours.push(index);
            }
          }
        } else if (data.getDay() == 4) {
          for (let index = Number(this.pub.startingHourThursday.slice(0, 2)); index < Number(this.pub.endingHourThursday.slice(0, 2)); index++) {
            if (index < 10) {
              this.hours.push('0' + index);
            } else {
              this.hours.push(index);
            }
          }
        } else if (data.getDay() == 5) {
          for (let index = Number(this.pub.startingHourFriday.slice(0, 2)); index < Number(this.pub.endingHourFriday.slice(0, 2)); index++) {
            if (index < 10) {
              this.hours.push('0' + index);
            } else {
              this.hours.push(index);
            }
          }
        } else if (data.getDay() == 6) {
          for (let index = Number(this.pub.startingHourSaturday.slice(0, 2)); index < Number(this.pub.endingHourSaturday.slice(0, 2)); index++) {
            if (index < 10) {
              this.hours.push('0' + index);
            } else {
              this.hours.push(index);
            }
          }
        } else if (data.getDay() == 0) {
          for (let index = Number(this.pub.startingHourSunday.slice(0, 2)); index < Number(this.pub.endingHourSunday.slice(0, 2)); index++) {
            if (index < 10) {
              this.hours.push('0' + index);
            } else {
              this.hours.push(index);
            }
          }
        }
        let serachingDate = this.date.transform(data, 'yyyy-LL-dd');
        this.reservations.forEach(e => {
          if (e.date == serachingDate) {
            this.tables.forEach(element => {
              if (e.table.id == element.id && e.table.persons == element.persons && (e.status == 'accepted' || e.status == 'pending')) {
                element.reserved = true;
              }
            });
          } else {
            this.tables.forEach(element => {
              element.reserved = false;
            });
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.pubsSub.unsubscribe();
    this.reservationsSub.unsubscribe();
    this.userSub.unsubscribe();
    this.dateChanges.unsubscribe();
  }

  back() {
    this.location.back();
  }

  getOpenState(pub: Pub) {
    if (pub) {
      if (this.numberOfDay == 1) {
        return pub.openStateMonday;
      } else if (this.numberOfDay == 2) {
        return pub.openStateTuesday;
      } else if (this.numberOfDay == 3) {
        return pub.openStateWednesday;
      } else if (this.numberOfDay == 4) {
        return pub.openStateThursday;
      } else if (this.numberOfDay == 5) {
        return pub.openStateFriday;
      } else if (this.numberOfDay == 6) {
        return pub.openStateSaturday;
      } else if (this.numberOfDay == 0) {
        return pub.openStateSunday;
      }
    }
  }

  previousPicture() {
    let first = this.imageSrc2;
    this.imageSrc2 = this.imageSrc1;
    this.imageSrc1 = this.imageSrc0;
    this.imageSrc0 = first;
  }

  nextPicture() {
    let first = this.imageSrc0;
    this.imageSrc0 = this.imageSrc1;
    this.imageSrc1 = this.imageSrc2;
    this.imageSrc2 = first;
  }

  disableDays = (d: Date): boolean => {
    if (this.pub && d != null) {
      let closeMonday = null;
      let closeTuesDay = null;
      let closeWednesDay = null;
      let closeThursDay = null;
      let closeFridayDay = null;
      let closeSaturDay = null;
      let closeSunDay = null;
      if (!this.pub.openStateMonday) {
        closeMonday = 1;
      }
      if (!this.pub.openStateTuesday) {
        closeTuesDay = 2;
      }
      if (!this.pub.openStateWednesday) {
        closeWednesDay = 3;
      }
      if (!this.pub.openStateThursday) {
        closeThursDay = 4;
      }
      if (!this.pub.openStateFriday) {
        closeFridayDay = 5;
      }
      if (!this.pub.startingHourSaturday) {
        closeSaturDay = 6;
      }
      if (!this.pub.openStateSunday) {
        closeSunDay = 0;
      }
      return d.getDay() !== closeMonday && d.getDay() !== closeTuesDay && d.getDay() !== closeWednesDay && d.getDay() !== closeThursDay && d.getDay() !== closeFridayDay && d.getDay() !== closeSaturDay && d.getDay() !== closeSunDay;
    }
  }

  chooseTable(table) {
    if (!table.reserved) {
      this.activeTable = table;
    }
  }

  justNumbers(x) {
    if (x.data >= '0' && x.data <= '9') {
      this.personalData.controls.phoneNumber.setValue(x.target.value);
    } else {
      this.personalData.controls.phoneNumber.setValue(this.personalData.controls.phoneNumber.value.slice(0, -1));
    }
  }

  reservate() {
    this.apiService.createReservation(this.pub.uid,
                                      this.pub.companyName,
                                      this.date.transform(this.dateCtrl.value, 'yyyy-LL-dd'),
                                      this.hoursCtrl.value + ':' + this.minutesCtrl.value,
                                      this.activeTable,
                                      this.personalData.controls.name.value,
                                      this.personalData.controls.email.value,
                                      this.personalData.controls.phoneNumber.value);
    this.dialog.open(InformationalDialogComponent, {
      disableClose: true,
      data: 'informational.dialog.reservation.send.success',
      panelClass: "error-dialog"
    });
    this.dateCtrl.reset();
    this.hoursCtrl.reset();
    this.minutesCtrl.reset();
    this.activeTable = null;
    this.personalData.setValue({
      name: '',
      email: '',
      phoneNumber: ''
    });
    this.stage = 1;
    this.apiService.loadPub(this.route.snapshot.params['id']);
  }
}