import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { EMAIL_REGEX, UPPER_CASE_REGEX, LOWER_CASE_REGEX } from '../utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.upperAndLowerCases,
        this.hasNumber
      ]]
    });
  }

  login() {
    this.authService.signIn(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
  }
  
  keyEvent(event: KeyboardEvent): void {
    if (event.key == "Enter") {
      this.login();
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
}