import { Component } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { GoogleMap, MapReadyEvent, MarkerTapEvent } from '@nativescript/google-maps'

import { mostrarToast } from '../shared/toast'

@Component({
  selector: 'Mapa',
  templateUrl: './mapa.component.html',
  styles: ['.pie { padding: 12; color: #757575; font-size: 13; text-align: center; }'],
})
export class MapaComponent {
  // Plaza de Bolívar, Bogotá
  centro = { lat: 4.598056, lng: -74.075833 }
  private mapa: GoogleMap | undefined

  onMapReady(event: MapReadyEvent): void {
    this.mapa = event.map
    // (8) Marker en el mapa
    this.mapa.addMarker({
      position: this.centro,
      title: 'Plaza de Bolívar',
      snippet: 'Centro histórico de Bogotá',
      color: '#1565C0',
    })
  }

  onMarkerTap(event: MarkerTapEvent): void {
    mostrarToast(`Marcador: ${event.marker?.title ?? ''}`)
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
