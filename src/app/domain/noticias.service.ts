import { Injectable } from '@angular/core'

export interface Noticia {
  id: number
  titulo: string
  resumen: string
}

@Injectable({ providedIn: 'root' })
export class NoticiasService {
  private noticias: Noticia[] = [
    { id: 1, titulo: 'Primera noticia', resumen: 'Texto de ejemplo 1' },
    { id: 2, titulo: 'Segunda noticia', resumen: 'Texto de ejemplo 2' },
    { id: 3, titulo: 'Tercera noticia', resumen: 'Texto de ejemplo 3' },
  ]

  buscar(): Noticia[] {
    return this.noticias
  }

  buscarPorId(id: number): Noticia | undefined {
    return this.noticias.find((n) => n.id === id)
  }
}
