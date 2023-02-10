import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  sendDataRegister(usernameRegister: any, passwordRegister: any, firstNameRegister: any, lastNameRegister: any){
    let registerJSON = {
      username: usernameRegister.value,
      name: firstNameRegister.value,
      lastName: lastNameRegister.value,
      password: passwordRegister.value
    }
    this.http.post("http://localhost:3000/signup", registerJSON)
    .subscribe( (res) => {this.router.navigate(['/login']); console.log(res)}, (err) => console.log(err));
    console.log(registerJSON);
  }

}
