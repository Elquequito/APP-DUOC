import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-doc', // Cambiado el selector a 'app-profile-doc'
  templateUrl: './profile-doc.page.html', // Cambiado el nombre del archivo de plantilla
  styleUrls: ['./profile-doc.page.scss'], // Cambiado el nombre del archivo de estilos
})
export class ProfileDocPage implements OnInit {
  user: any = {}; // Datos del usuario
  editableName: string = ''; // Propiedad para almacenar el nombre editable
  isEditingName: boolean = false; // Estado para saber si se está editando el nombre
  nameEdited: boolean = false; // Propiedad para controlar si el nombre ha sido editado

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUserData();
  }

  // Cargar la información del usuario desde localStorage
  loadUserData() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.editableName = this.user.displayName || ''; // Cargar el nombre actual
      this.nameEdited = !!this.user.displayName; // Verifica si el nombre ha sido editado
    }
  }

  // Habilitar la edición del nombre
  enableEditName() {
    this.editableName = this.user.displayName; // Cargar el nombre actual en editableName
    this.isEditingName = true; // Cambiar el estado a edición
  }

  // Guardar el nombre en localStorage
  guardarNombre() {
    if (this.editableName.trim()) {
      this.user.displayName = this.editableName; // Actualizar el nombre en el objeto usuario
      localStorage.setItem('user', JSON.stringify(this.user)); // Guardar el usuario actualizado en localStorage
      alert('Nombre guardado exitosamente');
      this.isEditingName = false; // Salir del modo de edición
      this.nameEdited = true; // Marcar que el nombre ha sido editado
    } else {
      alert('Por favor ingresa un nombre válido.');
    }
  }

  // Método para cerrar sesión
  salir() {
    localStorage.removeItem('user'); // Remover información del usuario
    this.router.navigate(['/sign-in']); // Redirigir a la página de inicio de sesión
  }

  // Método para redirigir a la generación de QR
  goToQrGenerator() {
    this.router.navigate(['/generar-qr']); // Redirigir a la página de generación de QR
  }
}
