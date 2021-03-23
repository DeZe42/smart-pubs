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
    imgURL;
    imagePath;

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

    preview(files) {
        if (files.length === 0)
          return;
        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
          return;
        }
        var reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]); 
        reader.onload = (_event) => { 
          this.imgURL = reader.result; 
        }
    }
}