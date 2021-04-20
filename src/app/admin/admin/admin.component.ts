import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Pub } from 'src/app/shared/models';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  editForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      companyName: ['', Validators.required],
      country: ['', Validators.required],
      contry: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required],
      twoPerson: ['', Validators.required],
      fourPerson: ['', Validators.required],
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
      endingHourSunday: ['', Validators.required]
    });
  }

  edit() {
    let pub = {
      companyName: this.editForm.controls.companyName.value,
      country: this.editForm.controls.country.value,
      contry: this.editForm.controls.contry.value,
      city: this.editForm.controls.city.value,
      address: this.editForm.controls.address.value,
      description: this.editForm.controls.description.value,
      twoPerson: this.editForm.controls.twoPerson.value,
      fourPerson: this.editForm.controls.fourPerson.value,
      space: this.editForm.controls.twoPerson.value * 2 + this.editForm.controls.fourPerson.value * 4,
      currentSpace: 0,
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
  }
}