import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = {}; // Datos del usuario
  editableName: string = ''; // Propiedad para almacenar el nombre editable
  isEditingName: boolean = false; // Estado para saber si se está editando el nombre
  nameEdited: boolean = false; // Propiedad para controlar si el nombre ha sido editado
  editableSection: string = ''; // Propiedad para almacenar la sección editable
  isEditingSection: boolean = false; // Estado para saber si se está editando la sección
  sectionEdited: boolean = false; // Propiedad para controlar si la sección ha sido editada
  asistencia: any[] = []; // Propiedad para almacenar la asistencia

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUserData(); // Cargar datos del usuario al iniciar
    this.loadAsistencia(); // Cargar asistencia al iniciar
  }

  // Cargar la información del usuario desde localStorage
  loadUserData() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.editableName = this.user.displayName || ''; // Cargar el nombre actual
      this.editableSection = this.user.section || ''; // Cargar la sección actual
      this.nameEdited = !!this.user.displayName; // Verifica si el nombre ha sido editado
      this.sectionEdited = !!this.user.section; // Verifica si la sección ha sido editada
    }
  }

  // Cargar la asistencia desde localStorage
  loadAsistencia() {
    const storedAsistencia = localStorage.getItem('asistencia');
    this.asistencia = storedAsistencia ? JSON.parse(storedAsistencia) : [];
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

  // Habilitar la edición de la sección
  enableEditSection() {
    this.editableSection = this.user.section; // Cargar la sección actual en editableSection
    this.isEditingSection = true; // Cambiar el estado a edición
  }

  // Guardar la sección en localStorage
  guardarSection() {
    if (this.editableSection.trim()) {
      this.user.section = this.editableSection; // Actualizar la sección en el objeto usuario
      localStorage.setItem('user', JSON.stringify(this.user)); // Guardar el usuario actualizado en localStorage
      alert('Sección guardada exitosamente');
      this.isEditingSection = false; // Salir del modo de edición
      this.sectionEdited = true; // Marcar que la sección ha sido editada
    } else {
      alert('Por favor ingresa una sección válida.');
    }
  }

  // Método para cerrar sesión
  salir() {
    localStorage.removeItem('user'); // Remover información del usuario
    this.router.navigate(['/sign-in']); // Redirigir a la página de inicio de sesión
  }

  // Método para redirigir al escáner QR
  goToQrScanner() {
    this.router.navigate(['/qr-scanner']); // Redirigir al escáner QR
  }
}
