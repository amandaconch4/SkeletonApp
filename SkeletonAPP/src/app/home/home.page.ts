import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})

export class HomePage {
  username: string = '';
  nombre: string = '';
  apellido: string = '';
  nivelEducacional: string = '';
  fechaNacimiento: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
    // Obtener el username del estado de la navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.username = (navigation.extras.state as any).username;
    }
  }

  limpiarFormulario() {
    this.nombre = '';
    this.apellido = '';
    this.nivelEducacional = '';
    this.fechaNacimiento = '';
  }

  async mostrarDatos() {
    const alert = await this.alertController.create({
      header: 'Datos del Usuario',
      message: `
        <p><strong>Nombre:</strong> ${this.nombre}</p>
        <p><strong>Apellido:</strong> ${this.apellido}</p>
        <p><strong>Nivel Educacional:</strong> ${this.nivelEducacional}</p>
        <p><strong>Fecha de Nacimiento:</strong> ${this.fechaNacimiento}</p>
      `,
      buttons: ['OK']
    });

    await alert.present();
  }
}
