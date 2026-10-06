import { Toasty, ToastDuration, ToastPosition } from '@triniwiz/nativescript-toasty'

/** Muestra un toast nativo con el mensaje indicado. */
export function mostrarToast(texto: string): void {
  new Toasty({
    text: texto,
    duration: ToastDuration.SHORT,
    position: ToastPosition.BOTTOM,
  }).show()
}
