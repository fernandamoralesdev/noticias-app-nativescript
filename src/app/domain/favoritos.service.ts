import { Injectable } from '@angular/core'
import { ApplicationSettings } from '@nativescript/core'
import { BehaviorSubject } from 'rxjs'

import { NoticiaApi } from './noticias-api.service'

const CLAVE_FAVORITOS = 'favoritos'

/** (7) y (8) Guarda las noticias favoritas de forma persistente (ApplicationSettings, JSON). */
@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private favoritosSubject = new BehaviorSubject<NoticiaApi[]>(this.leer())
  favoritos$ = this.favoritosSubject.asObservable()

  esFavorito(id: number): boolean {
    return this.favoritosSubject.value.some((f) => f.id === id)
  }

  /** Agrega o quita de favoritos. Devuelve true si quedó como favorito. */
  alternar(noticia: NoticiaApi): boolean {
    const actuales = this.favoritosSubject.value
    const existe = actuales.some((f) => f.id === noticia.id)
    const nuevos = existe ? actuales.filter((f) => f.id !== noticia.id) : [...actuales, noticia]
    this.guardar(nuevos)
    return !existe
  }

  private leer(): NoticiaApi[] {
    try {
      return JSON.parse(ApplicationSettings.getString(CLAVE_FAVORITOS, '[]'))
    } catch {
      return []
    }
  }

  private guardar(lista: NoticiaApi[]): void {
    ApplicationSettings.setString(CLAVE_FAVORITOS, JSON.stringify(lista))
    this.favoritosSubject.next(lista)
  }
}
