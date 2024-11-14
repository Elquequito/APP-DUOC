import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  email: string = ''; // Propiedad para almacenar el email
  password: string = ''; // Propiedad para almacenar la contraseña
  passwordType: string = 'password'; // Tipo de campo de contraseña (por defecto 'password')
  passwordIcon: string = 'eye-off'; // Ícono de visibilidad (por defecto 'eye-off')
  emailError: string = ''; // Propiedad para almacenar el mensaje de error del email
  isEmailValid: boolean = false; // Propiedad para verificar la validez del email

  constructor(private router: Router, private firebaseService: FirebaseService) {}

  ngOnInit() {}

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordType === 'text' ? 'eye' : 'eye-off';
  }

  // Método para verificar el formato del email
  validateEmail() {
    if (this.email.endsWith('@duocuc.cl') || this.email.endsWith('@profesor.duoc.cl')) {
      this.emailError = '';
      this.isEmailValid = true;
    } else {
      this.emailError = 'El email ingresado debe ser de DuocUC o del profesor';
      this.isEmailValid = false;
    }
  }

  // Método para manejar el registro en sign-up
  onRegister() {
    this.validateEmail();

    if (!this.isEmailValid) {
      alert('Por favor ingresa un email válido de DuocUC o del profesor');
      return;
    }

    if (this.email && this.password) {
      this.firebaseService.signUp(this.email, this.password)
        .then(() => {
          alert('Registro exitoso');
          this.router.navigate(['/sign-in']);
        })
        .catch((error) => {
          alert('Error en el registro: ' + error.message);
          console.error('Error:', error);
        });
    } else {
      alert('Por favor completa todos los campos');
    }
  }
}
