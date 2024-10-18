import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Asistencia {
  fecha: string;
  codigo: string;
  nombre: string; // Nombre del docente que escaneó
}

@Component({
  selector: 'app-profile-doc',
  templateUrl: './profile-doc.page.html',
  styleUrls: ['./profile-doc.page.scss'],
})
export class ProfileDocPage implements OnInit {
  user: any = {};
  asistencia: Asistencia[] = [];
  editableName: string = '';
  isEditingName: boolean = false;
  nameEdited: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUserData();
    this.loadAsistencia(); // Cargar asistencia al iniciar
  }

  loadUserData() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.editableName = this.user.displayName || '';
      this.nameEdited = !!this.user.displayName;
    }
  }

  loadAsistencia() {
    const storedAsistencia = localStorage.getItem('asistencia');
    const asistenciaArray = storedAsistencia ? JSON.parse(storedAsistencia) : [];

    // Obtener el nombre desde localStorage
    const storedUser = localStorage.getItem('user'); // Obtener el mismo usuario
    const userProfile = storedUser ? JSON.parse(storedUser) : {};
    
    console.log('Asistencia:', asistenciaArray);
    console.log('Perfil:', userProfile);

    // Mapear asistencia para incluir el nombre del usuario que escaneó
    this.asistencia = asistenciaArray.map((item: { fecha: string; codigo: string }) => ({
      fecha: this.formatFecha(item.fecha), // Formatear la fecha
      codigo: item.codigo,
      nombre: userProfile.displayName || 'Desconocido' // Usar el nombre del perfil
    }));
  }

  // Método para formatear la fecha
  formatFecha(fecha: string): string {
    const dateParts = fecha.split(' - '); // Asumiendo que la fecha viene en formato "DD/MM/YYYY - HH:MM"
    return `${dateParts[0]} - ${dateParts[1]}`; // Retornar solo la fecha y la hora
  }

  enableEditName() {
    this.editableName = this.user.displayName;
    this.isEditingName = true;
  }

  guardarNombre() {
    if (this.editableName.trim()) {
      this.user.displayName = this.editableName;
      localStorage.setItem('user', JSON.stringify(this.user));
      alert('Nombre guardado exitosamente');
      this.isEditingName = false;
      this.nameEdited = true;
    } else {
      alert('Por favor ingresa un nombre válido.');
    }
  }

  salir() {
    localStorage.removeItem('user');
    this.router.navigate(['/sign-in']);
  }

  goToQrGenerator() {
    this.router.navigate(['/qr-generator']);
  }
}
