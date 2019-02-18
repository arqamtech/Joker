import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { User } from 'src/app/models/user.model';
import * as firebase from 'firebase';
import * as moment from 'moment';
// import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userColl: AngularFirestoreCollection<User> = this.db.collection<User>('Users');


  constructor(
    public db: AngularFirestore,
  ) {
  }

  getUser() {
    let id : string;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        id = user.uid;
      }
    });
    return this.userColl.doc<User>(user.uid).valueChanges();
  }



  updateLastLogin() {
    // let newUser : User = this.getUser();

    // return this.userColl.doc<User>(firebase.auth().currentUser.uid).update(user);
  }

  addUser(user: User) {
    return this.userColl.doc<User>(firebase.auth().currentUser.uid).set(user);
  }

}
