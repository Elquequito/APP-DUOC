import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);

  // =============== Autenticación ===============

  // ====== Acceder ======
  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        // Usuario autenticado
        const user = userCredential.user;
        // Aquí puedes guardar los datos del usuario en localStorage si lo deseas
        localStorage.setItem('user', JSON.stringify({ email: user.email }));
        return user; // Retorna el objeto de usuario
      })
      .catch((error) => {
        console.error('Error en el inicio de sesión:', error);
        throw error; // Lanza el error para manejarlo en el componente
      });
  }
}
