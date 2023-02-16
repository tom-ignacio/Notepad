import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

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

  constructor(private http: HttpClient, private router: Router, private alertController : AlertController) { }

  ngOnInit() {
  }

  sendDataRegister(usernameRegister: any, passwordRegister: any, firstNameRegister: any, lastNameRegister: any){
    let registerJSON = {
      username: usernameRegister.value,
      name: firstNameRegister.value,
      lastName: lastNameRegister.value,
      password: passwordRegister.value
    }
    
    let categorieJSON = {
      category: 'uncategorized',
      owner: usernameRegister.value
    }

    this.http.post("http://localhost:3000/signup", registerJSON)
    .subscribe( (res) => {
      this.http.post("http://localhost:3000/category", categorieJSON)
      .subscribe((res) => this.router.navigate(['/login']) , async (err) =>{
        this.errorHandler = err;
        let msg = JSON.stringify(this.errorHandler.error);
        const alert =  await this.alertController.create({
          header: 'Error',
          message: msg,
          buttons: ['try again']
        });
    
          await alert.present();
      });
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

}
