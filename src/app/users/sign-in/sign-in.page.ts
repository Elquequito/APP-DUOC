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

  constructor(private router: Router) {}

  ngOnInit() {}

  // Método para manejar el inicio de sesión
  onLogin() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    // Simulación de autenticación simple
    if (this.email === 'test@example.com' && this.password === '123456') {
      this.router.navigate(['/profile']); // Redirige si las credenciales son correctas
    } else {
      alert('Credenciales incorrectas'); // Alerta si son incorrectas
    }
  }
}
