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
  timeCtrl = new FormControl('', Validators.required);
  stage: number = 1;
  activeTable = null;
  personalData: FormGroup;
  today = new Date();
  imageSrc0;
  imageSrc1;
  imageSrc2;
  tables;
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
      let serachingDate = this.date.transform(data, 'yyyy-LL-dd');
      this.reservations.forEach(e => {
        if (e.date == serachingDate) {
          this.tables.forEach(element => {
            if (e.table.number == element.number && e.table.persons == element.persons) {
              element.reserved = true;
            }
          });
        } else {
          this.tables.forEach(element => {
            element.reserved = false;
          });
        }
      });
    });
  }

  ngOnDestroy() {
    this.dateChanges.unsubscribe();
  }

  back() {
    this.location.back();
  }

  chooseTable(table) {
    if (!table.reserved) {
      this.activeTable = table;
    }
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
                                      this.timeCtrl.value,
                                      this.activeTable,
                                      this.personalData.controls.name.value,
                                      this.personalData.controls.email.value,
                                      this.personalData.controls.phoneNumber.value);
    this.dialog.open(InformationalDialogComponent, {
      disableClose: true,
      data: 'informational.dialog.reservation.send.success',
      panelClass: "error-dialog"
    });
    this.dateCtrl.setValue('');
    this.timeCtrl.setValue('');
    this.activeTable = null;
    this.personalData.setValue({
      name: '',
      email: '',
      phoneNumber: ''
    });
    this.stage = 1;
  }
}