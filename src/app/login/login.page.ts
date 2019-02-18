import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AuthService } from '../Services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mail: string;
  pass: string;

  constructor(
    public toastController: ToastController,
    public authSer : AuthService,
    public router: Router,
  ) {

  }

  ngOnInit() {
    this.authSer.getUser();
  }



  checkData() {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.mail) {
      if (this.mail.match(mailformat)) {
        if (this.pass) {
          this.login();
        } else { this.presentToast("Enter password"); }
      } else { this.presentToast("Email Address badly formatted"); }
    } else { this.presentToast("Enter Email Address"); }
  }


  login() {
    firebase.auth().signInWithEmailAndPassword(this.mail, this.pass).catch((e) => {
      let mm = e.message;
      this.presentToast(mm);
    }).then(() => {
      this.authSer.updateLastLogin
      this.router.navigateByUrl('/dashboard');
    })
  }



  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Done'
    });
    toast.present();
  }

}
