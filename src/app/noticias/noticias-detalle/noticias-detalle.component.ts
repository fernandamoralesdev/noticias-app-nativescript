import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'

import { Noticia, NoticiasService } from '../../domain/noticias.service'

@Component({
  selector: 'NoticiasDetalle',
  templateUrl: './noticias-detalle.component.html',
})
export class NoticiasDetalleComponent implements OnInit {
  noticia: Noticia | undefined

  constructor(
    private route: ActivatedRoute,
    private noticiasService: NoticiasService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id'])
    this.noticia = this.noticiasService.buscarPorId(id)
  }

  volver(): void {
    this.routerExtensions.back()
  }
}
