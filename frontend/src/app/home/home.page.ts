import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AlertController} from '@ionic/angular';
import { Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})



export class HomePage implements OnInit {

  notes: any = []

  constructor(private http : HttpClient, private alertController : AlertController, private router : Router) {}

  loadNotes(){
    let user = localStorage.getItem('User');
    this.http.get('http://localhost:3000/notepad/' +  user)
    .subscribe(res => this.notes = res, err => console.log(err));

  }

  ngOnInit() {
    this.loadNotes();
  }

  ionViewWillEnter(){
    this.loadNotes();
  }

  async logOut(){

    const alert =  await this.alertController.create({
      header: 'LogOut',
      message: 'Are you sure you want to log out?',
      buttons: [{
        text: 'Yes',
        handler: () => {
         localStorage.clear();
         this.router.navigate(['/login']);
        }

      }, 'No']
    });

      await alert.present();
  }


}
