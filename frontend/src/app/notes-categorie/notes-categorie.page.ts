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

  notesCategorie: any = []

  user = localStorage.getItem('User')

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

  constructor(private http : HttpClient, private router: Router, private activateRoute: ActivatedRoute, private alertController: AlertController) { }

  loadNotesByCategorie() {
    this.activateRoute.paramMap.subscribe((paramMap) => {
      let idCategorie = paramMap.get('idCat');
      this.http.get('https://backend-notepad-production.up.railway.app/notepadC/' + this.user + '/' + idCategorie)
      .subscribe( (res) => this.notesCategorie = res , async (err) => {
        this.errorHandler = err;
        let msg = JSON.stringify(this.errorHandler.error);
        const alert =  await this.alertController.create({
          header: 'Error',
          message: msg,
          buttons: ['try again']
        });
    
          await alert.present();
      });

  })
  }

  ngOnInit() {
    this.loadNotesByCategorie();
  }

  ionViewWillEnter(){
    this.loadNotesByCategorie();
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
