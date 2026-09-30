# MiProyecto – Evaluación Módulo 1 (NativeScript + Angular)

Proyecto basado en el template `@nativescript/template-drawer-navigation-ng`.
Se agregó una funcionalidad de **Noticias** con listado y detalle.

## Cómo ejecutarlo

~~~
npm install
ns run android   # o ns run ios
~~~

## Dónde está cada requisito

| # | Requisito | Dónde está |
|---|---|---|
| 1 | Template drawer + enrutador modularizado | `src/app/app-routing.module.ts` (lazy loading por feature) |
| 2 | Al menos 2 componentes nuevos | `src/app/noticias/noticias-list/`, `src/app/noticias/noticias-detalle/` |
| 3 | Nuevo módulo de feature | `src/app/noticias/noticias.module.ts` |
| 4 | Submódulo de ruteo | `src/app/noticias/noticias-routing.module.ts` |
| 5 | Navegación integrada al side drawer | `src/app/app.component.html` (ítem "Noticias") |
| 6 | Servicio con inyección global | `src/app/domain/noticias.service.ts` (`providedIn: 'root'`) |
| 7 | Vista con `ngFor` | `src/app/noticias/noticias-list/noticias-list.component.html` |
| 8 | Estilos por plataforma | `noticias-list.component.android.scss` / `noticias-list.component.ios.scss` (+ `_noticias-list.common.scss`) |
| 9 | Ícono personalizado en App_Resources | `App_Resources/Android/src/main/res/drawable-nodpi/mi_icono.png` y `App_Resources/iOS/mi_icono.png` |
| 10 | Variable asignada solo en Android | `noticias-list.component.ts` (`if (isAndroid) { this.plataforma = 'Android' }`) |
