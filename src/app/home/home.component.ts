import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      text: ['', Validators.required]
    });
    this.apiService.pubs$.subscribe((data: Pub[]) => {
      if (data) {
        this.pubs = data;
        this.originalPubs = data;
      }
    });
  }

  search(value) {
    this.pubs = this.originalPubs.filter(e=>{
      const string: string = e.name;
      if (string.toUpperCase().includes(value.toUpperCase())) {
        return true;
      }
      return false;
    });
  }
}