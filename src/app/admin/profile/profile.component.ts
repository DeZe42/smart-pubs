import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { EMAIL_REGEX, PHONE_REGEX } from 'src/app/auth/utils';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  profileForm: FormGroup;
  user;
  userSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private authServvice: AuthService
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: [{value: '', disabled: true}, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(PHONE_REGEX)]]
    });
    this.userSub = this.authServvice.user$.subscribe((user: User) => {
      if (user) {
        this.user = user;
        this.profileForm.setValue({
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber
        });
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  justNumbers(x) {
    if (x.data >= '0' && x.data <= '9') {
      this.profileForm.controls.phoneNumber.setValue(x.target.value);
    } else {
      this.profileForm.controls.phoneNumber.setValue(this.profileForm.controls.phoneNumber.value.slice(0, -1));
    }
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