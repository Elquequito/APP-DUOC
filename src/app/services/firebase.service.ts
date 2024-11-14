import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private auth: AngularFireAuth) {}

  // =============== Autenticación ===============

  // ====== Acceder ======
  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Guardar información del usuario en localStorage
        localStorage.setItem('user', JSON.stringify({ 
          uid: user.uid, 
          email: user.email 
        }));
        return user;
      })
      .catch((error) => {
        console.error('Error en el inicio de sesión:', error);
        throw error;
      });
  }

  // ====== Registro ======
  signUp(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Guardar información adicional en localStorage
        localStorage.setItem('user', JSON.stringify({
          uid: user.uid,
          email: user.email,
          // Puedes agregar más datos si es necesario
        }));
        return user;
      })
      .catch((error) => {
        console.error('Error en el registro:', error);
        throw error;
      });
  }
}
