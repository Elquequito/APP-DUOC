import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileDocPageRoutingModule } from './profile-doc-routing.module';

import { ProfileDocPage } from './profile-doc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileDocPageRoutingModule
  ],
  declarations: [ProfileDocPage]
})
export class ProfileDocPageModule {}
