import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotesCategoriePage } from './notes-categorie.page';

const routes: Routes = [
  {
    path: '',
    component: NotesCategoriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesCategoriePageRoutingModule {}
