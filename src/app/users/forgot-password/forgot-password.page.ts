import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  message: string = ''; // Mensaje de retroalimentación

  constructor(private authService: AuthService) {}

  // Maneja el restablecimiento de la contraseña
  onResetPassword(email: any) {
    const emailValue = email ? email.toString().trim() : ''; // Convertir a string y eliminar espacios
    if (emailValue) {
      this.authService.resetPassword(emailValue)
        .then(() => {
          this.message = 'Se ha enviado un enlace de restablecimiento de contraseña a tu correo (simulado).';
        })
        .catch(error => {
          this.message = 'Error: ' + error;
        });
    } else {
      this.message = 'Por favor, ingresa un correo electrónico válido.';
    }
  }
}
