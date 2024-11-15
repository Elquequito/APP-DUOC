import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  email: string = ''; // Email del usuario
  password: string = ''; // Contraseña
  firstName: string = ''; // Nombre
  lastName: string = ''; // Apellido
  passwordType: string = 'password'; // Tipo del campo contraseña
  passwordIcon: string = 'eye-off'; // Icono de visibilidad
  emailError: string = ''; // Error de email
  passwordError: string = ''; // Error de contraseña
  isEmailValid: boolean = false; // Estado de validez del email
  isPasswordValid: boolean = false; // Estado de validez de la contraseña

  constructor(private router: Router, private firebaseService: FirebaseService) {}

  ngOnInit() {}

  // Alterna la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordType === 'text' ? 'eye' : 'eye-off';
  }

  // Verifica el formato del email
  validateEmail() {
    if (this.email.endsWith('@duocuc.cl') || this.email.endsWith('@profesor.duoc.cl')) {
      this.emailError = '';
      this.isEmailValid = true;
    } else {
      this.emailError = 'El email ingresado debe ser de DuocUC o del profesor';
      this.isEmailValid = false;
    }
  }

  // Verifica la validez de la contraseña (mínimo 6 caracteres)
  validatePassword() {
    if (this.password.length < 6) {
      this.passwordError = 'La contraseña debe tener al menos 6 caracteres';
      this.isPasswordValid = false;
    } else {
      this.passwordError = '';
      this.isPasswordValid = true;
    }
  }

  // Maneja el proceso de registro
  onRegister() {
    this.validateEmail();
    this.validatePassword();
  
    if (!this.isEmailValid || !this.isPasswordValid) {
      alert('Por favor ingresa un email válido de DuocUC o del profesor y una contraseña válida');
      return;
    }
  
    if (this.firstName && this.lastName && this.email && this.password) {
      this.firebaseService.signUp(this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            // Guardar los datos en localStorage
            const userData = {
              email: this.email,
              firstName: this.firstName,
              lastName: this.lastName,
              uid: user.uid // UID del usuario registrado
            };
            localStorage.setItem('user', JSON.stringify(userData));
  
            // Guardar el nombre y apellido en Firebase
            const userInfo = {
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email
            };
  
            this.firebaseService.saveUserInfo(user.uid, userInfo)
              .then(() => {
                alert('Registro exitoso');
                this.router.navigate(['/sign-in']);
              })
              .catch((error) => {
                alert('Error al guardar información del usuario: ' + error.message);
                console.error('Error:', error);
              });
          } else {
            console.error('No se pudo obtener el usuario');
          }
        })
        .catch((error) => {
          alert('Error en el registro: ' + error.message);
          console.error('Error:', error);
        });
    } else {
      alert('Por favor completa todos los campos');
    }
  }  

  isFormValid(): boolean {
    // Verifica que todos los campos necesarios no sean vacíos o nulos
    return this.isEmailValid && this.isPasswordValid && this.firstName.trim() !== '' && this.lastName.trim() !== '' && this.email.trim() !== '' && this.password.trim() !== '';
  }  
}
