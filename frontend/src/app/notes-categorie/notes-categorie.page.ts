import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-notes-categorie',
  templateUrl: './notes-categorie.page.html',
  styleUrls: ['./notes-categorie.page.scss'],
})
export class NotesCategoriePage implements OnInit {

  user = localStorage.getItem('User')

  constructor(private http : HttpClient, private router: Router, private activateRoute: ActivatedRoute, private alertController: AlertController) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe((paramMap) => {
      let idCategorie = paramMap.get('idCat');
      console.log('http://localhost:3000/notepadC/' + this.user + '/' + idCategorie)
      //this.http.get()

  })
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
