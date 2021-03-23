import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        public router: Router
    ) {
        this.loadUser();
    }

    loadUser() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.afs.collection("users").doc(user.uid).valueChanges().subscribe((localeUser: any) => {
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
                const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${result.user.uid}`);
                const userData = {
                    uid: result.user.uid,
                    email: result.user.email,
                    name: name,
                    phoneNumber: phoneNumber,
                    emailVerified: result.user.emailVerified,
                    pubsUid: null
                }
                userRef.set(userData, {
                    merge: true
                });
                this.router.navigateByUrl('/auth/verify_email');
            }).catch((error) => {
                window.alert(error.message)
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
    
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null && user.emailVerified !== false) ? true : false;
    }

    setUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
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
            this.router.navigateByUrl('/auth/login');
        });
    }
}