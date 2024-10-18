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
    this.emailError = this.email.endsWith('@duocuc.cl') ? '' : 'El email ingresado no es de DuocUC';
  }

  // Método para manejar el registro en sign-up
  onRegister() {
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
