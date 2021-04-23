import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Pub } from 'src/app/shared/models';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  pub: Pub;
  editForm: FormGroup;
  imgURL1;
  imgURL2;
  imgURL3;
  imageList = [];

  constructor(
    private location: Location,
    private authService: AuthService,
    private apiService: ApiService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      companyName: ['', Validators.required],
      twoPerson: ['', Validators.required],
      fourPerson: ['', Validators.required],
      description: ['', Validators.required],
      openStateMonday: [true, Validators.required],
      openStateTuesday: [true, Validators.required],
      openStateWednesday: [true, Validators.required],
      openStateThursday: [true, Validators.required],
      openStateFriday: [true, Validators.required],
      openStateSaturday: [true, Validators.required],
      openStateSunday: [true, Validators.required],
      startingHourMonday: ['', Validators.required],
      endingHourMonday: ['', Validators.required],
      startingHourTuesday: ['', Validators.required],
      endingHourTuesday: ['', Validators.required],
      startingHourWednesday: ['', Validators.required],
      endingHourWednesday: ['', Validators.required],
      startingHourThursday: ['', Validators.required],
      endingHourThursday: ['', Validators.required],
      startingHourFriday: ['', Validators.required],
      endingHourFriday: ['', Validators.required],
      startingHourSaturday: ['', Validators.required],
      endingHourSaturday: ['', Validators.required],
      startingHourSunday: ['', Validators.required],
      endingHourSunday: ['', Validators.required],
      country: ['', Validators.required],
      contry: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.authService.user$.subscribe(user => {
      if (user) {
        this.apiService.loadPub(user.pubUid);
      }
    });
    this.apiService.pubs$.subscribe(data => {
      if (data) {
        this.pub = data;
        this.imgURL1 = data.imageSrc0;
        this.imgURL2 = data.imageSrc1;
        this.imgURL3 = data.imageSrc2;
        if (data.length == undefined) {
          this.editForm.setValue({
            companyName: data.companyName,
            twoPerson: data.twoPerson,
            fourPerson: data.fourPerson,
            description: data.description,
            openStateMonday: data.openStateMonday,
            openStateTuesday: data.openStateTuesday,
            openStateWednesday: data.openStateWednesday,
            openStateThursday: data.openStateThursday,
            openStateFriday: data.openStateFriday,
            openStateSaturday: data.openStateSaturday,
            openStateSunday: data.openStateSunday,
            startingHourMonday: data.startingHourMonday,
            endingHourMonday: data.endingHourMonday,
            startingHourTuesday: data.startingHourTuesday,
            endingHourTuesday: data.endingHourTuesday,
            startingHourWednesday: data.startingHourWednesday,
            endingHourWednesday: data.endingHourWednesday,
            startingHourThursday: data.startingHourThursday,
            endingHourThursday: data.endingHourThursday,
            startingHourFriday: data.startingHourFriday,
            endingHourFriday: data.endingHourFriday,
            startingHourSaturday: data.startingHourSaturday,
            endingHourSaturday: data.endingHourSaturday,
            startingHourSunday: data.startingHourSunday,
            endingHourSunday: data.endingHourSunday,
            country: data.country,
            contry: data.contry,
            city: data.city,
            address: data.address
          });
        }
      }
    });
  }

  preview(files, number) {
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    this.imageList.push(files)
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      if (number == 1) this.imgURL1 = reader.result;
      if (number == 2) this.imgURL2 = reader.result;
      if (number == 3) this.imgURL3 = reader.result;
    }
  }

  disableTimeInput(type: string) {
    let startHour = 'startingHour' + type;
    let endHour = 'endingHour' + type;
    let toggle = 'openState' + type;
    if (this.editForm.controls[toggle].value) {
      this.editForm.controls[startHour].enable();
      this.editForm.controls[endHour].enable();
      this.editForm.controls[startHour].setValidators(Validators.required);
      this.editForm.controls[endHour].setValidators(Validators.required);
    } else {
      this.editForm.controls[startHour].disable();
      this.editForm.controls[endHour].disable();
      this.editForm.controls[startHour].clearValidators();
      this.editForm.controls[endHour].clearValidators();
    }
  }

  back() {
    this.location.back();
  }

  isOldData() {
    if (this.pub) {
      if (this.editForm.controls.companyName.value == this.pub.companyName &&
          this.editForm.controls.twoPerson.value == this.pub.twoPerson &&
          this.editForm.controls.fourPerson.value == this.pub.fourPerson &&
          this.editForm.controls.description.value == this.pub.description &&
          this.editForm.controls.openStateMonday.value == this.pub.openStateMonday &&
          this.editForm.controls.openStateTuesday.value == this.pub.openStateTuesday &&
          this.editForm.controls.openStateWednesday.value == this.pub.openStateWednesday &&
          this.editForm.controls.openStateThursday.value == this.pub.openStateThursday &&
          this.editForm.controls.openStateFriday.value == this.pub.openStateFriday &&
          this.editForm.controls.openStateSaturday.value == this.pub.openStateSaturday &&
          this.editForm.controls.openStateSunday.value == this.pub.openStateSunday &&
          this.editForm.controls.startingHourMonday.value == this.pub.startingHourMonday &&
          this.editForm.controls.endingHourMonday.value == this.pub.endingHourMonday &&
          this.editForm.controls.startingHourTuesday.value == this.pub.startingHourTuesday &&
          this.editForm.controls.endingHourTuesday.value == this.pub.endingHourTuesday &&
          this.editForm.controls.startingHourWednesday.value == this.pub.startingHourWednesday &&
          this.editForm.controls.endingHourWednesday.value == this.pub.endingHourWednesday &&
          this.editForm.controls.startingHourThursday.value == this.pub.startingHourThursday &&
          this.editForm.controls.endingHourThursday.value == this.pub.endingHourThursday &&
          this.editForm.controls.startingHourFriday.value == this.pub.startingHourFriday &&
          this.editForm.controls.endingHourFriday.value == this.pub.endingHourFriday &&
          this.editForm.controls.startingHourSaturday.value == this.pub.startingHourSaturday &&
          this.editForm.controls.endingHourSaturday.value == this.pub.endingHourSaturday &&
          this.editForm.controls.startingHourSunday.value == this.pub.startingHourSunday &&
          this.editForm.controls.endingHourSunday.value == this.pub.endingHourSunday &&
          this.editForm.controls.country.value == this.pub.country &&
          this.editForm.controls.contry.value == this.pub.contry &&
          this.editForm.controls.city.value == this.pub.city &&
          this.editForm.controls.address.value == this.pub.address) {
        return true;
      } else {
        return false;
      }
    }
  }

  cancel() {
    this.editForm.setValue({
      companyName: this.pub.companyName,
      twoPerson: this.pub.twoPerson,
      fourPerson: this.pub.fourPerson,
      description: this.pub.description,
      openStateMonday: this.pub.openStateMonday,
      openStateTuesday: this.pub.openStateTuesday,
      openStateWednesday: this.pub.openStateWednesday,
      openStateThursday: this.pub.openStateThursday,
      openStateFriday: this.pub.openStateFriday,
      openStateSaturday: this.pub.openStateSaturday,
      openStateSunday: this.pub.openStateSunday,
      startingHourMonday: this.pub.startingHourMonday,
      endingHourMonday: this.pub.endingHourMonday,
      startingHourTuesday: this.pub.startingHourTuesday,
      endingHourTuesday: this.pub.endingHourTuesday,
      startingHourWednesday: this.pub.startingHourWednesday,
      endingHourWednesday: this.pub.endingHourWednesday,
      startingHourThursday: this.pub.startingHourThursday,
      endingHourThursday: this.pub.endingHourThursday,
      startingHourFriday: this.pub.startingHourFriday,
      endingHourFriday: this.pub.endingHourFriday,
      startingHourSaturday: this.pub.startingHourSaturday,
      endingHourSaturday: this.pub.endingHourSaturday,
      startingHourSunday: this.pub.startingHourSunday,
      endingHourSunday: this.pub.endingHourSunday,
      country: this.pub.country,
      contry: this.pub.contry,
      city: this.pub.city,
      address: this.pub.address
    });
  }

  edit() {
    let pub = {
      uid: this.pub.uid,
      companyName: this.editForm.controls.companyName.value,
      country: this.editForm.controls.country.value,
      contry: this.editForm.controls.contry.value,
      city: this.editForm.controls.city.value,
      address: this.editForm.controls.address.value,
      description: this.editForm.controls.description.value,
      twoPerson: this.editForm.controls.twoPerson.value,
      fourPerson: this.editForm.controls.fourPerson.value,
      space: this.editForm.controls.twoPerson.value * 2 + this.editForm.controls.fourPerson.value * 4,
      openStateMonday: this.editForm.controls.openStateMonday.value,
      openStateTuesday: this.editForm.controls.openStateTuesday.value,
      openStateWednesday: this.editForm.controls.openStateWednesday.value,
      openStateThursday: this.editForm.controls.openStateThursday.value,
      openStateFriday: this.editForm.controls.openStateFriday.value,
      openStateSaturday: this.editForm.controls.openStateSaturday.value,
      openStateSunday: this.editForm.controls.openStateSunday.value,
      startingHourMonday: this.editForm.controls.startingHourMonday.value,
      endingHourMonday: this.editForm.controls.endingHourMonday.value,
      startingHourTuesday: this.editForm.controls.startingHourTuesday.value,
      endingHourTuesday: this.editForm.controls.endingHourTuesday.value,
      startingHourWednesday: this.editForm.controls.startingHourWednesday.value,
      endingHourWednesday: this.editForm.controls.endingHourWednesday.value,
      startingHourThursday: this.editForm.controls.startingHourThursday.value,
      endingHourThursday: this.editForm.controls.endingHourThursday.value,
      startingHourFriday: this.editForm.controls.startingHourFriday.value,
      endingHourFriday: this.editForm.controls.endingHourFriday.value,
      startingHourSaturday: this.editForm.controls.startingHourSaturday.value,
      endingHourSaturday: this.editForm.controls.endingHourSaturday.value,
      startingHourSunday: this.editForm.controls.startingHourSunday.value,
      endingHourSunday: this.editForm.controls.endingHourSunday.value
    }
    this.apiService.editPub(pub);
    this.apiService.loadPub(this.pub.uid);
    this.openSnackBar();
  }

  openSnackBar() {
    this.translate.get('admin.company.save.success').subscribe(data => {
      this.snackBar.open(data, '', { horizontalPosition: 'start', verticalPosition: 'bottom', duration: 5000 });
    });
  }
}