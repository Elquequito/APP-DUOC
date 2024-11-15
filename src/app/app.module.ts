import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { QRScanner } from '@ionic-native/qr-scanner/ngx'; // Importar QRScanner

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Firebase imports
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Si usas autenticación
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Usando la configuración de Firebase
    AngularFireAuthModule // Solo si usas autenticación con Firebase
  ],
  providers: [
    QRScanner, // Agregar QRScanner al array de providers
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
