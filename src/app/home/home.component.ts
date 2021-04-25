import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { EMAIL_REGEX } from '../auth/utils';
import { InformationalDialogComponent } from '../shared/dialogs/informational-dialog/informational-dialog.component';
import { Pub } from '../shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  pubs: Pub[] = [];
  searchCtrl = new FormControl('');
  questionForm: FormGroup;
  originalPubs: Pub[] = [];
  numberOfDay: number = 0;
  user;
  pubsSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.numberOfDay = new Date().getDay();
    this.questionForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      text: ['', Validators.required]
    });
    this.apiService.loadPubs();
    this.pubsSub = this.apiService.pubs$.subscribe((pub: Pub[]) => {
      if (pub) {
        this.pubs = pub;
        this.originalPubs = pub;
      }
    });
  }

  ngOnDestroy() {
    this.pubsSub.unsubscribe();
  }

  search(value) {
    this.pubs = this.originalPubs.filter(e=>{
      const string: string = e.companyName;
      if (string.toUpperCase().includes(value.toUpperCase())) {
        return true;
      }
      return false;
    });
  }

  getOpenState(pub: Pub) {
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

  sendQuestion() {
    this.apiService.createQuestion(this.questionForm.controls.name.value, this.questionForm.controls.email.value, this.questionForm.controls.text.value)
    this.questionForm.setValue({
      name: '',
      email: '',
      text: ''
    });
    this.dialog.open(InformationalDialogComponent, {
      disableClose: true,
      data: 'informational.dialog.questions.send.success',
      panelClass: "error-dialog"
    });
  }
}