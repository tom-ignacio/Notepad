import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotesCategoriePageRoutingModule } from './notes-categorie-routing.module';

import { NotesCategoriePage } from './notes-categorie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotesCategoriePageRoutingModule
  ],
  declarations: [NotesCategoriePage]
})
export class NotesCategoriePageModule {}
