import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AlertController} from '@ionic/angular';
import { Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userProfile: any = {
    lastName: '',
    name: '',
    password: '',
    username: '',
    _id: ''
  }

  user = localStorage.getItem('User')

  constructor(private http : HttpClient, private alertController : AlertController, private router : Router) { }

  getProfile() {
    //console.log(user)
    this.http.get('http://localhost:3000/user/' +  this.user)
    .subscribe(res => this.userProfile = res /*console.log(res)*/ , err => console.log(err))
    console.log(this.userProfile);
  }

  ngOnInit() {
    this.getProfile();
  }

  async deleteUser(){
      const alert =  await this.alertController.create({
        header: 'Delete this user',
        message: 'Are you sure you want to delete this user?',
        buttons: [{
          text: 'Yes',
          handler: () => {
            this.http.delete('http://localhost:3000/userU/' +  this.user)
            .subscribe( (res) => {
              localStorage.clear();
              this.router.navigate(['/login']);
            } , (err) => console.log(err));
          }
  
        }, 'No']
      });
      await alert.present();
    }

}
