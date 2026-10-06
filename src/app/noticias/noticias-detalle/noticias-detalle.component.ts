import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'

import { Noticia, NoticiasService } from '../../domain/noticias.service'
import { mostrarToast } from '../../shared/toast'

@Component({
  selector: 'NoticiasDetalle',
  templateUrl: './noticias-detalle.component.html',
  styles: ['.error { color: #d50000; font-size: 13; }'],
})
export class NoticiasDetalleComponent implements OnInit {
  noticia: Noticia | undefined
  titulo = ''
  resumen = ''

  constructor(
    private route: ActivatedRoute,
    private noticiasService: NoticiasService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id'])
    this.noticia = this.noticiasService.buscarPorId(id)
    this.titulo = this.noticia?.titulo ?? ''
    this.resumen = this.noticia?.resumen ?? ''
  }

  guardar(): void {
    if (!this.noticia) {
      return
    }
    this.noticia.titulo = this.titulo.trim()
    this.noticia.resumen = this.resumen.trim()
    mostrarToast('Noticia actualizada')
  }

  volver(): void {
    this.routerExtensions.back()
  }
}
