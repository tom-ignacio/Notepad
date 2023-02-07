import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms'

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor( private loginService: LoginService) { 
    
  }

  ngOnInit() {
  }

  sendData() {
    this.loginService.sendData(username.value, password.value)
    //.subscribe( res=> console.log(res), err => console.error(err) )
  }

}
