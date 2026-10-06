import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'

import { UsuarioService } from './usuario.service'

export interface NoticiaApi {
  id: number
  titulo: string
  resumen: string
  categoria: string
}

/**
 * (4) Service de Angular responsable de la solicitud HTTP a la API Express.
 * Los componentes no conocen la URL ni hacen HTTP directamente.
 */
@Injectable({ providedIn: 'root' })
export class NoticiasApiService {
  constructor(private http: HttpClient, private usuarioService: UsuarioService) {}

  buscar(texto: string): Observable<NoticiaApi[]> {
    const url = `${this.usuarioService.getApiUrl()}/noticias`
    let params = new HttpParams()
    if (texto && texto.trim()) {
      params = params.set('q', texto.trim())
    }
    // Evita la página de advertencia de Ngrok en el plan gratuito
    const headers = new HttpHeaders({ 'ngrok-skip-browser-warning': 'true' })
    return this.http.get<NoticiaApi[]>(url, { params, headers })
  }
}
