import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  email: string = ''; // Propiedad para almacenar el email
  password: string = ''; // Propiedad para almacenar la contraseña
  passwordType: string = 'password'; // Tipo de campo de contraseña (por defecto 'password')
  passwordIcon: string = 'eye-off'; // Ícono de visibilidad (por defecto 'eye-off')

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

  // Método para manejar el inicio de sesión en sign-in
  onLogin() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    // Obtener los datos del localStorage
    const storedUser = localStorage.getItem('user'); // Obtiene el usuario como objeto
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser); // Convertir el JSON en objeto

      // Verificar si los datos coinciden
      if (this.email === parsedUser.email && this.password === parsedUser.password) {
        this.router.navigate(['/profile']); // Si es correcto, redirigir al perfil
      } else {
        alert('Credenciales incorrectas');
      }
    } else {
      alert('Cuenta no registrada');
    }
  }

}
