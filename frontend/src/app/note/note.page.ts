import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {

  constructor(private http : HttpClient, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.get('id')) {
        console.log("editing");
      }
    })
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
