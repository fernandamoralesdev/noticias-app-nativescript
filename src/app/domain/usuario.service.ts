import { Injectable } from '@angular/core'
import { ApplicationSettings } from '@nativescript/core'
import { BehaviorSubject } from 'rxjs'

import { AppConfig } from '../config/app-config'

const CLAVE_NOMBRE = 'nombreUsuario'
const CLAVE_API_URL = 'apiUrl'

/**
 * (5) y (6) Lee y guarda configuraciones de forma persistente con ApplicationSettings
 * (equivalente a AppSettings: sobrevive al cerrar la app).
 */
@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private nombreSubject = new BehaviorSubject<string>(this.getNombre())
  nombre$ = this.nombreSubject.asObservable()

  getNombre(): string {
    return ApplicationSettings.getString(CLAVE_NOMBRE, 'Invitado')
  }

  setNombre(nombre: string): void {
    ApplicationSettings.setString(CLAVE_NOMBRE, nombre)
    this.nombreSubject.next(nombre)
  }

  /** URL de la API: la guardada por el usuario o, si no hay, la de AppConfig. */
  getApiUrl(): string {
    return ApplicationSettings.getString(CLAVE_API_URL, AppConfig.apiUrl)
  }

  setApiUrl(url: string): void {
    ApplicationSettings.setString(CLAVE_API_URL, url.trim().replace(/\/+$/, ''))
  }
}
