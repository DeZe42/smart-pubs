import { DatePipe, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { InformationalDialogComponent } from 'src/app/shared/dialogs/informational-dialog/informational-dialog.component';
import { Pub, Reservation } from 'src/app/shared/models';

@Component({
  selector: 'app-pubs',
  templateUrl: './pubs.component.html',
  styleUrls: ['./pubs.component.scss'],
  providers: [DatePipe]
})
export class PubsComponent implements OnInit, OnDestroy {

  pub: Pub;
  reservations: Reservation[];
  numberOfDay: number = 0;
  dateCtrl = new FormControl('', Validators.required);
  hoursCtrl = new FormControl('', Validators.required);
  minutesCtrl = new FormControl('', Validators.required);
  stage: number = 1;
  activeTable = null;
  personalData: FormGroup;
  today = new Date();
  imageSrc0;
  imageSrc1;
  imageSrc2;
  tables;
  minutes = [];
  hours = [];
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
    this.apiService.pubs$.subscribe((data: Pub) => {
      if (data) {
        this.pub = data;
        this.tables = data.tables;
        this.imageSrc0 = data.imageSrc0;
        this.imageSrc1 = data.imageSrc1;
        this.imageSrc2 = data.imageSrc2;
      }
    });
    this.apiService.loadReservations();
    this.apiService.reservations$.subscribe(data => {
      if (data) {
        this.reservations = data;
      }
    });
    this.authService.user$.subscribe(data => {
      if (data) {
        this.personalData.setValue({
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber
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
        } else if (data.getDay() == 7) {
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
    this.dateChanges.unsubscribe();
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
      } else if (this.numberOfDay == 7) {
        return pub.openStateSunday;
      }
    }
  }

  back() {
    this.location.back();
  }

  chooseTable(table) {
    if (!table.reserved) {
      this.activeTable = table;
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

  reservate() {
    this.apiService.createReservation(this.pub.uid,
                                      this.pub.companyName,
                                      this.date.transform(this.dateCtrl.value, 'yyyy-LL-dd'),
                                      this.hoursCtrl.value + ':' + this.minutesCtrl.value,
                                      this.activeTable,
                                      this.personalData.controls.name.value,
                                      this.personalData.controls.email.value,
                                      this.personalData.controls.phoneNumber.value);
    this.apiService.changeCurrentSpacePub(this.pub, this.pub.currentSpace - this.activeTable.persons)
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