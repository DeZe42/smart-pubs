import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { EMAIL_REGEX, PHONE_REGEX } from 'src/app/auth/utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  user;

  constructor(
    private fb: FormBuilder,
    private authServvice: AuthService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: [{value: '', disabled: true}, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(PHONE_REGEX)]]
    });
    this.authServvice.user$.subscribe(data => {
      if (data) {
        this.user = data;
        this.profileForm.setValue({
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber
        });
      }
    });
  }

  isOldData() {
    if (this.user) {
      if (this.user.name == this.profileForm.controls.name.value && this.user.phoneNumber == this.profileForm.controls.phoneNumber.value) {
        return true;
      } else {
        return false;
      }
    }
  }

  back() {
    this.location.back();
  }

  cancel() {
    this.profileForm.setValue({
      name: this.user.name,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber
    });
  }

  edit() {
    this.authServvice.editUserData(this.user, this.profileForm.controls.name.value, this.profileForm.controls.phoneNumber.value);
  }
}