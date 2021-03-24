import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Pub } from '../shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  pubs: Pub[] = [];
  originalPubs: Pub[] = [];
  questionForm: FormGroup;
  searchCtrl = new FormControl('');
  numberOfDay: number = 0;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.numberOfDay = new Date().getDay();
    this.questionForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      text: ['', Validators.required]
    });
    this.apiService.pubs$.subscribe((data: Pub[]) => {
      if (data) {
        console.log(data)
        this.pubs = data;
        this.originalPubs = data;
      }
    });
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
}