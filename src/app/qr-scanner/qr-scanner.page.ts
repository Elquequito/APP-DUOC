import { Component } from '@angular/core';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage {
  scannedCode: string | null = null; // Almacena el código escaneado

  constructor() {}

  // Función que simula el escaneo de un código QR
  simulateScan() {
    // Simula un código QR escaneado
    this.scannedCode = "QR123456"; // Ejemplo de código QR
  }
}
