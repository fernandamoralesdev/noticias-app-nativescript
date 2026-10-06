import { Component, OnInit } from '@angular/core'
import { RouterExtensions } from '@nativescript/angular'

import { UsuarioService } from '../../domain/usuario.service'
import { mostrarToast } from '../../shared/toast'

@Component({
  selector: 'SettingsEditar',
  templateUrl: './settings-editar.component.html',
  styles: [
    `
      .etiqueta { color: #757575; font-size: 13; margin-top: 12; }
      .error { color: #d50000; font-size: 13; }
    `,
  ],
})
export class SettingsEditarComponent implements OnInit {
  nombre = ''
  apiUrl = ''

  constructor(private usuarioService: UsuarioService, private routerExtensions: RouterExtensions) {}

  ngOnInit(): void {
    this.nombre = this.usuarioService.getNombre()
    this.apiUrl = this.usuarioService.getApiUrl()
  }

  /** (6) Persiste el nombre (y la URL) con ApplicationSettings */
  guardar(): void {
    this.usuarioService.setNombre(this.nombre.trim())
    if (this.apiUrl.trim()) {
      this.usuarioService.setApiUrl(this.apiUrl)
    }
    mostrarToast('Datos guardados')
    this.routerExtensions.back()
  }

  volver(): void {
    this.routerExtensions.back()
  }
}
