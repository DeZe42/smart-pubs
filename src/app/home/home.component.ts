import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pubs } from '../shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  pubs: Pubs[] = [];
  questionForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      text: ['', Validators.required]
    })
    for (let index = 0; index <= 10; index++) {
      this.pubs.push({ imageSrc: 'asd', name: 'valami etterem', openStartingHour: '12:00', openEndingHour: '22:00', currentSpace: 16, space: 88 });
    }
  }
}