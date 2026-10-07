import { Injectable, NgZone } from '@angular/core'
import { firebase } from '@nativescript/firebase-core'
import { BehaviorSubject } from 'rxjs'

import { mostrarToast } from '../shared/toast'

/**
 * (1) Integración con Firebase Cloud Messaging: obtiene el token del dispositivo
 *     para enviar notificaciones desde la consola de Firebase.
 * (2) Muestra en un Toast cada notificación que llega con la app abierta.
 *
 * Requiere tu propio google-services.json en App_Resources/Android/ (ver README).
 */
@Injectable({ providedIn: 'root' })
export class NotificacionesService {
  private tokenSubject = new BehaviorSubject<string>('Obteniendo token...')
  token$ = this.tokenSubject.asObservable()
  private iniciado = false

  constructor(private zone: NgZone) {}

  async iniciar(): Promise<void> {
    if (this.iniciado) {
      return
    }
    this.iniciado = true

    try {
      await firebase().initializeApp()
      const messaging = firebase().messaging()

      // Las notificaciones con la app abierta las mostramos nosotros con un Toast
      messaging.showNotificationsWhenInForeground = false

      // En Android 13+ pide el permiso POST_NOTIFICATIONS
      await messaging.requestPermission()
      await messaging.registerDeviceForRemoteMessages()

      const token = await messaging.getToken()
      console.log('TOKEN FIREBASE:', token)
      this.zone.run(() => this.tokenSubject.next(token || 'Sin token'))

      messaging.onToken((nuevo) => {
        console.log('TOKEN FIREBASE (actualizado):', nuevo)
        this.zone.run(() => this.tokenSubject.next(nuevo))
      })

      // (2) Toast con cada notificación entrante
      messaging.onMessage((mensaje: any) => {
        const titulo = mensaje?.notification?.title ?? mensaje?.data?.title ?? 'Notificación'
        const cuerpo = mensaje?.notification?.body ?? mensaje?.data?.body ?? ''
        console.log('Notificación recibida:', JSON.stringify(mensaje))
        this.zone.run(() => mostrarToast(cuerpo ? `${titulo}: ${cuerpo}` : titulo))
      })

      // Si el usuario toca la notificación estando la app en segundo plano
      messaging.onNotificationTap((mensaje: any) => {
        const titulo = mensaje?.notification?.title ?? 'Notificación'
        this.zone.run(() => mostrarToast(`Abriste: ${titulo}`))
      })
    } catch (err: any) {
      console.log('Error iniciando Firebase:', err?.message || err)
      this.zone.run(() => this.tokenSubject.next('No se pudo obtener el token (revisa google-services.json)'))
    }
  }

  get token(): string {
    return this.tokenSubject.value
  }
}
