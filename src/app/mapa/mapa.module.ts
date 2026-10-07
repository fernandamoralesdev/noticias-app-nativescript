import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular'
import { GoogleMapsModule } from '@nativescript/google-maps/angular'

import { MapaComponent } from './mapa.component'

@NgModule({
  imports: [
    NativeScriptCommonModule,
    GoogleMapsModule, // (7) Plugin de mapas de Google
    NativeScriptRouterModule.forChild([{ path: '', component: MapaComponent }]),
  ],
  declarations: [MapaComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class MapaModule {}
