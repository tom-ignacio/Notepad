import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API = 'http://localhost:3000/signin'
  username: any;
  password: any;

  constructor(
    private http: HttpClient
  ) { }

    sendData(  username: any, password: any) {
      let cre = {
        username: this.username,
        password: this.password
      };
      this.http.post("http://localhost:3000/signin", cre).subscribe(
        (res) => {
          localStorage.setItem("User", JSON.stringify(res));
          //this.router.navigateByUrl("/RUTA-DE-NOTAS");
        },
        (error) => {
          console.log(error);
        }
      );
  
      console.log(cre);
      }
    
    
    
    /* sendData(username: any, password: any){
      this.http.post(this.API, {username, password}
      )
    }*/

}
