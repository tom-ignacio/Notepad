import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API = 'http://localhost:3000/signin'
  constructor(
    private http: HttpClient
  ) { }

    sendData(username: any, password: any){
      this.http.post(this.API, {username, password}
      )
    }

}
