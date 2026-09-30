import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { NoticiasRoutingModule } from './noticias-routing.module'
import { NoticiasListComponent } from './noticias-list/noticias-list.component'
import { NoticiasDetalleComponent } from './noticias-detalle/noticias-detalle.component'

@NgModule({
  imports: [NativeScriptCommonModule, NoticiasRoutingModule],
  declarations: [NoticiasListComponent, NoticiasDetalleComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NoticiasModule {}
