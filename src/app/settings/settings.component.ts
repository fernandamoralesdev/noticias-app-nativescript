import { Component } from '@angular/core'
import { RouterExtensions } from '@nativescript/angular'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application, NavigatedData } from '@nativescript/core'
import { Page } from '@nativescript/core'

import { UsuarioService } from '../domain/usuario.service'

@Component({
  selector: 'Settings',
  templateUrl: './settings.component.html',
  styles: [
    `
      .etiqueta { color: #757575; font-size: 13; margin-top: 12; }
      .valor { font-size: 18; font-weight: bold; }
    `,
  ],
})
export class SettingsComponent {
  nombre = ''
  apiUrl = ''

  constructor(
    private usuarioService: UsuarioService,
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

  editar(): void {
    this.routerExtensions.navigate(['/settings/editar'], { transition: { name: 'slide' } })
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
