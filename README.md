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

---

# Evaluación Módulo 2 – Formularios, animaciones y splash screen

Plugins agregados: `@nativescript-community/ui-pulltorefresh` (pull to refresh) y `@triniwiz/nativescript-toasty` (toast).

| # | Requisito | Dónde está |
|---|---|---|
| 1 | Página de búsqueda con `ListView` y plantilla anidada con `FlexboxLayout` | `src/app/search/search.component.html` (menú lateral → "Buscar") |
| 2 | Navegación listado → detalle con `RouterExtensions.navigate` | `noticias-list.component.ts` → `verDetalle()` |
| 3 | Pull to refresh que agrega elementos aleatorios | `noticias-list.component.html` (`<PullToRefresh>`), `onPullToRefresh()`; registro en `app.module.ts` |
| 4 | Ícono que abre un diálogo "action" y cambia un atributo | ícono de etiqueta en cada noticia → `onCategoriaTap()` cambia `noticia.categoria` |
| 5 | Toast | `src/app/shared/toast.ts`, usado al refrescar, cambiar categoría, favorita y guardar |
| 6 | Two way binding `[()]` | `[(ngModel)]` en el buscador (`search.component.html`), en el formulario de edición (`noticias-detalle.component.html`) y en Settings → Editar |
| 7 | Validador personalizado con directiva | `src/app/shared/min-length.directive.ts` (`[minLen]`), usado en búsqueda (mín. 3) y edición de título (mín. 5) |
| 8 | Detección de gestos | doble tap en la estrella (`onFavoritaDoubleTap`) |
| 9 | Animación en un ícono | la estrella rota 360° y se agranda al marcar favorita (`icono.animate(...)`) |
| 10 | Splash screen personalizado para Android | `App_Resources/Android/src/main/res/drawable-nodpi/splash_screen.xml`, colores en `values/colors.xml`, Android 12+ en `values-v31/styles.xml` |

---

# Evaluación Módulo 3 – Persistencia, API y Redux

Se agregaron: una API en Express (`api/`), `@ngrx/store` (Redux), `ApplicationSettings` para datos persistentes y la sección **Favoritos** (antes "Featured").

## Cómo probarlo

~~~
# 1. Levantar la API
cd api
npm install
npm start                 # http://localhost:3000/noticias?q=tecnologia

# 2. En otra terminal, exponerla con Ngrok
ngrok http 3000

# 3. Copiar la URL https de Ngrok en src/app/config/app-config.ts
#    (o desde la app: Settings → Editar → URL de la API)

# 4. Correr la app
ns run android
~~~

| # | Requisito | Dónde está |
|---|---|---|
| 1 | App Express con GET y filtrado por querystring | `api/app.js` → `GET /noticias?q=texto` (también `?categoria=Deportes`) |
| 2 | Listado con formulario de búsqueda (caja de texto + botón) que filtra | `src/app/search/search.component.html` / `.ts` (menú → "Buscar") |
| 3 | Variable de configuración con la URL de Ngrok | `src/app/config/app-config.ts` (`AppConfig.apiUrl`), editable y persistida desde Settings |
| 4 | Service de Angular que hace la solicitud HTTP | `src/app/domain/noticias-api.service.ts` (`HttpClient.get`), el componente solo se suscribe |
| 5 | Settings que lee el nombre de usuario de forma persistente | `src/app/settings/settings.component.ts` + `src/app/domain/usuario.service.ts` (`ApplicationSettings.getString`) |
| 6 | Pantalla para editar el nombre y persistirlo | `src/app/settings/settings-editar/` (`ApplicationSettings.setString`) |
| 7 | Ícono para guardar como favorito en el listado de búsqueda | estrella en cada resultado de `search.component.html` → `FavoritosService.alternar()` |
| 8 | Favoritos listados en la sección "Favoritos" | `src/app/favoritos/favoritos.component.html` (persistidos en `favoritos.service.ts`) |
| 9 | Botón "Leer ahora" que despacha un action de Redux | `favoritos.component.ts` → `store.dispatch(leerAhora({ noticia }))`; actions/reducer en `src/app/store/` |
| 10 | Pantalla principal con listado reactivo usando `select` del Store | `src/app/home/home.component.ts` → `store.select(selectNoticiasLeerAhora)` + `async` en el `ListView` |

---

# Evaluación Módulo 4 – Capacidades nativas y pruebas automáticas

Plugins agregados: `@nativescript/firebase-core`, `@nativescript/firebase-messaging`, `@nativescript/social-share`, `@nativescript/camera`, `@nativescript/google-maps`.
Testing: `karma`, `karma-jasmine`, `karma-junit-reporter`, `karma-chrome-launcher`, `karma-esbuild`.

## Configuración con claves propias

**Firebase (notificaciones)**
1. En [console.firebase.google.com](https://console.firebase.google.com) crea un proyecto y agrega una app Android con el paquete `org.nativescript.MiProyecto` (el `id` de `nativescript.config.ts`).
2. Descarga `google-services.json` y cópialo en `App_Resources/Android/src/google-services.json`.
3. Corre la app, entra a **Settings** y copia el **Token de Firebase** (o usa "Compartir token").
4. En Firebase → Messaging → *Nueva campaña* → *Enviar mensaje de prueba*, pega el token y envía. Con la app abierta llega como **Toast**.

**Google Maps**
1. En [console.cloud.google.com](https://console.cloud.google.com) habilita **Maps SDK for Android** y crea una API key.
2. Reemplaza `TU_API_KEY_DE_GOOGLE_MAPS` en `App_Resources/Android/src/main/AndroidManifest.xml`.

## Pruebas unitarias

~~~
npm install          # en tu Mac, para que se instalen los binarios correctos
npm run test:unit    # Jasmine + Karma en Chrome headless
~~~

Al terminar se genera `reports/junit/test-results.xml` (Karma JUnit Reporter).

| # | Requisito | Dónde está |
|---|---|---|
| 1 | Token de Firebase (integración con claves propias) | `src/app/domain/notificaciones.service.ts` (`getToken()`), se muestra en **Settings**; `google-services.json` en `App_Resources/Android/src/` |
| 2 | Toast con las notificaciones entrantes | `notificaciones.service.ts` → `messaging.onMessage(...)` + `mostrarToast()` |
| 3 | social-share con texto | `camara.component.ts` → `compartirTexto()`, `noticias-detalle.component.ts` → `compartir()`, Settings → "Compartir token" |
| 4 | social-share con imagen | `camara.component.ts` → `compartirImagenApp()` (comparte `mi_icono.png`) |
| 5 | Plugin camera para tomar fotos | `src/app/camara/camara.component.ts` → `tomarFoto()` (menú → "Cámara") |
| 6 | Compartir la foto de la cámara | `camara.component.ts` → `compartirFoto()` (`shareImage`) |
| 7 | Mapa de Google con cuenta propia | `src/app/mapa/` (`GoogleMapsModule` + `<MapView>`), API key en `AndroidManifest.xml` |
| 8 | Marker en el mapa | `mapa.component.ts` → `map.addMarker(...)` en la Plaza de Bolívar |
| 9 | Suite de Jasmine que prueba un reducer | `src/app/store/leer-ahora.reducer.spec.ts` (7 pruebas del reducer `leerAhora`) |
| 10 | Karma JUnit Reporter configurado | `karma.conf.js` (`reporters: ['progress', 'junit']`) → genera `reports/junit/test-results.xml` |
