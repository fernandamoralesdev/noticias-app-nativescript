import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'

import { NoticiaApi, NoticiasApiService } from '../domain/noticias-api.service'
import { FavoritosService } from '../domain/favoritos.service'
import { mostrarToast } from '../shared/toast'

@Component({
  selector: 'Search',
  templateUrl: './search.component.html',
  styles: [
    `
      .error { color: #d50000; font-size: 13; padding: 0 12; }
      .estado { padding: 0 12 6 12; }
      .contador { color: #757575; font-size: 13; margin-left: 6; }
      .resultado { padding: 12; border-bottom-width: 1; border-color: #dddddd; }
      .resultado-titulo { font-weight: bold; font-size: 16; }
      .resultado-resumen { color: #616161; font-size: 14; margin-top: 4; }
      .chip { background-color: #e3f2fd; color: #1565c0; font-size: 12; padding: 2 8; border-radius: 10; margin-left: 6; }
      .icono-favorito { font-size: 22; color: #bdbdbd; padding: 0 8; }
      .icono-favorito.activo { color: #f5b301; }
    `,
  ],
})
export class SearchComponent implements OnInit {
  texto = ''
  resultados: NoticiaApi[] = []
  cargando = false
  mensaje = ''

  constructor(
    private noticiasApi: NoticiasApiService,
    private favoritosService: FavoritosService
  ) {}

  ngOnInit(): void {
    this.buscar(true)
  }

  /** (2)(3)(4) El componente solo pide los datos al service, que hace el GET a Express */
  buscar(esValido: boolean | null): void {
    if (esValido === false) {
      return
    }
    this.cargando = true
    this.mensaje = 'Buscando...'
    this.noticiasApi.buscar(this.texto).subscribe({
      next: (datos) => {
        this.resultados = datos
        this.cargando = false
        this.mensaje = `${datos.length} resultado(s)`
      },
      error: (err) => {
        this.cargando = false
        this.resultados = []
        this.mensaje = 'No se pudo conectar con la API'
        mostrarToast('Error de conexión: revisa la URL de Ngrok en Settings')
        console.log('Error al buscar', err?.message || err)
      },
    })
  }

  esFavorito(id: number): boolean {
    return this.favoritosService.esFavorito(id)
  }

  alternarFavorito(noticia: NoticiaApi): void {
    const quedo = this.favoritosService.alternar(noticia)
    mostrarToast(quedo ? 'Guardada en favoritos' : 'Quitada de favoritos')
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
