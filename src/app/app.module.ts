import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptHttpClientModule, NativeScriptModule, registerElement } from '@nativescript/angular'
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular'
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh'
import { StoreModule } from '@ngrx/store'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { reducers } from './store/app.state'

// Registro del componente del plugin "pull to refresh" para usarlo en las plantillas
registerElement('PullToRefresh', () => PullToRefresh)

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    NativeScriptModule,
    NativeScriptHttpClientModule, // HttpClient para el service que llama a la API Express
    NativeScriptUISideDrawerModule,
    StoreModule.forRoot(reducers), // Store de Redux (NgRx)
  ],
  declarations: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
