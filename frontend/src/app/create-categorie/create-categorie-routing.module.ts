import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCategoriePage } from './create-categorie.page';

const routes: Routes = [
  {
    path: '',
    component: CreateCategoriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCategoriePageRoutingModule {}
