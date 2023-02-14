import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {

  editing = false;

  thisNote : any = {
    _id: '',
    title: '',
    description: ''
   // owner : localStorage.getItem('user')
  }

user = localStorage.getItem('User')

  constructor(private http : HttpClient, private router: Router, private activateRoute: ActivatedRoute, private alertController: AlertController) { }



  ngOnInit() {
    this.activateRoute.paramMap.subscribe((paramMap) => {
      let idNote = paramMap.get('id')
      if (idNote) {
        this.editing = true;
        this.http.get('http://localhost:3000/notepadI/' + idNote)
        .subscribe(res => {
          this.thisNote = res;
          console.log(this.thisNote);
        })

      }
    })
  }


  sendDataNote() {


    let noteJSON = {
      title: this.thisNote.title,
      description: this.thisNote.description,
      owner: this.user
    }

    this.http.post("http://localhost:3000/notepad", noteJSON)
    .subscribe( (res) => {this.router.navigate(['/home'])}, (err) => console.log(err));
    //console.log(noteJSON);

  }

  updateNote(){
    
    let noteJSON = {
      title: this.thisNote.title,
      description: this.thisNote.description
      //owner: 
    }

    this.http.put('http://localhost:3000/notepad/' + this.thisNote._id, noteJSON)
    .subscribe( (res) => {this.router.navigate(['/home']); console.log(res)}, (err) => console.log(err));
    console.log(noteJSON);

  }

  async deleteNote(){
    if (this.editing == true) {
      const alert =  await this.alertController.create({
        header: 'Delete this note',
        message: 'Are you sure you want to log out?',
        buttons: [{
          text: 'Yes',
          handler: () => {
            this.http.delete('http://localhost:3000/notepad/' + this.thisNote._id)
            .subscribe( (res) => this.router.navigate(['/home']) , (err) => console.log(err));
          }
  
        }, 'No']
      });
      await alert.present();
    } else {
      const alert =  await this.alertController.create({
        header: 'Action not required',
        message: 'You cannot delete this note because it is not yet created. Press "okay" to continue.',
        buttons: ['okay']
      });
      await alert.present();
    }
    

      
  }

  

}
