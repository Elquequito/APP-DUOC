import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: { email: string; password: string }[] = [];

  constructor() {}

  // Simular registro de usuario
  signUp(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const existingUser = this.users.find(user => user.email === email);

      if (existingUser) {
        reject('El usuario ya existe');
      } else {
        this.users.push({ email, password });
        resolve({ email });
      }
    });
  }

  // Simular inicio de sesión
  signIn(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const user = this.users.find(user => user.email === email && user.password === password);

      if (user) {
        resolve({ email });
      } else {
        reject('Credenciales incorrectas');
      }
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
