import { Component, OnInit } from '@angular/core'
import { RouterExtensions } from '@nativescript/angular'
import { Application, Dialogs, isAndroid, View } from '@nativescript/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh'

import { CATEGORIAS, Noticia, NoticiasService } from '../../domain/noticias.service'
import { mostrarToast } from '../../shared/toast'

@Component({
  selector: 'NoticiasList',
  templateUrl: './noticias-list.component.html',
  styleUrls: ['./noticias-list.component.scss'],
})
export class NoticiasListComponent implements OnInit {
  noticias: Noticia[] = []
  plataforma = 'iOS'

  constructor(
    private noticiasService: NoticiasService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.noticias = this.noticiasService.buscar()
    if (isAndroid) {
      this.plataforma = 'Android' // solo se asigna en Android
    }
  }

  /** (2) Navegación listado → detalle con RouterExtensions.navigate */
  verDetalle(id: number): void {
    this.routerExtensions.navigate(['/noticias/detalle', id], {
      transition: { name: 'slide' },
    })
  }

  /** (3) Pull to refresh: agrega una noticia aleatoria al listado */
  onPullToRefresh(args: any): void {
    const pullRefresh = args.object as PullToRefresh
    setTimeout(() => {
      const nueva = this.noticiasService.agregarAleatoria()
      pullRefresh.refreshing = false
      // (5) Toast
      mostrarToast(`Nueva noticia: ${nueva.titulo}`)
    }, 1000)
  }

  /** (4) Diálogo "action" que modifica el atributo categoria de la noticia */
  onCategoriaTap(noticia: Noticia): void {
    Dialogs.action({
      title: 'Categoría',
      message: `Elige la categoría de "${noticia.titulo}"`,
      cancelButtonText: 'Cancelar',
      actions: CATEGORIAS,
    }).then((resultado) => {
      if (CATEGORIAS.includes(resultado)) {
        this.noticiasService.cambiarCategoria(noticia.id, resultado)
        mostrarToast(`Categoría cambiada a ${resultado}`)
      }
    })
  }

  /** (8) Doble tap sobre la estrella + (9) animación rotate/scale */
  onFavoritaDoubleTap(args: any, noticia: Noticia): void {
    const icono = args.object as View
    const favorita = this.noticiasService.alternarFavorita(noticia.id)

    icono
      .animate({ rotate: 360, scale: { x: 1.6, y: 1.6 }, duration: 400 })
      .then(() => icono.animate({ scale: { x: 1, y: 1 }, duration: 200 }))
      .then(() => (icono.rotate = 0))
      .catch(() => {})

    mostrarToast(favorita ? 'Agregada a favoritas' : 'Quitada de favoritas')
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
