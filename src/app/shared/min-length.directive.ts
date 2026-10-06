import { Directive, Input } from '@angular/core'
import { NG_VALIDATORS } from '@angular/forms'
import type { AbstractControl, ValidationErrors, Validator } from '@angular/forms'

/**
 * Validador personalizado (directiva de Angular).
 * Uso: <TextField [(ngModel)]="texto" name="texto" [minLen]="3"></TextField>
 * Marca el control como inválido si tiene texto pero menos de N caracteres
 * (el campo vacío se considera válido para poder ver el listado completo).
 */
@Directive({
  selector: '[minLen][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MinLenDirective, multi: true }],
})
export class MinLenDirective implements Validator {
  @Input('minLen') minLen = 3

  validate(control: AbstractControl): ValidationErrors | null {
    const valor: string = (control.value || '').toString().trim()
    if (valor.length > 0 && valor.length < this.minLen) {
      return { minLen: { requerido: this.minLen, actual: valor.length } }
    }
    return null
  }
}
