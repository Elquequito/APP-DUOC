import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
  user: any = {}; // Datos del usuario
  asistencia: Asistencia[] = []; // Datos de la asistencia
  isProfessor: boolean = false; // Para verificar si el usuario es profesor

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.loadUserData(); // Cargar datos del usuario al iniciar
    this.loadAsistencia(); // Cargar asistencia al iniciar
  }

  loadUserData() {
    this.afAuth.authState.subscribe((firebaseUser) => {
      if (firebaseUser) {
        // Obtener datos del usuario desde Firestore usando el UID
        this.firestore.collection('users').doc(firebaseUser.uid).valueChanges().subscribe((userData: any) => {
          this.user = {
            ...userData,
            email: firebaseUser.email, // Asigna el correo de Firebase
          };

          // Verificar si el correo del usuario termina con '@profesor.duoc.cl'
          if (this.user.email && this.user.email.endsWith('@profesor.duoc.cl')) {
            this.isProfessor = true; // El usuario es profesor
          } else {
            this.isProfessor = false; // El usuario no es profesor
            alert('Acceso restringido a usuarios con correo institucional.');
            this.router.navigate(['/sign-in']); // Redirigir si no es profesor
          }

          // Verificar si el usuario tiene un displayName, si no lo tiene, usar su correo como nombre
          if (!this.user.displayName) {
            this.user.displayName = this.user.email.split('@')[0]; // Usar el correo antes del '@' como nombre por defecto
          }

          // Guardar en localStorage para persistencia
          localStorage.setItem('user', JSON.stringify(this.user));
        });
      } else {
        // Si no hay usuario en Firebase, cargar desde localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          this.user = JSON.parse(storedUser);
        }
      }
    });
  }

  loadAsistencia() {
    if (this.isProfessor) {
      const storedAsistencia = localStorage.getItem('asistencia');
      const asistenciaArray = storedAsistencia ? JSON.parse(storedAsistencia) : [];

      // Mapear asistencia para incluir el nombre del usuario que escaneó
      this.asistencia = asistenciaArray.map((item: { fecha: string; codigo: string }) => ({
        fecha: this.formatFecha(item.fecha), // Formatear la fecha
        codigo: item.codigo,
        nombre: this.user.displayName || 'Desconocido' // Mostrar nombre completo del docente o "Desconocido"
      }));
    }
  }

  // Método para formatear la fecha
  formatFecha(fecha: string): string {
    const dateParts = fecha.split(' - '); // Asumiendo que la fecha viene en formato "DD/MM/YYYY - HH:MM"
    return `${dateParts[0]} - ${dateParts[1]}`; // Retornar solo la fecha y la hora
  }

  salir() {
    localStorage.removeItem('user');
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/sign-in']);
    });
  }

  goToQrGenerator() {
    this.router.navigate(['/generar-qr']); // Usa '/generar-qr' si esta es la ruta correcta
  }
}
