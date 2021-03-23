import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { EMAIL_REGEX, UPPER_CASE_REGEX, LOWER_CASE_REGEX } from '../utils';

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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
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
      ]]
    }, {validators: [
      this.isEqual()
    ]});
  }

  register() {
    this.authService.signUp(
      this.registerForm.controls.firstName.value,
      this.registerForm.controls.lastName.value,
      this.registerForm.controls.email.value,
      this.registerForm.controls.password.value
    );
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