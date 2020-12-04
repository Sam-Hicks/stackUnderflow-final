import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import { auth, firestore } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user$: Observable<User>;
  title: string;
  content: string;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          if (result.additionalUserInfo.isNewUser == true){
            console.log(result.additionalUserInfo.isNewUser);
            this.router.navigate(['survey']);
          } else {
            this.router.navigate(['home-page']);
          }
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        console.log(result.additionalUserInfo.isNewUser);
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser.then((user) => {
      return user.sendEmailVerification();
    }).then(() => {
      this.router.navigate(['verify-email-address']);
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }


  GoogleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.AuthLogin(provider);
  }

  private AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((credential) => {
      this.ngZone.run(() => {
        if (credential.additionalUserInfo.isNewUser == true){
          console.log(credential.additionalUserInfo.isNewUser);
          this.router.navigate(['survey']);
        } else {
          this.router.navigate(['home-page']);
        }
      })
      this.SetUserData(credential.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  private SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    
    const userData: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      roles: {
        editor: true
      }
 
    }
  return userRef.set(userData, {merge: true})
  }

  // Sign out
  async SignOut() {
    await this.afAuth.signOut();
    this.router.navigate(['login']);
  }
  Survey(uid, displayName, DoB, age, experience, languages, reasons){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    return userRef.update({displayName, DoB, age, experience, languages, reasons}); 
  }

  SettingsProfileSave(uid, displayName, DoB, age, email){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    return userRef.update({displayName, DoB, age, email}); 
  }

  SettingsPrefSave(uid, languages, experience, reason){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    return userRef.update({languages, experience, reason}); 
  }

  addPost(title, content, uid, displayName) {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    this.afs.collection('posts/').add({'title': title, 'content': content, 'uid': uid, 'displayName': displayName, 'createdDate': timestamp});
  }

  addComment(content, uid, displayName, postId) {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    console.log(postId);
    this.afs.collection('posts/').doc(postId).collection('comments').add({'content': content, 'uid': uid, 'displayName': displayName, 'createdDate': timestamp});
  }

  deletePost(postId) {
    this.afs.doc('posts/'+postId).delete();
  }


  ///// Role-based Authorization //////

  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber']
    return this.checkAuthorization(user, allowed)
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor']
    return this.checkAuthorization(user, allowed)
  }

  canDelete(user: User): boolean {
    const allowed = ['admin']
    return this.checkAuthorization(user, allowed)
  }

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if ( user.roles[role] ) {
        return true
      }
    }
    return false
  }
  
}
