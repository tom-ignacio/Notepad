import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {

  constructor(private http : HttpClient, private router: Router) { }

  ngOnInit() {
  }


  sendDataNote(noteTitle: any, description: any) {

    let noteJSON = {
      title: noteTitle.value,
      description: description.value
    }

    this.http.post("http://localhost:3000/notepad", noteJSON)
    .subscribe( (res) => {this.router.navigate(['/home']); console.log(res)}, (err) => console.log(err));
    console.log(noteJSON);

  }



}
