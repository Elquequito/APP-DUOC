import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit() {}

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text'; // Cambiar a texto plano
      this.passwordIcon = 'eye';  // Cambiar ícono a 'eye' (mostrar)
    } else {
      this.passwordType = 'password'; // Cambiar a contraseña oculta
      this.passwordIcon = 'eye-off';  // Cambiar ícono a 'eye-off' (ocultar)
    }
  }

  // Método para verificar el formato del email
  validateEmail() {
    // Verifica si el email termina en @duocuc.cl o @profesor.duoc.cl
    if (this.email.endsWith('@duocuc.cl') || this.email.endsWith('@profesor.duoc.cl')) {
      this.emailError = ''; // Eliminar mensaje de error
      this.isEmailValid = true; // El email es válido
    } else {
      this.emailError = 'El email ingresado debe ser de DuocUC o del profesor';
      this.isEmailValid = false; // El email no es válido
    }
  }

  // Método para manejar el registro en sign-up
  onRegister() {
    this.validateEmail(); // Validar el email antes de continuar

    if (!this.isEmailValid) {
      alert('Por favor ingresa un email válido de DuocUC o del profesor');
      return; // Detener el registro si el email no es válido
    }

    if (this.email && this.password) {
      const user = { email: this.email, password: this.password };
      localStorage.setItem('user', JSON.stringify(user)); // Almacenar el usuario como objeto
      alert('Registro exitoso');
      this.router.navigate(['/sign-in']); // Redirigir al inicio de sesión
    } else {
      alert('Por favor completa todos los campos');
    }
  }
}
