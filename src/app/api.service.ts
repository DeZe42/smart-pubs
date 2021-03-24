import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject } from "rxjs";
import { Pub } from "./shared/models";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    pubs$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

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
                const imageSrc1 = pub.imageSrc1;
                const imageSrc2 = pub.imageSrc2;
                const imageSrc3 = pub.imageSrc3;
                const companyName = pub.companyName;
                const country = pub.country;
                const contry = pub.contry;
                const city = pub.city;
                const address = pub.address;
                const space = pub.space;
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
                return { uid, imageSrc1, imageSrc2, imageSrc3, companyName, country, contry, city, address, space, description, openStateMonday, openStateTuesday, openStateWednesday,
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

    createPub(imageList, pub) {
        const dataRef: AngularFirestoreCollection<any> = this.db.collection("pubs");
        const data = {
            companyName: pub.companyName,
            country: pub.country,
            contry: pub.contry,
            city: pub.city,
            address: pub.address,
            space: pub.space,
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
        }
        dataRef.add(data).then(newRef => {
            let pubRef: AngularFirestoreDocument<any> = this.db.collection("pubs").doc(newRef.id);
            const data = {
                uid: newRef.id
            }
            pubRef.set(data, {
                merge: true
            });
            imageList.forEach(element => {
              this.uploadImage(element, newRef.id, pub.companyName);
            });
        });
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