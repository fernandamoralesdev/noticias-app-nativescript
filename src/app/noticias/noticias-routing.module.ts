import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { NoticiasListComponent } from './noticias-list/noticias-list.component'
import { NoticiasDetalleComponent } from './noticias-detalle/noticias-detalle.component'

const routes: Routes = [
  { path: '', component: NoticiasListComponent },
  { path: 'detalle/:id', component: NoticiasDetalleComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class NoticiasRoutingModule { }
