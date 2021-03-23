import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  imgURL;
  imagePath;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
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
      description: ['', Validators.required]
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
    } else {

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
    } else {
      
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