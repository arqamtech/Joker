import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../Services/Auth/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import * as moment from 'moment';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  user: User = {
    name: '',
    mail: '',
    pass: '',
  }

  constructor(
    public authSer: AuthService,
    public toastCtrl: ToastController,
    public router: Router,
    public loadingCtrl: LoadingController,
  ) {    
  }

  ngOnInit() {
  }



  checkData() {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.user.mail) {
      if (this.user.mail.match(mailformat)) {
        if (this.user.pass) {
          this.login();
        } else { this.presentToast("Enter password"); }
      } else { this.presentToast("Email Address badly formatted"); }
    } else { this.presentToast("Enter Email Address"); }
  }

  login() {

    firebase.auth().createUserWithEmailAndPassword(this.user.mail, this.user.pass).catch((e) => {
      let err = e.message;
      this.presentToast(err);
    }).then(() => {
      this.addUser();
      this.router.navigateByUrl('dashboard');
    })
  }

  addUser() {
    let cTime = moment().format();
    this.user.created = cTime;
    this.user.lastlogin=cTime;    
    this.user.verified = false;    
    this.authSer.addUser(this.user);
  }
  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Done'
    });
    toast.present();
  }

  async presentLoading(action, msg) {
    const loading = await this.loadingCtrl.create({
      message: msg,
    });

    switch (action) {
      case 'start': await loading.present();
        break;
      case 'stop': await loading.dismiss(); console.log("stopping");

        break;

      default: await loading.dismiss();
        break;
    }

  }

}


