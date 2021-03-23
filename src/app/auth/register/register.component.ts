import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from '../auth.service';
import { EMAIL_REGEX, UPPER_CASE_REGEX, LOWER_CASE_REGEX, PHONE_REGEX } from '../utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  password: boolean = true;
  passwordAgain: boolean = true;
  imgURL1;
  imgURL2;
  imgURL3;
  imageList = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(PHONE_REGEX)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.upperAndLowerCases,
        this.hasNumber
      ]],
      passwordAgain: ['', [
        Validators.required,
        Validators.minLength(8),
        this.upperAndLowerCases,
        this.hasNumber
      ]],
      companyName: ['', Validators.required],
      country: ['', Validators.required],
      contry: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required],
      space: ['', Validators.required],
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
    }, {validators: [
      this.isEqual()
    ]});
  }

  register() {
    if (this.router.url == '/auth/private_register') {
      this.authService.signUp(
        this.registerForm.controls.email.value,
        this.registerForm.controls.password.value,
        this.registerForm.controls.name.value,
        this.registerForm.controls.phoneNumber.value
      );
    } else if (this.router.url == '/auth/legal_register') {
      let pub = {
        companyName: this.registerForm.controls.companyName.value,
        country: this.registerForm.controls.country.value,
        contry: this.registerForm.controls.contry.value,
        city: this.registerForm.controls.city.value,
        address: this.registerForm.controls.address.value,
        space: this.registerForm.controls.space.value,
        description: this.registerForm.controls.description.value,
        openStateMonday: this.registerForm.controls.openStateMonday.value,
        openStateTuesday: this.registerForm.controls.openStateTuesday.value,
        openStateWednesday: this.registerForm.controls.openStateWednesday.value,
        openStateThursday: this.registerForm.controls.openStateThursday.value,
        openStateFriday: this.registerForm.controls.openStateFriday.value,
        openStateSaturday: this.registerForm.controls.openStateSaturday.value,
        openStateSunday: this.registerForm.controls.openStateSunday.value,
        startingHourMonday: this.registerForm.controls.startingHourMonday.value,
        endingHourMonday: this.registerForm.controls.endingHourMonday.value,
        startingHourTuesday: this.registerForm.controls.startingHourTuesday.value,
        endingHourTuesday: this.registerForm.controls.endingHourTuesday.value,
        startingHourWednesday: this.registerForm.controls.startingHourWednesday.value,
        endingHourWednesday: this.registerForm.controls.endingHourWednesday.value,
        startingHourThursday: this.registerForm.controls.startingHourThursday.value,
        endingHourThursday: this.registerForm.controls.endingHourThursday.value,
        startingHourFriday: this.registerForm.controls.startingHourFriday.value,
        endingHourFriday: this.registerForm.controls.endingHourFriday.value,
        startingHourSaturday: this.registerForm.controls.startingHourSaturday.value,
        endingHourSaturday: this.registerForm.controls.endingHourSaturday.value,
        startingHourSunday: this.registerForm.controls.startingHourSunday.value,
        endingHourSunday: this.registerForm.controls.endingHourSunday.value
      }
      this.authService.signUpWithCompany(
        this.registerForm.controls.email.value,
        this.registerForm.controls.password.value,
        this.registerForm.controls.name.value,
        this.registerForm.controls.phoneNumber.value,
        this.imageList,
        pub
      );
    }
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

  disableButton() {
    if (this.router.url == '/auth/private_register') {
      if (
        this.registerForm.controls.name.invalid ||
        this.registerForm.controls.email.invalid ||
        this.registerForm.controls.phoneNumber.invalid ||
        this.registerForm.controls.password.invalid ||
        this.registerForm.controls.passwordAgain.invalid
      ) {
        return true;
      } else {
        return false;
      }
    } else if (this.router.url == '/auth/legal_register') {
      if (this.registerForm.invalid) {
        return true;
      } else {
        return false;
      }
    }
  }

  disableTimeInput(type: string) {
    let startHour = 'startingHour' + type;
    let endHour = 'endingHour' + type;
    let toggle = 'openState' + type;
    if (this.registerForm.controls[toggle].value) {
      this.registerForm.controls[startHour].enable();
      this.registerForm.controls[endHour].enable();
      this.registerForm.controls[startHour].setValidators(Validators.required);
      this.registerForm.controls[endHour].setValidators(Validators.required);
    } else {
      this.registerForm.controls[startHour].disable();
      this.registerForm.controls[endHour].disable();
      this.registerForm.controls[startHour].clearValidators();
      this.registerForm.controls[endHour].clearValidators();
    }
  }

  justNumbers(x) {
    if (x.data >= '0' && x.data <= '9') {
      this.registerForm.controls.phoneNumber.setValue(x.target.value);
    } else {
      this.registerForm.controls.phoneNumber.setValue(this.registerForm.controls.phoneNumber.value.slice(0, -1));
    }
  }

  upperAndLowerCases(control: AbstractControl): ValidationErrors {
    if (!control.value.match(UPPER_CASE_REGEX) || !control.value.match(LOWER_CASE_REGEX)) {
      return { hasCase : true};
    }
    return null;
  }

  hasNumber(control: AbstractControl): ValidationErrors {
    if (!control.value.match(/\d+/)) {
      return { hasNumber: true };
    }
    return null;
  }

  isEqual(): ValidatorFn {
    return (group: FormGroup): {[key: string]: any} => {
    const password = group.get('password').value;
    const secondPassword = group.get('passwordAgain').value;
    if (password != secondPassword) {
      var errors = group.get('passwordAgain').getError('required');
      if (errors) {
        group.get('passwordAgain').setErrors({'notEqual': true, 'required': true});
      } else {
        group.get('passwordAgain').setErrors({'notEqual': true});
      }
      return {notEqual: true};
    }
    return null;
    }
  }
}