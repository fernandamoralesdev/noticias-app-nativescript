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
| 2 | Navegación listado → detalle con `RouterExtensions.navigate` | `noticias-list.component.ts` → `verDetalle()` (también `search.component.ts` → `onItemTap()`) |
| 3 | Pull to refresh que agrega elementos aleatorios | `noticias-list.component.html` (`<PullToRefresh>`), `onPullToRefresh()`; registro en `app.module.ts` |
| 4 | Ícono que abre un diálogo "action" y cambia un atributo | ícono de etiqueta en cada noticia → `onCategoriaTap()` cambia `noticia.categoria` |
| 5 | Toast | `src/app/shared/toast.ts`, usado al refrescar, cambiar categoría, favorita y guardar |
| 6 | Two way binding `[()]` | `[(ngModel)]` en el buscador (`search.component.html`) y en el formulario de edición (`noticias-detalle.component.html`) |
| 7 | Validador personalizado con directiva | `src/app/shared/min-length.directive.ts` (`[minLen]`), usado en búsqueda (mín. 3) y edición de título (mín. 5) |
| 8 | Detección de gestos | doble tap en la estrella (`onFavoritaDoubleTap`) y long press en la lupa del buscador (`limpiar()`) |
| 9 | Animación en un ícono | la estrella rota 360° y se agranda al marcar favorita (`icono.animate(...)`) |
| 10 | Splash screen personalizado para Android | `App_Resources/Android/src/main/res/drawable-nodpi/splash_screen.xml`, colores en `values/colors.xml`, Android 12+ en `values-v31/styles.xml` |
