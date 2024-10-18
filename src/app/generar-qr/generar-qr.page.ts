import { Component } from '@angular/core';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQrPage {
  qrCode: string | null = null; // Propiedad para almacenar el código QR generado
  inputText: string = ''; // Propiedad para el texto o URL a codificar

  constructor() {}

  // Método para generar el código QR
  async generateQRCode() {
    if (!this.inputText.trim()) {
      alert('Por favor, ingresa un texto o URL para generar el QR.');
      return;
    }
    
    try {
      this.qrCode = await QRCode.toDataURL(this.inputText); // Usar el texto ingresado
    } catch (err) {
      console.error(err);
    }
  }
}
