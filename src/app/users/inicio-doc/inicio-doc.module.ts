import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioDocPageRoutingModule } from './inicio-doc-routing.module';

import { InicioDocPage } from './inicio-doc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioDocPageRoutingModule
  ],
  declarations: [InicioDocPage]
})
export class InicioDocPageModule {}
