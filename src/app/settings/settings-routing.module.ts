import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { SettingsComponent } from './settings.component'
import { SettingsEditarComponent } from './settings-editar/settings-editar.component'

const routes: Routes = [
  { path: '', component: SettingsComponent },
  { path: 'editar', component: SettingsEditarComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class SettingsRoutingModule {}
