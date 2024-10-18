import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-doc',
  templateUrl: './inicio-doc.page.html',
  styleUrls: ['./inicio-doc.page.scss'],
})
export class InicioDocPage implements OnInit {
  email: string = ''; // Propiedad para almacenar el email
  password: string = ''; // Propiedad para almacenar la contraseña
  passwordType: string = 'password'; // Tipo de campo de contraseña (por defecto 'password')
  passwordIcon: string = 'eye-off'; // Ícono de visibilidad (por defecto 'eye-off')
  emailError: string = ''; // Propiedad para almacenar el mensaje de error del email

  constructor(private router: Router) {}

  ngOnInit() {}

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordType === 'password' ? 'eye-off' : 'eye';
  }

  // Método para verificar el formato del email
  validateEmail() {
    if (!this.email.endsWith('@profesor.duoc.cl')) {
      this.emailError = 'El correo debe ser de un docente';
      return;
    }

    // Verificar si el email es válido
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.emailError = user.email === this.email ? '' : 'Correo no registrado';
    } else {
      this.emailError = 'Correo no registrado';
    }
  }

  // Método para manejar el inicio de sesión
  onLogin() {
    if (this.email && this.password) {
      this.validateEmail(); // Validar el email antes de continuar

      if (this.emailError) {
        return; // Si hay un error en el email, no proceder
      }

      // Lógica de autenticación (ejemplo básico)
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === this.email && this.password === user.password) {
          alert('Inicio de sesión exitoso');
          this.router.navigate(['/profile-doc']);
        } else {
          alert('Credenciales incorrectas');
        }
      }
    } else {
      alert('Por favor completa todos los campos');
    }
  }
}
