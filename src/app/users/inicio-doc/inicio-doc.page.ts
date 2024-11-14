import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service'; // Asegúrate de importar el servicio

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

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordType === 'password' ? 'eye-off' : 'eye';
  }

  // Método para verificar el formato del email
  validateEmail() {
    if (!this.email.endsWith('@profesor.duoc.cl')) {
      this.emailError = 'El correo debe ser de un docente';
      return false; // Retorna false si el email no es válido
    }

    // Verificar si el email es válido
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.emailError = user.email === this.email ? '' : 'Correo no registrado';
      return this.emailError === ''; // Retorna true si el correo es válido
    } else {
      this.emailError = 'Correo no registrado';
      return false; // Retorna false si no hay usuario almacenado
    }
  }

  // Método para manejar el inicio de sesión
  onLogin() {
    if (this.email && this.password) {
      const isEmailValid = this.validateEmail(); // Validar el email antes de continuar

      if (!isEmailValid) {
        return; // Si hay un error en el email, no proceder
      }

      // Lógica de autenticación con Firebase
      this.firebaseService.signIn(this.email, this.password)
        .then(() => {
          alert('Inicio de sesión exitoso');
          this.router.navigate(['/profile-doc']);
        })
        .catch((error) => {
          alert('Error en el inicio de sesión: ' + error.message);
        });
    } else {
      alert('Por favor completa todos los campos');
    }
  }
}
