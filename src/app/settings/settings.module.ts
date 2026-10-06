import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular'

import { SettingsRoutingModule } from './settings-routing.module'
import { SettingsComponent } from './settings.component'
import { SettingsEditarComponent } from './settings-editar/settings-editar.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptFormsModule, SharedModule, SettingsRoutingModule],
  declarations: [SettingsComponent, SettingsEditarComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SettingsModule {}
