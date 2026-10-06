import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'

import { AppState } from '../store/app.state'
import { selectNoticiasLeerAhora } from '../store/leer-ahora.selectors'
import { quitarDeLeerAhora } from '../store/leer-ahora.actions'
import { UsuarioService } from '../domain/usuario.service'

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  styles: [
    `
      .saludo { font-size: 22; font-weight: bold; padding: 16 16 4 16; }
      .subtitulo { font-size: 16; color: #757575; padding: 0 16 8 16; }
      .vacio { color: #9e9e9e; padding: 16; text-align: center; }
      .item { padding: 10 12; border-bottom-width: 1; border-color: #dddddd; }
      .icono { color: #65adf1; font-size: 20; padding-right: 10; vertical-align: center; }
      .titulo { font-weight: bold; font-size: 16; }
      .resumen { color: #616161; font-size: 13; }
      .quitar { color: #43a047; font-size: 20; padding: 0 8; vertical-align: center; }
    `,
  ],
})
export class HomeComponent {
  /** (10) select sobre el Store de Redux: cada dispatch actualiza la lista sola */
  leerAhora$ = this.store.select(selectNoticiasLeerAhora)
  nombre$ = this.usuarioService.nombre$

  constructor(private store: Store<AppState>, private usuarioService: UsuarioService) {}

  marcarLeida(id: number): void {
    this.store.dispatch(quitarDeLeerAhora({ id }))
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
