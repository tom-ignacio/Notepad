import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  notes: any = []

  constructor(private http : HttpClient) {}

  loadNotes(){
    this.http.get("http://localhost:3000/notepad")
    .subscribe(res => this.notes = res , err => console.log(err))
  }

  ngOnInit() {
    this.loadNotes();
  }

  ionViewWillEnter(){
    this.loadNotes();
  }

}
