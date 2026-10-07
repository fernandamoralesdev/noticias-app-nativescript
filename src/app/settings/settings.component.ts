import { Component } from '@angular/core'
import { RouterExtensions } from '@nativescript/angular'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application, NavigatedData } from '@nativescript/core'
import { Page } from '@nativescript/core'

import { shareText } from '@nativescript/social-share'

import { UsuarioService } from '../domain/usuario.service'
import { NotificacionesService } from '../domain/notificaciones.service'

@Component({
  selector: 'Settings',
  templateUrl: './settings.component.html',
  styles: [
    `
      .etiqueta { color: #757575; font-size: 13; margin-top: 12; }
      .valor { font-size: 18; font-weight: bold; }
      .token { font-size: 12; color: #424242; background-color: #f5f5f5; border-width: 0; }
    `,
  ],
})
export class SettingsComponent {
  nombre = ''
  apiUrl = ''
  token$ = this.notificaciones.token$

  constructor(
    private usuarioService: UsuarioService,
    private notificaciones: NotificacionesService,
    private routerExtensions: RouterExtensions,
    page: Page
  ) {
    this.cargar()
    // Recarga los valores al volver desde la pantalla de edición
    page.on(Page.navigatedToEvent, (_: NavigatedData) => this.cargar())
  }

  /** (5) Lee los valores persistidos */
  cargar(): void {
    this.nombre = this.usuarioService.getNombre()
    this.apiUrl = this.usuarioService.getApiUrl()
  }

  /** Comparte el token (útil para copiarlo y pegarlo en la consola de Firebase) */
  compartirToken(): void {
    shareText(this.notificaciones.token, 'Token FCM')
  }

  editar(): void {
    this.routerExtensions.navigate(['/settings/editar'], { transition: { name: 'slide' } })
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
