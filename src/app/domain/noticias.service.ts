import { Injectable } from '@angular/core'

export const CATEGORIAS = ['General', 'Tecnología', 'Deportes', 'Cultura', 'Economía']

export interface Noticia {
  id: number
  titulo: string
  resumen: string
  categoria: string
  favorita: boolean
}

@Injectable({ providedIn: 'root' })
export class NoticiasService {
  private ultimoId = 3
  private noticias: Noticia[] = [
    { id: 1, titulo: 'Primera noticia', resumen: 'Texto de ejemplo 1', categoria: 'General', favorita: false },
    { id: 2, titulo: 'Segunda noticia', resumen: 'Texto de ejemplo 2', categoria: 'Tecnología', favorita: false },
    { id: 3, titulo: 'Tercera noticia', resumen: 'Texto de ejemplo 3', categoria: 'Deportes', favorita: false },
  ]

  private titulosAleatorios = [
    'Nueva app móvil rompe récords de descargas',
    'La selección gana el partido de anoche',
    'Abre una exposición de arte contemporáneo',
    'El dólar cierra la semana a la baja',
    'Lanzan un satélite hecho por estudiantes',
    'Festival de cine anuncia su programación',
    'Startup local recibe inversión internacional',
  ]

  buscar(): Noticia[] {
    return this.noticias
  }

  /** Filtra por título, resumen o categoría (sin distinguir mayúsculas). */
  buscarPorTexto(texto: string): Noticia[] {
    const t = (texto || '').trim().toLowerCase()
    if (!t) {
      return this.noticias
    }
    return this.noticias.filter(
      (n) =>
        n.titulo.toLowerCase().includes(t) ||
        n.resumen.toLowerCase().includes(t) ||
        n.categoria.toLowerCase().includes(t)
    )
  }

  buscarPorId(id: number): Noticia | undefined {
    return this.noticias.find((n) => n.id === id)
  }

  /** Crea una noticia aleatoria y la agrega al inicio del listado. */
  agregarAleatoria(): Noticia {
    const titulo = this.titulosAleatorios[Math.floor(Math.random() * this.titulosAleatorios.length)]
    const categoria = CATEGORIAS[Math.floor(Math.random() * CATEGORIAS.length)]
    const noticia: Noticia = {
      id: ++this.ultimoId,
      titulo,
      resumen: `Noticia generada al actualizar (#${this.ultimoId}).`,
      categoria,
      favorita: false,
    }
    this.noticias.unshift(noticia)
    return noticia
  }

  cambiarCategoria(id: number, categoria: string): void {
    const n = this.buscarPorId(id)
    if (n) {
      n.categoria = categoria
    }
  }

  alternarFavorita(id: number): boolean {
    const n = this.buscarPorId(id)
    if (n) {
      n.favorita = !n.favorita
      return n.favorita
    }
    return false
  }
}
