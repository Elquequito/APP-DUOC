import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Asegúrate de importar Router
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;
  uid: string | undefined;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getUser().subscribe(
      user => {
        this.user = user;
        this.uid = user?.uid;
      },
      error => {
        console.error("Error al obtener usuario:", error);
        this.user = null; // Manejar el estado si no hay usuario
      }
    );
  }

  salir() {
    this.authService.signOut().then(() => {
      console.log("Sesión cerrada exitosamente");
    }).catch(error => {
      console.error("Error al cerrar sesión:", error);
    });
  }

  openMenu() {
    console.log("Menú abierto");
  }

  goToQrScanner() {
    this.router.navigate(['/qr-scanner']); // Navegar a la página del escáner QR
  }
}
