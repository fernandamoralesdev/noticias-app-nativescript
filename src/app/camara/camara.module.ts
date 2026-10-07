import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular'

import { CamaraComponent } from './camara.component'

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: CamaraComponent }])],
  declarations: [CamaraComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CamaraModule {}
