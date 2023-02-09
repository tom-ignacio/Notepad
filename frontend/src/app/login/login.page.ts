import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms'

import {HttpClient} from '@angular/common/http'

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor( private loginService: LoginService, private http: HttpClient) { 
    
  }

  ngOnInit() {
  }

  /*sendData(username: any, password: any) {
    //console.log(username.value, password.value)
    this.loginService.sendData(username.value, password.value)
    //.subscribe( res=> console.log(res), err => console.error(err) )
  } */

  sendData(  username: any, password: any) {
    let loginJSON = {
      username: username.value,
      password: password.value
    };

    this.http.post("http://localhost:3000/signin", loginJSON)
    .subscribe( (res) => console.log(res) , (err) => console.log(err));
    console.log(loginJSON);

    }

}
