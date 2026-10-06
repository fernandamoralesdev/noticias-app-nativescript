import { NgModule } from '@angular/core'
import { MinLenDirective } from './min-length.directive'

@NgModule({
  declarations: [MinLenDirective],
  exports: [MinLenDirective],
})
export class SharedModule {}
