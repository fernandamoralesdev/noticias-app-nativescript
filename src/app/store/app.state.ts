import { leerAhoraReducer, LeerAhoraState } from './leer-ahora.reducer'

export interface AppState {
  leerAhora: LeerAhoraState
}

export const reducers = {
  leerAhora: leerAhoraReducer,
}
