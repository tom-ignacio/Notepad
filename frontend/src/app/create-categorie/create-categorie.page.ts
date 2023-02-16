import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-create-categorie',
  templateUrl: './create-categorie.page.html',
  styleUrls: ['./create-categorie.page.scss'],
})
export class CreateCategoriePage implements OnInit {

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

  ngOnInit() {
  }

  createCategorie(titleCateg : any) {

    let categorieJSON = {
      category: titleCateg.value,
      owner: this.user
    }

    this.http.post("http://localhost:3000/category", categorieJSON)
    .subscribe( (res) => {this.router.navigate(['/categories'])}, async (err) => {
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

}
