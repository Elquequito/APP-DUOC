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

  constructor(private router: Router) {}

  ngOnInit() {}

  onRegister() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    // Lógica de registro (puedes implementar la lógica real aquí)
    if (this.email && this.password) {
      // Simular un registro exitoso
      alert('Registro exitoso');
      this.router.navigate(['/sign-in']); // Redirigir al inicio de sesión
    } else {
      alert('Por favor completa todos los campos');
    }
  }
}
