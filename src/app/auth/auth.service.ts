import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/storage";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        public db: AngularFirestore,
        public afAuth: AngularFireAuth,
        private storageRef: AngularFireStorage,
        public router: Router
    ) {
        this.loadUser();
    }

    loadUser() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.db.collection("users").doc(user.uid).valueChanges().subscribe((localeUser: any) => {
                    this.user$.next({
                        uid: localeUser.uid,
                        name: localeUser.name,
                        email: localeUser.email,
                        phoneNumber: localeUser.phoneNumber,
                    });
                });
            }
        });
    }

    signIn(email, password) {
        return this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
                this.router.navigateByUrl('/');
                this.setUserData(result.user);
            }).catch((error) => {
                window.alert(error.message)
            });
    }

    signUp(email, password, name, phoneNumber) {
        return this.afAuth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                result.user.sendEmailVerification();
                const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${result.user.uid}`);
                const userData = {
                    uid: result.user.uid,
                    email: result.user.email,
                    name: name,
                    phoneNumber: phoneNumber,
                    emailVerified: result.user.emailVerified,
                    legalUser: false
                }
                userRef.set(userData, {
                    merge: true
                });
                this.router.navigateByUrl('/auth/verify_email');
            }).catch((error) => {
                window.alert(error.message)
            });
    }

    signUpWithCompany(email, password, name, phoneNumber, imageList, pub) {
        return this.afAuth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                result.user.sendEmailVerification();
                const pubRef: AngularFirestoreCollection<any> = this.db.collection("pubs");
                const pubData = {
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
                pubRef.add(pubData).then(newRef => {
                    let pubRef: AngularFirestoreDocument<any> = this.db.collection("pubs").doc(newRef.id);
                    const data = {
                        uid: newRef.id
                    }
                    pubRef.set(data, {
                        merge: true
                    });
                    for (let index = 0; index < imageList.length; index++) {
                        const element = imageList[index];
                        this.uploadImage(element, newRef.id, pub.companyName, index);
                    }
                    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${result.user.uid}`);
                    const userData = {
                        uid: result.user.uid,
                        email: result.user.email,
                        name: name,
                        phoneNumber: phoneNumber,
                        emailVerified: result.user.emailVerified,
                        legalUser: true,
                        pubUid: newRef.id
                    }
                    userRef.set(userData, {
                        merge: true
                    });
                    this.router.navigateByUrl('/');
                });
            }).catch((error) => {
                window.alert(error.message)
            });
    }

    uploadImage(input, uid, pubName, index) {
        let files = input;
        let ref = this.storageRef.ref(`images/${pubName}/${uid}`);
        let pubRef: AngularFirestoreDocument<any> = this.db.collection("pubs").doc(uid);
        ref.put(files).then(res=>{
            ref.getDownloadURL().subscribe(res => {
                if (index == 0) {
                    const pubs = {
                      imageSrc1: res,
                    }
                    return pubRef.set(pubs, {
                      merge: true
                    });
                } else if (index == 1) {
                    const pubs = {
                      imageSrc2: res,
                    }
                    return pubRef.set(pubs, {
                      merge: true
                    });
                } else if (index == 2) {
                    const pubs = {
                      imageSrc3: res,
                    }
                    return pubRef.set(pubs, {
                      merge: true
                    });
                }
            });
        });
    }

    forgotPassword(passwordResetEmail) {
        return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
        .then(() => {
            window.alert('Password reset email sent, check your inbox.');
            this.router.navigateByUrl('/auth/login');
        }).catch((error) => {
            window.alert(error)
        });
    }
    
    isLoggedIn() {
        return this.afAuth.user.pipe(
            map(user => {
              if (user != null) {
                return true;
              } else {
                return false;
              }
            })
        );
    }

    setUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
        const userData = {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified
        }
        return userRef.set(userData, {
            merge: true
        });
    }

    signOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigateByUrl('/');
        });
    }
}