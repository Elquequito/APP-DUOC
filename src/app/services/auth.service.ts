import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: { email: string; password: string; displayName?: string; career?: string; photoURL?: string }[] = [];
  private currentUser: { email: string; displayName?: string; career?: string; photoURL?: string } | null = null;

  constructor() {}

  // Simular registro de usuario
  signUp(email: string, password: string, displayName?: string, career?: string, photoURL?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const existingUser = this.users.find(user => user.email === email);

      if (existingUser) {
        reject('El usuario ya existe');
      } else {
        const newUser = { email, password, displayName, career, photoURL };
        this.users.push(newUser);
        resolve({ email, displayName, career, photoURL });
      }
    });
  }

  // Simular inicio de sesión
  signIn(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const user = this.users.find(user => user.email === email && user.password === password);

      if (user) {
        this.currentUser = {
          email: user.email,
          displayName: user.displayName,
          career: user.career,
          photoURL: user.photoURL,
        };
        resolve(this.currentUser); // Devolver el usuario actual
      } else {
        reject('Credenciales incorrectas');
      }
    });
  }

  // Obtener el usuario actual
  getUser(): Observable<any> {
    return of(this.currentUser); // Devuelve un observable con el usuario actual
  }

  // Simular cierre de sesión
  signOut(): Promise<void> {
    return new Promise((resolve) => {
      this.currentUser = null; // Restablece el usuario actual
      resolve();
    });
  }

  // Simular restablecimiento de contraseña
  resetPassword(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const user = this.users.find(user => user.email === email);

      if (user) {
        resolve(); // Simular envío de correo de restablecimiento de contraseña
      } else {
        reject('Correo no encontrado');
      }
    });
  }
}
