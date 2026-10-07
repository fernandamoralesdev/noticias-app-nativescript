// (9) Suite de Jasmine que prueba el reducer de Redux (NgRx) "leerAhora"
// Compilador JIT de Angular: necesario porque @ngrx/store trae código Angular parcialmente compilado
import '@angular/compiler'
import { leerAhoraReducer, estadoInicial, LeerAhoraState } from './leer-ahora.reducer'
import { leerAhora, quitarDeLeerAhora } from './leer-ahora.actions'
import { selectNoticiasLeerAhora } from './leer-ahora.selectors'
import { NoticiaApi } from '../domain/noticias-api.service'

describe('leerAhoraReducer', () => {
  const noticia1: NoticiaApi = { id: 1, titulo: 'Noticia 1', resumen: 'Resumen 1', categoria: 'General' }
  const noticia2: NoticiaApi = { id: 2, titulo: 'Noticia 2', resumen: 'Resumen 2', categoria: 'Deportes' }

  it('devuelve el estado inicial con una acción desconocida', () => {
    const estado = leerAhoraReducer(undefined, { type: 'ACCION_DESCONOCIDA' } as any)
    expect(estado).toEqual(estadoInicial)
    expect(estado.noticias.length).toBe(0)
  })

  it('agrega una noticia con la acción "Leer ahora"', () => {
    const estado = leerAhoraReducer(estadoInicial, leerAhora({ noticia: noticia1 }))
    expect(estado.noticias).toEqual([noticia1])
  })

  it('pone la última noticia agregada al principio de la lista', () => {
    let estado = leerAhoraReducer(estadoInicial, leerAhora({ noticia: noticia1 }))
    estado = leerAhoraReducer(estado, leerAhora({ noticia: noticia2 }))
    expect(estado.noticias.map((n) => n.id)).toEqual([2, 1])
  })

  it('no duplica una noticia que ya está en la lista', () => {
    let estado = leerAhoraReducer(estadoInicial, leerAhora({ noticia: noticia1 }))
    estado = leerAhoraReducer(estado, leerAhora({ noticia: noticia1 }))
    expect(estado.noticias.length).toBe(1)
  })

  it('quita una noticia con la acción "Quitar de leer ahora"', () => {
    const anterior: LeerAhoraState = { noticias: [noticia1, noticia2] }
    const estado = leerAhoraReducer(anterior, quitarDeLeerAhora({ id: 1 }))
    expect(estado.noticias).toEqual([noticia2])
  })

  it('no muta el estado anterior (función pura)', () => {
    const anterior: LeerAhoraState = { noticias: [noticia1] }
    const copia = JSON.parse(JSON.stringify(anterior))
    const nuevo = leerAhoraReducer(anterior, leerAhora({ noticia: noticia2 }))
    expect(anterior).toEqual(copia)
    expect(nuevo).not.toBe(anterior)
  })

  it('el selector devuelve las noticias guardadas en el store', () => {
    const appState = { leerAhora: { noticias: [noticia1] } }
    expect(selectNoticiasLeerAhora(appState)).toEqual([noticia1])
  })
})
