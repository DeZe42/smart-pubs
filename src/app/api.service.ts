import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject } from "rxjs";
import { Pub, Reservation } from "./shared/models";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

  pubs$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  pub$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  reservations$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
      private db: AngularFirestore,
      private storageRef: AngularFireStorage
  ) {
      this.loadPubs();
  }

  loadPubs() {
      this.db.collection("pubs")
      .snapshotChanges()
        .pipe(map(e =>{
          return e.map( a =>
            {
              const pub: Pub = a.payload.doc.data() as Pub;
              const uid = pub.uid;
              const imageSrc0 = pub.imageSrc0;
              const imageSrc1 = pub.imageSrc1;
              const imageSrc2 = pub.imageSrc2;
              const companyName = pub.companyName;
              const country = pub.country;
              const contry = pub.contry;
              const city = pub.city;
              const address = pub.address;
              const twoPerson = pub.twoPerson;
              const fourPerson = pub.fourPerson;
              const tables = pub.tables;
              const space = pub.space;
              const currentSpace = pub.currentSpace;
              const description = pub.description;
              const openStateMonday = pub.openStateMonday;
              const openStateTuesday = pub.openStateTuesday;
              const openStateWednesday = pub.openStateWednesday;
              const openStateThursday = pub.openStateThursday;
              const openStateFriday = pub.openStateFriday;
              const openStateSaturday = pub.openStateSaturday;
              const openStateSunday = pub.openStateSunday;
              const startingHourMonday = pub.startingHourMonday;
              const endingHourMonday = pub.endingHourMonday;
              const startingHourTuesday = pub.startingHourTuesday;
              const endingHourTuesday = pub.endingHourTuesday;
              const startingHourWednesday = pub.startingHourWednesday;
              const endingHourWednesday = pub.endingHourWednesday;
              const startingHourThursday = pub.startingHourThursday;
              const endingHourThursday = pub.endingHourThursday;
              const startingHourFriday = pub.startingHourFriday;
              const endingHourFriday = pub.endingHourFriday;
              const startingHourSaturday = pub.startingHourSaturday;
              const endingHourSaturday = pub.endingHourSaturday;
              const startingHourSunday = pub.startingHourSunday;
              const endingHourSunday = pub.endingHourSunday;
              const aperitivMenu = pub.aperitivMenu;
              const mainMenu = pub.mainMenu;
              const desertMenu = pub.desertMenu;
              const drinkMenu = pub.drinkMenu;
              const reservationsToday = pub.reservationsToday;
              return { uid, imageSrc0, imageSrc1, imageSrc2, companyName, country, contry, city, address, twoPerson, fourPerson, tables, space, currentSpace, description, openStateMonday, openStateTuesday, openStateWednesday,
                openStateThursday, openStateFriday, openStateSaturday, openStateSunday, startingHourMonday, endingHourMonday, startingHourTuesday, endingHourTuesday,
                startingHourWednesday, endingHourWednesday, startingHourThursday, endingHourThursday, startingHourFriday, endingHourFriday, startingHourSaturday,
                endingHourSaturday, startingHourSunday, endingHourSunday, aperitivMenu, mainMenu, desertMenu, drinkMenu, reservationsToday };
            });
        }
      ))
      .subscribe(data => {
        this.pubs$.next(data);
      });
  }

  loadPub(uid) {
    this.db.collection("pubs").doc(uid)
    .snapshotChanges()
      .pipe(map(a =>
          {
            const pub: Pub = a.payload.data() as Pub;
            const uid = pub.uid;
            const imageSrc0 = pub.imageSrc0;
            const imageSrc1 = pub.imageSrc1;
            const imageSrc2 = pub.imageSrc2;
            const companyName = pub.companyName;
            const country = pub.country;
            const contry = pub.contry;
            const city = pub.city;
            const address = pub.address;
            const twoPerson = pub.twoPerson;
            const fourPerson = pub.fourPerson;
            const tables = pub.tables;
            const space = pub.space;
            const currentSpace = pub.currentSpace;
            const description = pub.description;
            const openStateMonday = pub.openStateMonday;
            const openStateTuesday = pub.openStateTuesday;
            const openStateWednesday = pub.openStateWednesday;
            const openStateThursday = pub.openStateThursday;
            const openStateFriday = pub.openStateFriday;
            const openStateSaturday = pub.openStateSaturday;
            const openStateSunday = pub.openStateSunday;
            const startingHourMonday = pub.startingHourMonday;
            const endingHourMonday = pub.endingHourMonday;
            const startingHourTuesday = pub.startingHourTuesday;
            const endingHourTuesday = pub.endingHourTuesday;
            const startingHourWednesday = pub.startingHourWednesday;
            const endingHourWednesday = pub.endingHourWednesday;
            const startingHourThursday = pub.startingHourThursday;
            const endingHourThursday = pub.endingHourThursday;
            const startingHourFriday = pub.startingHourFriday;
            const endingHourFriday = pub.endingHourFriday;
            const startingHourSaturday = pub.startingHourSaturday;
            const endingHourSaturday = pub.endingHourSaturday;
            const startingHourSunday = pub.startingHourSunday;
            const endingHourSunday = pub.endingHourSunday;
            const aperitivMenu = pub.aperitivMenu;
            const mainMenu = pub.mainMenu;
            const desertMenu = pub.desertMenu;
            const drinkMenu = pub.drinkMenu;
            return { uid, imageSrc0, imageSrc1, imageSrc2, companyName, country, contry, city, address, twoPerson, fourPerson, tables, space, currentSpace, description, openStateMonday, openStateTuesday, openStateWednesday,
              openStateThursday, openStateFriday, openStateSaturday, openStateSunday, startingHourMonday, endingHourMonday, startingHourTuesday, endingHourTuesday,
              startingHourWednesday, endingHourWednesday, startingHourThursday, endingHourThursday, startingHourFriday, endingHourFriday, startingHourSaturday,
              endingHourSaturday, startingHourSunday, endingHourSunday, aperitivMenu, mainMenu, desertMenu, drinkMenu };
          })
    ).subscribe((data: Pub) => {
      this.pub$.next(data);
    });
  }

  editCompanyNameToPub(pub, companyName) {
    const pubRef: AngularFirestoreDocument<any> = this.db.doc(`pubs/${pub.uid}`);
    const pubData = {
      companyName: companyName
    }
    return pubRef.set(pubData, {
      merge: true
    });
  }

  editTableToPub(pub, table) {
    const pubRef: AngularFirestoreDocument<any> = this.db.doc(`pubs/${pub.uid}`);
    const pubData = {
      twoPerson: table.twoPerson,
      fourPerson: table.fourPerson,
      space: table.space
    }
    return pubRef.set(pubData, {
      merge: true
    });
  }

  editDescriptionToPub(pub, description) {
    const pubRef: AngularFirestoreDocument<any> = this.db.doc(`pubs/${pub.uid}`);
    const pubData = {
      description: description
    }
    return pubRef.set(pubData, {
      merge: true
    });
  }

  editDateToPub(pub, date) {
    const pubRef: AngularFirestoreDocument<any> = this.db.doc(`pubs/${pub.uid}`);
    const pubData = {
      openStateMonday: date.openStateMonday,
      openStateTuesday: date.openStateTuesday,
      openStateWednesday: date.openStateWednesday,
      openStateThursday: date.openStateThursday,
      openStateFriday: date.openStateFriday,
      openStateSaturday: date.openStateSaturday,
      openStateSunday: date.openStateSunday,
      startingHourMonday: date.startingHourMonday,
      endingHourMonday: date.endingHourMonday,
      startingHourTuesday: date.startingHourTuesday,
      endingHourTuesday: date.endingHourTuesday,
      startingHourWednesday: date.startingHourWednesday,
      endingHourWednesday: date.endingHourWednesday,
      startingHourThursday: date.startingHourThursday,
      endingHourThursday: date.endingHourThursday,
      startingHourFriday: date.startingHourFriday,
      endingHourFriday: date.endingHourFriday,
      startingHourSaturday: date.startingHourSaturday,
      endingHourSaturday: date.endingHourSaturday,
      startingHourSunday: date.startingHourSunday,
      endingHourSunday: date.endingHourSunday
    }
    return pubRef.set(pubData, {
      merge: true
    });
  }

  editAddressToPub(pub, address) {
    const pubRef: AngularFirestoreDocument<any> = this.db.doc(`pubs/${pub.uid}`);
    const pubData = {
      country: address.country,
      contry: address.contry,
      city: address.city,
      address: address.address
    }
    return pubRef.set(pubData, {
      merge: true
    });
  }

  addAperitivMenuToPub(pub, aperitivMenu) {
    const pubRef: AngularFirestoreDocument<any> = this.db.doc(`pubs/${pub.uid}`);
    const pubData = {
      aperitivMenu: aperitivMenu
    }
    return pubRef.set(pubData, {
      merge: true
    });
  }
  
  addMainMenuToPub(pub, mainMenu) {
    const pubRef: AngularFirestoreDocument<any> = this.db.doc(`pubs/${pub.uid}`);
    const pubData = {
      mainMenu: mainMenu
    }
    return pubRef.set(pubData, {
      merge: true
    });
  }
  
  addDesertMenuToPub(pub, desertMenu) {
    const pubRef: AngularFirestoreDocument<any> = this.db.doc(`pubs/${pub.uid}`);
    const pubData = {
      desertMenu: desertMenu
    }
    return pubRef.set(pubData, {
      merge: true
    });
  }
  
  addDrinkMenuToPub(pub, drinkMenu) {
    const pubRef: AngularFirestoreDocument<any> = this.db.doc(`pubs/${pub.uid}`);
    const pubData = {
      drinkMenu: drinkMenu
    }
    return pubRef.set(pubData, {
      merge: true
    });
  }

  loadReservations() {
    this.db.collection("reservations")
      .snapshotChanges()
        .pipe(map(e =>{
          return e.map( a =>
            {
              const reservation: Reservation = a.payload.doc.data() as Reservation;
              const uid = reservation.uid;
              const pub = reservation.pub;
              const pubName = reservation.pubName;
              const date = reservation.date;
              const time = reservation.time;
              const table = reservation.table;
              const spaceNumber = reservation.spaceNumber;
              const name = reservation.name;
              const email = reservation.email;
              const phoneNumber = reservation.phoneNumber;
              const status = reservation.status;
              return { uid, pub, pubName, date, time, table, spaceNumber, name, email, phoneNumber, status};
            });
        }
      ))
      .subscribe(data => {
        this.reservations$.next(data);
      });
  }

  createReservation(pub, pubName, date, time, table, name, email, phoneNumber, accepted?) {
    const dataRef: AngularFirestoreCollection<any> = this.db.collection("reservations");
    const data = {
      pub: pub,
      pubName: pubName,
      date: date,
      time: time,
      table: table,
      spaceNumber: table.persons,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      status: accepted ? accepted : 'pending'
    }
    dataRef.add(data).then(newRef => {
      let reservationRef: AngularFirestoreDocument<any> = this.db.collection("reservations").doc(newRef.id);
      const data = {
          uid: newRef.id
      }
      reservationRef.set(data, {
          merge: true
      });
    });
  }

  editReservation(reservation, status) {
    const pubRef: AngularFirestoreDocument<any> = this.db.doc(`reservations/${reservation.uid}`);
    const pubData = {
      status: status
    }
    return pubRef.set(pubData, {
      merge: true
    });
  }

  deleteReservation(uid) {
    this.db.collection("reservations").doc(uid).delete();
  }

  createQuestion(name, email, question) {
    const dataRef: AngularFirestoreCollection<any> = this.db.collection("questions");
    const data = {
      name: name,
      email: email,
      question: question
    }
    dataRef.add(data);
  }

  uploadImage(input, uid, pubName) {
      let files = input;
      let ref = this.storageRef.ref(`images/${pubName}/${uid}`);
      let pubRef: AngularFirestoreDocument<any> = this.db.collection("pubs").doc(uid);
      ref.put(files).then(res=>{
          ref.getDownloadURL().subscribe(res => {
            const pubs = {
              imageSrc: res,
            }
            return pubRef.set(pubs, {
              merge: true
            });
          });
        });
      this.loadPubs();
  }
}