import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms'

import {AlertController} from '@ionic/angular';

import {HttpClient} from '@angular/common/http';
import { Router} from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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

  constructor( private loginService: LoginService, private http: HttpClient, private router: Router, private alertController : AlertController) { 
    
  }

  ngOnInit() {
  }

   sendData(  username: any, password: any) {
    let loginJSON = {
      username: username.value,
      password: password.value
    };

    this.http.post("http://localhost:3000/signin", loginJSON)
    .subscribe( (res) => {
      localStorage.setItem("User", (loginJSON.username));
      localStorage.setItem("token", JSON.stringify(res));
      //console.log(localStorage.getItem("User"));
      this.router.navigate(['/home']);
    
    }
       , async (err) => {
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
