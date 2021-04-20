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
              return { uid, imageSrc0, imageSrc1, imageSrc2, companyName, country, contry, city, address, twoPerson, fourPerson, tables, space, currentSpace, description, openStateMonday, openStateTuesday, openStateWednesday,
                openStateThursday, openStateFriday, openStateSaturday, openStateSunday, startingHourMonday, endingHourMonday, startingHourTuesday, endingHourTuesday,
                startingHourWednesday, endingHourWednesday, startingHourThursday, endingHourThursday, startingHourFriday, endingHourFriday, startingHourSaturday,
                endingHourSaturday, startingHourSunday, endingHourSunday};
            });
        }
      ))
      .subscribe(data => {
        this.pubs$.next(data);
      });
  }

  loadPub(id) {
    this.db.collection("pubs").doc(id)
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
            return { uid, imageSrc0, imageSrc1, imageSrc2, companyName, country, contry, city, address, twoPerson, fourPerson, tables, space, currentSpace, description, openStateMonday, openStateTuesday, openStateWednesday,
              openStateThursday, openStateFriday, openStateSaturday, openStateSunday, startingHourMonday, endingHourMonday, startingHourTuesday, endingHourTuesday,
              startingHourWednesday, endingHourWednesday, startingHourThursday, endingHourThursday, startingHourFriday, endingHourFriday, startingHourSaturday,
              endingHourSaturday, startingHourSunday, endingHourSunday};
          })
    ).subscribe((data: Pub) => {
      this.pubs$.next(data);
    });
  }

  editPub(pub) {
    this.db.collection("pubs").doc(pub.uid).set({
      imageSrc0: pub.imageSrc0,
      imageSrc1: pub.imageSrc1,
      imageSrc2: pub.imageSrc2,
      companyName: pub.companyName,
      country: pub.country,
      contry: pub.contry,
      city: pub.city,
      address: pub.address,
      twoPerson: pub.twoPerson,
      fourPerson: pub.fourPerson,
      tables: pub.tables,
      space: pub.space,
      currentSpace: pub.currentSpace,
      description: pub.description,
      openStateMonday: pub.openStateMonday,
      openStateTuesday: pub.openStateTuesday,
      openStateWednesday: pub.openStateWednesday,
      openStateThursday: pub.openStateThursday,
      openStateFriday: pub.openStateFriday,
      openStateSaturday: pub.openStateSaturday,
      openStateSunday: pub.openStateSunday,
      startingHourMonday: pub.startingHourMonday,
      endingHourMonday: pub.endingHourMonday,
      startingHourTuesday: pub.startingHourTuesday,
      endingHourTuesday: pub.endingHourTuesday,
      startingHourWednesday: pub.startingHourWednesday,
      endingHourWednesday: pub.endingHourWednesday,
      startingHourThursday: pub.startingHourThursday,
      endingHourThursday: pub.endingHourThursday,
      startingHourFriday: pub.startingHourFriday,
      endingHourFriday: pub.endingHourFriday,
      startingHourSaturday: pub.startingHourSaturday,
      endingHourSaturday: pub.endingHourSaturday,
      startingHourSunday: pub.startingHourSunday,
      endingHourSunday: pub.endingHourSunday
    });
  }

  loadReservations() {
    this.db.collection("reservations")
      .snapshotChanges()
        .pipe(map(e =>{
          return e.map( a =>
            {
              const reservation: Reservation = a.payload.doc.data() as Reservation;
              const pub = reservation.pub;
              const pubName = reservation.pubName;
              const date = reservation.date;
              const time = reservation.time;
              const table = reservation.table;
              const name = reservation.name;
              const email = reservation.email;
              const phoneNumber = reservation.phoneNumber;
              return { pub, pubName, date, time, table, name, email, phoneNumber};
            });
        }
      ))
      .subscribe(data => {
        this.reservations$.next(data);
      });
  }

  createReservation(pub, pubName, date, time, table, name, email, phoneNumber) {
    const dataRef: AngularFirestoreCollection<any> = this.db.collection("reservations");
    const data = {
      pub: pub,
      pubName: pubName,
      date: date,
      time: time,
      table: table,
      name: name,
      email: email,
      phoneNumber: phoneNumber
    }
    dataRef.add(data);
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