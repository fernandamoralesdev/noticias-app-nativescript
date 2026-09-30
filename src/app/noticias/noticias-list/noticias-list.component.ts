import { Component, OnInit } from '@angular/core'
import { RouterExtensions } from '@nativescript/angular'
import { Application, isAndroid } from '@nativescript/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'

import { Noticia, NoticiasService } from '../../domain/noticias.service'

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

  verDetalle(id: number): void {
    this.routerExtensions.navigate(['/noticias/detalle', id])
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
