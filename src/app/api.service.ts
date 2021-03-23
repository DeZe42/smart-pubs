import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject } from "rxjs";
import { Pub } from "./shared/models";
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

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
                const data: Pub = a.payload.doc.data() as Pub;
                const uid = data.uid;
                const imageSrc = data.imageSrc;
                const name = data.name;
                const openStartingHour = data.openStartingHour;
                const openEndingHour = data.openEndingHour;
                const currentSpace = data.currentSpace;
                const space = data.space;
                return { uid, imageSrc, name, openStartingHour, openEndingHour, currentSpace, space };
              });
          }
        ))
        .subscribe(data => {
          this.pubs$.next(data);
        });
    }

    createPub(image, pub) {
        // const userRef: AngularFirestoreCollection<any> = this.db.collection("users").doc();
        const dataRef: AngularFirestoreCollection<any> = this.db.collection("pubs");
        const data = {
            imageSrc: null,
            name: pub.name,
            openStartingHour: pub.openStartingHour,
            openEndingHour: pub.openEndingHour,
            currentSpace: pub.currentSpace,
            space: pub.space
        }
        dataRef.add(data).then(newRef => {
            let pubRef: AngularFirestoreDocument<any> = this.db.collection("pubs").doc(newRef.id);
            const data = {
                uid: newRef.id
            }
            pubRef.set(data, {
                merge: true
            });
            this.uploadImage(image, newRef.id, pub.name);
        });
    }

    uploadImage(input, uid, pubName) {
        let files = input;
        let pubRef: AngularFirestoreDocument<any> = this.db.collection("pubs").doc(uid);
        let task = this.storageRef.upload(`images/${pubName}/${uid}`, files);
        task
        .snapshotChanges().subscribe(url => {
            pubRef.update({
                imageSrc: url
            });
        });
        this.loadPubs();
    }

    addPubToUser(pubUid, userUid) {
        this.db.collection("users").doc(userUid).update({
          pubUid: pubUid
        });
    }
}