import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {}

  // =============== Autenticación ===============

  // ====== Acceder ======
  signIn(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          // Guardar información del usuario en localStorage
          localStorage.setItem('user', JSON.stringify({ 
            uid: userCredential.user.uid, 
            email: userCredential.user.email 
          }));
        }
        return userCredential;
      })
      .catch((error) => {
        console.error('Error en el inicio de sesión:', error);
        throw error;
      });
  }

  // ====== Registro ======
  signUp(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          // Guardar información adicional en localStorage
          localStorage.setItem('user', JSON.stringify({
            uid: userCredential.user.uid,
            email: userCredential.user.email,
          }));
        }
        return userCredential;
      })
      .catch((error) => {
        console.error('Error en el registro:', error);
        throw error;
      });
  }

// Guardar información del usuario
saveUserInfo(uid: string, userInfo: any): Promise<void> {
  return this.firestore.collection('users').doc(uid).set(userInfo)
    .then(() => {
      console.log('Información del usuario guardada correctamente');
    })
    .catch((error) => {
      console.error('Error al guardar la información del usuario:', error);
      throw error;
    });
}
}
