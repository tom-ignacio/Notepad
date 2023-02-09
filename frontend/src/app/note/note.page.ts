import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {

  constructor(private http : HttpClient) { }

  ngOnInit() {
  }


  sendDataNote(noteTitle: any, description: any) {

    let noteJSON = {
      title: noteTitle.value,
      description: description.value
    }

    this.http.post("http://localhost:3000/notepad", noteJSON)
    .subscribe( (res) => console.log(res) , (err) => console.log(err));
    console.log(noteJSON);

  }



}
