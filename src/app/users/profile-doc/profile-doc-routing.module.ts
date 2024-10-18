import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileDocPage } from './profile-doc.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileDocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileDocPageRoutingModule {}
