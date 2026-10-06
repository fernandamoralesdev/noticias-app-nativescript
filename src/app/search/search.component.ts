import { Component, OnInit } from '@angular/core'
import { RouterExtensions } from '@nativescript/angular'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application, ItemEventData } from '@nativescript/core'

import { Noticia, NoticiasService } from '../domain/noticias.service'
import { mostrarToast } from '../shared/toast'

@Component({
  selector: 'Search',
  templateUrl: './search.component.html',
  styles: [
    `
      .icono-buscar { font-size: 22; color: #65adf1; padding: 0 10; vertical-align: center; }
      .error { color: #d50000; font-size: 13; padding: 0 12; }
      .contador { color: #757575; font-size: 13; padding: 0 12 6 12; }
      .resultado { padding: 12; border-bottom-width: 1; border-color: #dddddd; }
      .resultado-titulo { font-weight: bold; font-size: 16; }
      .resultado-resumen { color: #616161; font-size: 14; margin-top: 4; }
      .chip { background-color: #e3f2fd; color: #1565c0; font-size: 12; padding: 2 8; border-radius: 10; margin-left: 6; }
      .favorita { color: #f5b301; margin-left: 6; }
    `,
  ],
})
export class SearchComponent implements OnInit {
  texto = ''
  resultados: Noticia[] = []

  constructor(
    private noticiasService: NoticiasService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.resultados = this.noticiasService.buscar()
  }

  buscar(esValido: boolean | null, texto: string = this.texto): void {
    // Solo filtra si el validador personalizado lo permite
    if (esValido === false) {
      return
    }
    this.resultados = this.noticiasService.buscarPorTexto(texto)
  }

  limpiar(): void {
    this.texto = ''
    this.resultados = this.noticiasService.buscar()
    mostrarToast('Búsqueda reiniciada')
  }

  onItemTap(args: ItemEventData): void {
    const noticia = this.resultados[args.index]
    this.routerExtensions.navigate(['/noticias/detalle', noticia.id])
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
