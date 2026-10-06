import { createAction, props } from '@ngrx/store'
import { NoticiaApi } from '../domain/noticias-api.service'

// (9) Actions de Redux (NgRx)
export const leerAhora = createAction('[Favoritos] Leer ahora', props<{ noticia: NoticiaApi }>())
export const quitarDeLeerAhora = createAction('[Home] Quitar de leer ahora', props<{ id: number }>())
