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
  isSliding: boolean = false;

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
    // Primero se activa la animación
    this.isSliding = true;
    
    // Cuando termine la animación, se limpian los campos
    setTimeout(() => {
      this.nombre = '';
      this.apellido = '';
      this.nivelEducacional = '';
      this.fechaNacimiento = '';
      this.isSliding = false;
    }, 1000);
  }

  async mostrarDatos() {
    // Formatea la fecha al formato dd-mm-yyyy
    const fechaFormateada = this.fechaNacimiento ? new Date(this.fechaNacimiento).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-') : '';

    const alert = await this.alertController.create({
      header: 'Datos del Usuario',
      message: `
        Nombre completo: ${this.nombre} ${this.apellido}
        Nivel Educacional: ${this.nivelEducacional}
        Fecha de Nacimiento: ${fechaFormateada}
      `,
      buttons: ['OK']
    });

    await alert.present();
  }
}
