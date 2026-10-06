import { createReducer, on } from '@ngrx/store'
import { NoticiaApi } from '../domain/noticias-api.service'
import { leerAhora, quitarDeLeerAhora } from './leer-ahora.actions'

export interface LeerAhoraState {
  noticias: NoticiaApi[]
}

export const estadoInicial: LeerAhoraState = { noticias: [] }

// Reducer: función pura que devuelve un estado nuevo (no muta el anterior)
export const leerAhoraReducer = createReducer(
  estadoInicial,
  on(leerAhora, (state, { noticia }) =>
    state.noticias.some((n) => n.id === noticia.id)
      ? state
      : { ...state, noticias: [noticia, ...state.noticias] }
  ),
  on(quitarDeLeerAhora, (state, { id }) => ({
    ...state,
    noticias: state.noticias.filter((n) => n.id !== id),
  }))
)
