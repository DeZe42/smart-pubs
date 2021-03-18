import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { User } from "./user";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    userData: any;

    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        public router: Router
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
              this.userData = user;
              localStorage.setItem('user', JSON.stringify(this.userData));
              JSON.parse(localStorage.getItem('user'));
            } else {
              localStorage.setItem('user', null);
              JSON.parse(localStorage.getItem('user'));
            }
          })
    }

    signIn(email, password) {
        return this.afAuth.signInWithEmailAndPassword(email, password)
          .then((result) => {
            this.router.navigate(['dashboard']);
            this.setUserData(result.user);
          }).catch((error) => {
            window.alert(error.message)
          })
    }

    signUp(email, password) {
        return this.afAuth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                result.user.sendEmailVerification();
                this.setUserData(result.user);
                this.router.navigateByUrl('/auth/verify_email');
            }).catch((error) => {
                window.alert(error.message)
            })
    }

    forgotPassword(passwordResetEmail) {
        return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
        .then(() => {
            window.alert('Password reset email sent, check your inbox.');
            this.router.navigateByUrl('/auth/login');
        }).catch((error) => {
            window.alert(error)
        })
    }
    
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null && user.emailVerified !== false) ? true : false;
    }

    setUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
        }
        return userRef.set(userData, {
            merge: true
        })
    }

    signOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['sign-in']);
        })
    }
}