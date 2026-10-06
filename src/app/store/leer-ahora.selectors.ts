import { createFeatureSelector, createSelector } from '@ngrx/store'
import { LeerAhoraState } from './leer-ahora.reducer'

// (10) Selectores usados con store.select(...)
export const selectLeerAhoraState = createFeatureSelector<LeerAhoraState>('leerAhora')
export const selectNoticiasLeerAhora = createSelector(selectLeerAhoraState, (s) => s.noticias)
