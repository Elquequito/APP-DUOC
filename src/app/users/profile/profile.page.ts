import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = {}; // Datos del usuario
  asistencia: any[] = []; // Propiedad para almacenar la asistencia

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.loadUserData(); // Cargar datos del usuario al iniciar
    this.loadAsistencia(); // Cargar asistencia al iniciar
  }

  // Cargar la información del usuario desde Firebase
  loadUserData() {
    this.afAuth.authState.subscribe((firebaseUser) => {
      if (firebaseUser) {
        // Obtener datos del usuario desde Firestore usando el UID
        this.firestore.collection('users').doc(firebaseUser.uid).valueChanges().subscribe((userData: any) => {
          this.user = {
            ...userData,
            email: firebaseUser.email, // Asigna el correo de Firebase
          };
        });
      }
    });
  }

  // Cargar la asistencia desde localStorage
  loadAsistencia() {
    const storedAsistencia = localStorage.getItem('asistencia');
    this.asistencia = storedAsistencia ? JSON.parse(storedAsistencia) : [];
  }

  // Método para cerrar sesión
  salir() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/sign-in']);
    });
  }

  // Método para redirigir al escáner QR
  goToQrScanner() {
    this.router.navigate(['/qr-scanner']);
  }
}
