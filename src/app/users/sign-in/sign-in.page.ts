import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  email: string = '';
  password: string = '';
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  emailError: string = ''; // Propiedad para almacenar mensajes de error del email

  constructor(private router: Router, private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.loadUserData(); // Cargar datos del usuario al iniciar
  }

  // Método para cargar los datos del usuario desde localStorage
  loadUserData() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.email = user.email || ''; // Asignar el email si existe
      // No asignamos la contraseña por razones de seguridad
    }
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordType === 'text' ? 'eye' : 'eye-off';
  }

  // Método para validar el email
  validateEmail() {
    if (!this.email.endsWith('@duocuc.cl')) {
      this.emailError = 'El correo debe ser de un usuario de Duoc UC';
      return false; // Retorna false si el email no es válido
    }
    this.emailError = ''; // Resetea el mensaje de error si el email es válido
    return true; // Retorna true si el email es válido
  }

  onLogin() {
    if (!this.validateEmail()) {
      alert(this.emailError); // Muestra el mensaje de error
      return; // Si el email no es válido, no proceder
    }

    this.firebaseService.signIn(this.email, this.password)
      .then(() => {
        alert('Inicio de sesión exitoso');
        this.router.navigate(['/profile']);
      })
      .catch((error) => {
        alert('Error en el inicio de sesión: ' + error.message);
      });
  }

  onRegister() {
    this.firebaseService.signUp(this.email, this.password)
      .then(() => {
        alert('Registro exitoso');
        this.router.navigate(['/profile']);
      })
      .catch((error) => {
        alert('Error en el registro: ' + error.message);
      });
  }
}
