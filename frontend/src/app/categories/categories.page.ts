import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AlertController} from '@ionic/angular';
import { Router} from '@angular/router';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categories: any = []

  constructor(private http : HttpClient, private alertController : AlertController, private router : Router) { }

  loadCategories(){
    let user = localStorage.getItem('User');
    this.http.get('http://localhost:3000/category/' + user )
    .subscribe(res => this.categories = res, err => console.log(err));

  }

  ngOnInit() {
    this.loadCategories();
  }

  ionViewWillEnter(){
    this.loadCategories();
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
