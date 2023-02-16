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

  constructor(private http : HttpClient, private alertController : AlertController, private router : Router) { }

  loadCategories(){
    let user = localStorage.getItem('User');
    this.http.get('http://localhost:3000/category/' + user )
    .subscribe(res => this.categories = res, async err => {
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

  async deleteCategorie(id: any){
    const alert =  await this.alertController.create({
        header: 'Delete this categorie',
        message: 'Are you sure you want to delete this categorie?',
        buttons: [{
          text: 'Yes',
          handler: () => {
            this.http.delete('http://localhost:3000/category/' + id)
            .subscribe( (res) => this.router.navigate(['/categories']) , async (err) => {
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
