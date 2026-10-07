import { Component } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application, ImageAsset, ImageSource } from '@nativescript/core'
import { isAvailable, requestPermissions, takePicture } from '@nativescript/camera'
import { shareImage, shareText } from '@nativescript/social-share'

import { mostrarToast } from '../shared/toast'

@Component({
  selector: 'Camara',
  templateUrl: './camara.component.html',
  styles: [
    `
      .marco { background-color: #f5f5f5; border-radius: 8; }
      .vacio { color: #9e9e9e; }
      .subtitulo { color: #757575; font-size: 14; margin-top: 24; }
    `,
  ],
})
export class CamaraComponent {
  foto: ImageAsset | null = null

  /** (5) Pide permisos y toma la foto con la cámara del dispositivo */
  async tomarFoto(): Promise<void> {
    if (!isAvailable()) {
      mostrarToast('Este dispositivo no tiene cámara disponible')
      return
    }
    try {
      await requestPermissions()
      this.foto = await takePicture({
        width: 800,
        height: 800,
        keepAspectRatio: true,
        saveToGallery: false,
      })
      mostrarToast('Foto tomada')
    } catch (err: any) {
      console.log('Error con la cámara:', err?.message || err)
      mostrarToast('No se pudo tomar la foto')
    }
  }

  /** (6) Comparte la foto tomada usando social-share */
  async compartirFoto(): Promise<void> {
    if (!this.foto) {
      return
    }
    const imagen = await ImageSource.fromAsset(this.foto)
    shareImage(imagen, 'Foto desde NotiFlash')
  }

  /** (4) Comparte una imagen incluida en App_Resources (mi_icono.png) */
  async compartirImagenApp(): Promise<void> {
    const imagen = await ImageSource.fromResource('mi_icono')
    if (imagen) {
      shareImage(imagen, 'Mira esta app de noticias')
    } else {
      mostrarToast('No se encontró la imagen')
    }
  }

  /** (3) Comparte contenido de tipo texto */
  compartirTexto(): void {
    shareText('Estoy usando NotiFlash para leer las noticias del día.', 'NotiFlash')
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
