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

  dataProfile: any = {
    lastName: '',
    name: '',
    password: '',
    username: '',
    _id: ''
  }

  errorHandler = {
    error: '',
    headers: '',
    message: '',
    name: '',
    ok: '',
    status: '',
    statusText: '',
    url: ''
  }

  user = localStorage.getItem('User')

  constructor(private http : HttpClient, private alertController : AlertController, private router : Router) { }



  ngOnInit() {
   this.http.get('https://backend-notepad-production.up.railway.app/user/' +  this.user)
    .subscribe(res => {
      this.userProfile = res;
      this.dataProfile = this.userProfile[0];
    }  , async err => {
      this.errorHandler = err;
      let msg = JSON.stringify(this.errorHandler.error);
      const alert =  await this.alertController.create({
        header: 'Error',
        message: msg,
        buttons: ['try again']
      });
  
        await alert.present();
    })

  }

  updateProfile() {
    let updateProfileJSON = {
      username: this.dataProfile.username,
      lastName: this.dataProfile.lastName,
      name: this.dataProfile.name,
      password: this.dataProfile.password,
    }

    this.http.put('https://backend-notepad-production.up.railway.app/userU/' +  this.user, updateProfileJSON )
    .subscribe( async (res) => {
      const alert =  await this.alertController.create({
        header: 'Update',
        message: 'your changes were successfully saved',
        buttons: ['okay']
      });
  
        await alert.present();
    }, async (err) => {
      this.errorHandler = err;
      let msg = JSON.stringify(this.errorHandler.error);
      const alert =  await this.alertController.create({
        header: 'Error',
        message: msg,
        buttons: ['try again']
      });
  
        await alert.present();
    });


  }

  async deleteUser(){
      const alert =  await this.alertController.create({
        header: 'Delete this user',
        message: 'Are you sure you want to delete this user?',
        buttons: [{
          text: 'Yes',
          handler: () => {
            this.http.delete('https://backend-notepad-production.up.railway.app/userU/' +  this.user)
            .subscribe( (res) => {
              localStorage.clear();
              this.router.navigate(['/login']);
            } , async (err) => {
              this.errorHandler = err;
              let msg = JSON.stringify(this.errorHandler.error);
              const alert =  await this.alertController.create({
                header: 'Error',
                message: msg,
                buttons: ['try again']
              });
          
                await alert.present();
            });
          }
  
        }, 'No']
      });
      await alert.present();
    }

}
