import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage {
  scannedCode: string | null = null; // Variable para almacenar el código escaneado

  constructor(private router: Router) {}

  // Método para simular el escaneo
  simulateScan() {
    // Simulación de código QR escaneado
    this.scannedCode = "EjemploCódigoQR"; 

    // Llamar al método para registrar la asistencia
    this.registerAsistencia(this.scannedCode);
  }

  // Método para registrar la asistencia
  registerAsistencia(qrData: string) {
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate); // Formatear la fecha

    // Obtener el nombre del usuario desde localStorage
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : {};
    const userName = user.displayName || 'Desconocido'; // Nombre del usuario, por defecto 'Desconocido'

    const newAsistencia = {
      fecha: formattedDate,
      codigo: qrData, // Guardar el código escaneado
      nombre: userName, // Agregar el nombre del usuario
      estado: 'Presente',
    };

    // Cargar la asistencia desde localStorage
    const storedAsistencia = localStorage.getItem('asistencia');
    const asistenciaArray = storedAsistencia ? JSON.parse(storedAsistencia) : [];

    // Añadir nueva entrada de asistencia
    asistenciaArray.push(newAsistencia);
    localStorage.setItem('asistencia', JSON.stringify(asistenciaArray)); // Guardar en localStorage

    alert('Asistencia registrada exitosamente: ' + formattedDate);
  }

  // Método para formatear la fecha
  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }

  // Método para volver al perfil y actualizarlo
  goBack() {
    this.router.navigate(['/profile']); // Redirigir a la página de perfil
  }
}
