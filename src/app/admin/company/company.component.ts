import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Pub } from 'src/app/shared/models';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  pub: Pub;
  companyName = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  tableForm: FormGroup;
  aperitivForm: FormGroup;
  mainMenuForm: FormGroup;
  desertForm: FormGroup;
  drinkForm: FormGroup;
  dateForm: FormGroup;
  addressForm: FormGroup;
  newAperitiv: boolean = false;
  newMainMenu: boolean = false;
  newDessert: boolean = false;
  newDrink: boolean = false;
  aperitivMenu = [];
  mainMenu = [];
  desertMenu = [];
  drinkMenu = [];
  currentSpace: number = 0;
  delayTimer = null;
  imgURL1;
  imgURL2;
  imgURL3;
  imageList = [];
  formSub: Subscription;

  constructor(
    private location: Location,
    private authService: AuthService,
    private apiService: ApiService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.tableForm = this.fb.group({
      twoPerson: ['', Validators.required],
      fourPerson: ['', Validators.required]
    });
    this.aperitivForm = this.fb.group({
      name: ['', Validators.required],
      size: ['', Validators.required],
      price: ['', Validators.required],
      make: ['', Validators.required]
    });
    this.mainMenuForm = this.fb.group({
      name: ['', Validators.required],
      size: ['', Validators.required],
      price: ['', Validators.required],
      make: ['', Validators.required]
    });
    this.desertForm = this.fb.group({
      name: ['', Validators.required],
      size: ['', Validators.required],
      price: ['', Validators.required],
      make: ['', Validators.required]
    });
    this.drinkForm = this.fb.group({
      name: ['', Validators.required],
      size: ['', Validators.required],
      price: ['', Validators.required]
    });
    this.dateForm = this.fb.group({
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
    });
    this.addressForm = this.fb.group({
      country: ['', Validators.required],
      contry: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.authService.user$.subscribe(user => {
      if (user) {
        this.apiService.loadPub(user.pubUid);
      }
    });
    this.apiService.pubs$.subscribe(data => {
      if (data) {
        this.pub = data;
        this.currentSpace = this.pub.currentSpace;
        this.imgURL1 = data.imageSrc0;
        this.imgURL2 = data.imageSrc1;
        this.imgURL3 = data.imageSrc2;
        this.aperitivMenu = data.aperitivMenu;
        this.mainMenu = data.mainMenu;
        this.desertMenu = data.desertMenu;
        this.drinkMenu = data.drinkMenu;
        if (data.length == undefined) {
          this.companyName.setValue(data.companyName);
          this.description.setValue(data.description);
          this.tableForm.setValue({
            twoPerson: data.twoPerson,
            fourPerson: data.fourPerson
          });
          this.dateForm.setValue({
            openStateMonday: data.openStateMonday,
            openStateTuesday: data.openStateTuesday,
            openStateWednesday: data.openStateWednesday,
            openStateThursday: data.openStateThursday,
            openStateFriday: data.openStateFriday,
            openStateSaturday: data.openStateSaturday,
            openStateSunday: data.openStateSunday,
            startingHourMonday: data.startingHourMonday,
            endingHourMonday: data.endingHourMonday,
            startingHourTuesday: data.startingHourTuesday,
            endingHourTuesday: data.endingHourTuesday,
            startingHourWednesday: data.startingHourWednesday,
            endingHourWednesday: data.endingHourWednesday,
            startingHourThursday: data.startingHourThursday,
            endingHourThursday: data.endingHourThursday,
            startingHourFriday: data.startingHourFriday,
            endingHourFriday: data.endingHourFriday,
            startingHourSaturday: data.startingHourSaturday,
            endingHourSaturday: data.endingHourSaturday,
            startingHourSunday: data.startingHourSunday,
            endingHourSunday: data.endingHourSunday
          });
          this.addressForm.setValue({
            country: data.country,
            contry: data.contry,
            city: data.city,
            address: data.address
          });
        }
      }
    });
  }

  back() {
    this.location.back();
  }

  showCompanyButtons() {
    if (this.pub) {
      if (this.companyName.value == this.pub.companyName) {
        return false;
      } else {
        return true;
      }
    }
  }

  cancelCompanyChange() {
    this.companyName.setValue(this.pub.companyName);
  }

  saveCompanyChange() {
    this.apiService.editCompanyNameToPub(this.pub, this.companyName.value);
  }

  changeSpaceNumber(value) {
    if (value == 'delete') {
      this.currentSpace -= 1;
    } else if (value == 'add') {
      this.currentSpace += 1;
    }
    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(() => {
      this.apiService.editSpaceNumberToPub(this.pub, this.currentSpace);
    }, 2000);
  }

  showImageButtons() {
    if (this.pub && this.imgURL1 && this.imgURL2 && this.imgURL3) {
      if (this.imgURL1 == this.pub.imageSrc0 && this.imgURL2 == this.pub.imageSrc1 && this.imgURL3 == this.pub.imageSrc2) {
        return false;
      } else {
        return true;
      }
    }
  }

  cancelImageUpload() {
    this.imgURL1 = this.pub.imageSrc0;
    this.imgURL2 = this.pub.imageSrc1;
    this.imgURL3 = this.pub.imageSrc2;
  }

  imageUpload() {
    this.imageList.forEach((image, index) => {
      this.authService.uploadImage(image[0], this.pub.uid, this.pub.companyName, index);
    });
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

  showTableButtons() {
    if (this.pub) {
      if (this.tableForm.controls.twoPerson.value == this.pub.twoPerson && this.tableForm.controls.fourPerson.value == this.pub.fourPerson) {
        return false;
      } else {
        return true;
      }
    }
  }

  cancelTableChange() {
    this.tableForm.setValue({
      twoPerson: this.pub.twoPerson,
      fourPerson: this.pub.fourPerson
    });
  }

  saveTableChange() {
    let table = {
      twoPerson: this.tableForm.controls.twoPerson.value,
      fourPerson: this.tableForm.controls.fourPerson.value,
      space: this.tableForm.controls.twoPerson.value * 2 + this.tableForm.controls.fourPerson.value * 4
    }
    this.apiService.editTableToPub(this.pub, table);
  }

  showDescriptionButtons() {
    if (this.pub) {
      if (this.description.value == this.pub.description) {
        return false;
      } else {
        return true;
      }
    }
  }

  cancelDescriptionChange() {
    this.description.setValue(this.pub.description);
  }

  saveDescriptionChange() {
    this.apiService.editDescriptionToPub(this.pub, this.description.value);
  }

  showDateButtons() {
    if (this.pub) {
      if (this.dateForm.controls.openStateMonday.value == this.pub.openStateMonday &&
          this.dateForm.controls.openStateTuesday.value == this.pub.openStateTuesday &&
          this.dateForm.controls.openStateWednesday.value == this.pub.openStateWednesday &&
          this.dateForm.controls.openStateThursday.value == this.pub.openStateThursday &&
          this.dateForm.controls.openStateFriday.value == this.pub.openStateFriday &&
          this.dateForm.controls.openStateSaturday.value == this.pub.openStateSaturday &&
          this.dateForm.controls.openStateSunday.value == this.pub.openStateSunday &&
          this.dateForm.controls.startingHourMonday.value == this.pub.startingHourMonday &&
          this.dateForm.controls.endingHourMonday.value == this.pub.endingHourMonday &&
          this.dateForm.controls.startingHourTuesday.value == this.pub.startingHourTuesday &&
          this.dateForm.controls.endingHourTuesday.value == this.pub.endingHourTuesday &&
          this.dateForm.controls.startingHourWednesday.value == this.pub.startingHourWednesday &&
          this.dateForm.controls.endingHourWednesday.value == this.pub.endingHourWednesday &&
          this.dateForm.controls.startingHourThursday.value == this.pub.startingHourThursday &&
          this.dateForm.controls.endingHourThursday.value == this.pub.endingHourThursday &&
          this.dateForm.controls.startingHourFriday.value == this.pub.startingHourFriday &&
          this.dateForm.controls.endingHourFriday.value == this.pub.endingHourFriday &&
          this.dateForm.controls.startingHourSaturday.value == this.pub.startingHourSaturday &&
          this.dateForm.controls.endingHourSaturday.value == this.pub.endingHourSaturday &&
          this.dateForm.controls.startingHourSunday.value == this.pub.startingHourSunday &&
          this.dateForm.controls.endingHourSunday.value == this.pub.endingHourSunday) {
        return false;
      } else {
        return true;
      }
    }
  }

  disableTimeInput(type: string) {
    let startHour = 'startingHour' + type;
    let endHour = 'endingHour' + type;
    let toggle = 'openState' + type;
    if (this.dateForm.controls[toggle].value) {
      this.dateForm.controls[startHour].enable();
      this.dateForm.controls[endHour].enable();
      this.dateForm.controls[startHour].setValidators(Validators.required);
      this.dateForm.controls[endHour].setValidators(Validators.required);
    } else {
      this.dateForm.controls[startHour].disable();
      this.dateForm.controls[endHour].disable();
      this.dateForm.controls[startHour].clearValidators();
      this.dateForm.controls[endHour].clearValidators();
      this.dateForm.controls[startHour].reset();
      this.dateForm.controls[endHour].reset();
    }
  }

  cancelDateChange() {
    this.dateForm.setValue({
      openStateMonday: this.pub.openStateMonday,
      openStateTuesday: this.pub.openStateTuesday,
      openStateWednesday: this.pub.openStateWednesday,
      openStateThursday: this.pub.openStateThursday,
      openStateFriday: this.pub.openStateFriday,
      openStateSaturday: this.pub.openStateSaturday,
      openStateSunday: this.pub.openStateSunday,
      startingHourMonday: this.pub.startingHourMonday,
      endingHourMonday: this.pub.endingHourMonday,
      startingHourTuesday: this.pub.startingHourTuesday,
      endingHourTuesday: this.pub.endingHourTuesday,
      startingHourWednesday: this.pub.startingHourWednesday,
      endingHourWednesday: this.pub.endingHourWednesday,
      startingHourThursday: this.pub.startingHourThursday,
      endingHourThursday: this.pub.endingHourThursday,
      startingHourFriday: this.pub.startingHourFriday,
      endingHourFriday: this.pub.endingHourFriday,
      startingHourSaturday: this.pub.startingHourSaturday,
      endingHourSaturday: this.pub.endingHourSaturday,
      startingHourSunday: this.pub.startingHourSunday,
      endingHourSunday: this.pub.endingHourSunday
    });
  }

  saveDateChange() {
    let date = {
      openStateMonday: this.dateForm.controls.openStateMonday.value,
      openStateTuesday: this.dateForm.controls.openStateTuesday.value,
      openStateWednesday: this.dateForm.controls.openStateWednesday.value,
      openStateThursday: this.dateForm.controls.openStateThursday.value,
      openStateFriday: this.dateForm.controls.openStateFriday.value,
      openStateSaturday: this.dateForm.controls.openStateSaturday.value,
      openStateSunday: this.dateForm.controls.openStateSunday.value,
      startingHourMonday: this.dateForm.controls.startingHourMonday.value,
      endingHourMonday: this.dateForm.controls.endingHourMonday.value,
      startingHourTuesday: this.dateForm.controls.startingHourTuesday.value,
      endingHourTuesday: this.dateForm.controls.endingHourTuesday.value,
      startingHourWednesday: this.dateForm.controls.startingHourWednesday.value,
      endingHourWednesday: this.dateForm.controls.endingHourWednesday.value,
      startingHourThursday: this.dateForm.controls.startingHourThursday.value,
      endingHourThursday: this.dateForm.controls.endingHourThursday.value,
      startingHourFriday: this.dateForm.controls.startingHourFriday.value,
      endingHourFriday: this.dateForm.controls.endingHourFriday.value,
      startingHourSaturday: this.dateForm.controls.startingHourSaturday.value,
      endingHourSaturday: this.dateForm.controls.endingHourSaturday.value,
      startingHourSunday: this.dateForm.controls.startingHourSunday.value,
      endingHourSunday: this.dateForm.controls.endingHourSunday.value
    }
    this.apiService.editDateToPub(this.pub, date);
  }

  saveAperitiv() {
    this.aperitivMenu.push(this.aperitivForm.value);
    this.apiService.addAperitivMenuToPub(this.pub, this.aperitivMenu);
    this.aperitivForm.reset();
    this.newAperitiv = false;
  }

  deleteAperitiv(index) {
    this.aperitivMenu = this.aperitivMenu.filter(element => {
      return element !== this.aperitivMenu[index];
    });
    this.apiService.addAperitivMenuToPub(this.pub, this.aperitivMenu);
  }

  saveMainMenu() {
    this.mainMenu.push(this.mainMenuForm.value);
    this.apiService.addMainMenuToPub(this.pub, this.mainMenu);
    this.mainMenuForm.reset();
    this.newMainMenu = false;
  }

  deleteMain(index) {
    this.mainMenu = this.mainMenu.filter(element => {
      return element !== this.mainMenu[index];
    });
    this.apiService.addMainMenuToPub(this.pub, this.mainMenu);
  }

  saveDessert() {
    this.desertMenu.push(this.desertForm.value);
    this.apiService.addDesertMenuToPub(this.pub, this.desertMenu);
    this.desertForm.reset();
    this.newDessert = false;
  }

  deleteDesert(index) {
    this.desertMenu = this.desertMenu.filter(element => {
      return element !== this.desertMenu[index];
    });
    this.apiService.addDesertMenuToPub(this.pub, this.desertMenu);
  }

  saveDrink() {
    this.drinkMenu.push(this.drinkForm.value);
    this.apiService.addDrinkMenuToPub(this.pub, this.drinkMenu);
    this.drinkForm.reset();
    this.newDrink = false;
  }

  deleteDrink(index) {
    this.drinkMenu = this.drinkMenu.filter(element => {
      return element !== this.drinkMenu[index];
    });
    this.apiService.addDrinkMenuToPub(this.pub, this.drinkMenu);
  }

  cancelAperitiv() {
    this.aperitivForm.reset();
    this.newAperitiv = false;
  }

  cancelMainMenu() {
    this.mainMenuForm.reset();
    this.newMainMenu = false;
  }

  cancelDessert() {
    this.desertForm.reset();
    this.newDessert = false;
  }

  cancelDrink() {
    this.drinkForm.reset();
    this.newDrink = false;
  }

  showAddressButtons() {
    if (this.pub) {
      if (this.addressForm.controls.country.value == this.pub.country &&
          this.addressForm.controls.contry.value == this.pub.contry &&
          this.addressForm.controls.city.value == this.pub.city &&
          this.addressForm.controls.address.value == this.pub.address) {
        return false;
      } else {
        return true;
      }
    }
  }

  cancelAddressChange() {
    this.addressForm.setValue({
      country: this.pub.country,
      contry: this.pub.contry,
      city: this.pub.city,
      address: this.pub.address
    });
  }

  saveAddressChange() {
    let address = {
      country: this.addressForm.controls.country.value,
      contry: this.addressForm.controls.contry.value,
      city: this.addressForm.controls.city.value,
      address: this.addressForm.controls.address.value
    }
    this.apiService.editAddressToPub(this.pub, address);
  }
}