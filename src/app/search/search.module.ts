import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular'

import { SearchRoutingModule } from './search-routing.module'
import { SearchComponent } from './search.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptFormsModule, SharedModule, SearchRoutingModule],
  declarations: [SearchComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SearchModule {}
