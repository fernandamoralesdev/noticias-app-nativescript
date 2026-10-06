import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'

import { FavoritosService } from '../domain/favoritos.service'
import { NoticiaApi } from '../domain/noticias-api.service'
import { AppState } from '../store/app.state'
import { leerAhora } from '../store/leer-ahora.actions'
import { mostrarToast } from '../shared/toast'

@Component({
  selector: 'Favoritos',
  templateUrl: './favoritos.component.html',
  styles: [
    `
      .vacio { color: #9e9e9e; padding: 16; text-align: center; }
      .favorito { padding: 10 12; border-bottom-width: 1; border-color: #dddddd; }
      .titulo { font-weight: bold; font-size: 16; }
      .categoria { color: #757575; font-size: 13; }
      .boton { font-size: 13; height: 40; margin: 0 6; }
      .quitar { color: #f5b301; font-size: 22; vertical-align: center; padding: 0 6; }
    `,
  ],
})
export class FavoritosComponent {
  favoritos$ = this.favoritosService.favoritos$

  constructor(private favoritosService: FavoritosService, private store: Store<AppState>) {}

  /** (9) Despacha el action "Leer ahora" al store de Redux */
  leerAhora(noticia: NoticiaApi): void {
    this.store.dispatch(leerAhora({ noticia }))
    mostrarToast('Agregada a "Leer ahora" (ver Inicio)')
  }

  quitar(noticia: NoticiaApi): void {
    this.favoritosService.alternar(noticia)
    mostrarToast('Quitada de favoritos')
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
