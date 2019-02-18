import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AuthService } from '../Services/Auth/auth.service';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    public router: Router,
    public plt : Platform,
    public authSer: AuthService,
  ) {
    this.plt.ready().then(()=>{

      console.log(this.authSer.getUser());
    })

  }

  ngOnInit() {

  }

  signOut() {
    firebase.auth().signOut().then(() => {
      this.router.navigateByUrl('/login');
    })
  }

}
