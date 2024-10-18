import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioDocPage } from './inicio-doc.page';

const routes: Routes = [
  {
    path: '',
    component: InicioDocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioDocPageRoutingModule {}
