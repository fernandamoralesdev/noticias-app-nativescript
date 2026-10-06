import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular'

import { NoticiasRoutingModule } from './noticias-routing.module'
import { NoticiasListComponent } from './noticias-list/noticias-list.component'
import { NoticiasDetalleComponent } from './noticias-detalle/noticias-detalle.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptFormsModule, SharedModule, NoticiasRoutingModule],
  declarations: [NoticiasListComponent, NoticiasDetalleComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NoticiasModule {}
