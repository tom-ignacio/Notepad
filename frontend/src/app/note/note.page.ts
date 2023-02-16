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
    description: '',
    category: 'default'
  }

  categories: any = []

  errorHandler = {
    error: '',
    headers: '',
    message: '',
    name: '',
    ok: '',
    status: '',
    statusText: '',
    url: ''
  }

user = localStorage.getItem('User')

  constructor(private http : HttpClient, private router: Router, private activateRoute: ActivatedRoute, private alertController: AlertController) { }



  ngOnInit() {
    this.activateRoute.paramMap.subscribe((paramMap) => {
      let idNote = paramMap.get('id')
      if (idNote) {
        this.editing = true;
        this.http.get('https://backend-notepad-production.up.railway.app/notepadI/' + idNote)
        .subscribe(res => {
          this.thisNote = res;
        })

      }
    })
    this.http.get('https://backend-notepad-production.up.railway.app/category/' + this.user )
    .subscribe(res => this.categories = res, async err => {
      this.errorHandler = err;
      let msg = JSON.stringify(this.errorHandler.error);
      const alert =  await this.alertController.create({
        header: 'Error',
        message: msg,
        buttons: ['try again']
      });
  
        await alert.present();
    });
  }


  sendDataNote() {


    let noteJSON = {
      title: this.thisNote.title,
      description: this.thisNote.description,
      owner: this.user,
      category:  this.thisNote.category

    }

    this.http.post("https://backend-notepad-production.up.railway.app/notepad", noteJSON)
    .subscribe( (res) => this.router.navigate(['/home']), async (err) => {
      this.errorHandler = err;
      let msg = JSON.stringify(this.errorHandler.error);
      const alert =  await this.alertController.create({
        header: 'Error',
        message: msg,
        buttons: ['try again']
      });
  
        await alert.present();
    });

  }

  updateNote(){
    
    let noteJSON = {
      title: this.thisNote.title,
      description: this.thisNote.description,
      category:  this.thisNote.category
    }

    this.http.put('https://backend-notepad-production.up.railway.app/notepad/' + this.thisNote._id, noteJSON)
    .subscribe( (res) => this.router.navigate(['/home']), async (err) => {
      this.errorHandler = err;
      let msg = JSON.stringify(this.errorHandler.error);
      const alert =  await this.alertController.create({
        header: 'Error',
        message: msg,
        buttons: ['try again']
      });
  
        await alert.present();
    });

  }

  async deleteNote(){
      const alert =  await this.alertController.create({
        header: 'Delete this note',
        message: 'Are you sure you want to delete this note?',
        buttons: [{
          text: 'Yes',
          handler: () => {
            this.http.delete('https://backend-notepad-production.up.railway.app/notepad/' + this.thisNote._id)
            .subscribe( (res) => this.router.navigate(['/home']) , (err) => console.log(err));
          }
  
        }, 'No']
      });
      await alert.present();   
  }

  

}
