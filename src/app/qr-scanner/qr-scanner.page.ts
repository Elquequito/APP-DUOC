import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx'; // Importar QRScanner

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage {
  scannedCode: string | null = null; // Variable para almacenar el código escaneado

  constructor(
    private router: Router,
    private qrScanner: QRScanner // Inyectar el servicio QRScanner
  ) {}

  // Método para iniciar el escaneo
  startScan() {
    // Primero, pedimos permiso para usar la cámara
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        // Si el usuario permite el uso de la cámara, iniciamos el escaneo
        this.qrScanner.show(); // Muestra la cámara

        // Escuchar el código QR escaneado
        this.qrScanner.scan().subscribe((text: string) => {
          this.scannedCode = text; // Guardar el código escaneado
          this.qrScanner.hide(); // Ocultar la cámara después de escanear

          // Registrar la asistencia
          this.registerAsistencia(text);
        });
      } else {
        // Si el permiso es denegado, mostramos un mensaje de alerta
        console.log('Permiso de cámara denegado');
        alert('No se pudo acceder a la cámara. Asegúrese de tener permisos.');
      }
    }).catch((e: any) => {
      // Manejo de errores en caso de fallos al acceder a la cámara
      console.log('Error al acceder a la cámara', e);
      alert('Ocurrió un error al intentar acceder a la cámara.');
    });
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

    // Mostrar un mensaje de confirmación al usuario
    alert(`Asistencia Confirmada: ${formattedDate}`);
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
