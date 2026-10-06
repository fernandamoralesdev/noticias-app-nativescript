// (1) Aplicación Express que expone un webservice GET con filtrado por querystring
const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// Normaliza: minúsculas y sin tildes (así "tecnologia" encuentra "Tecnología")
const normalizar = (texto) =>
  (texto || '').toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase()

const noticias = [
  { id: 1, titulo: 'Nueva app móvil rompe récords de descargas', resumen: 'La aplicación superó el millón de usuarios en una semana.', categoria: 'Tecnología' },
  { id: 2, titulo: 'La selección gana el partido de anoche', resumen: 'Un gol en el último minuto definió el encuentro.', categoria: 'Deportes' },
  { id: 3, titulo: 'Abre una exposición de arte contemporáneo', resumen: 'Más de 40 artistas locales participan en la muestra.', categoria: 'Cultura' },
  { id: 4, titulo: 'El dólar cierra la semana a la baja', resumen: 'Analistas esperan estabilidad en los próximos días.', categoria: 'Economía' },
  { id: 5, titulo: 'Lanzan un satélite hecho por estudiantes', resumen: 'El proyecto universitario tardó tres años en completarse.', categoria: 'Tecnología' },
  { id: 6, titulo: 'Festival de cine anuncia su programación', resumen: 'Habrá funciones gratuitas en varios parques de la ciudad.', categoria: 'Cultura' },
  { id: 7, titulo: 'Startup local recibe inversión internacional', resumen: 'La empresa planea expandirse a tres países.', categoria: 'Economía' },
  { id: 8, titulo: 'Maratón de la ciudad bate récord de inscritos', resumen: 'Más de 20.000 corredores participarán este año.', categoria: 'Deportes' },
  { id: 9, titulo: 'Nuevo framework para apps multiplataforma', resumen: 'Promete compilar a código nativo en Android e iOS.', categoria: 'Tecnología' },
  { id: 10, titulo: 'Biblioteca pública amplía su horario', resumen: 'Ahora abrirá también los domingos.', categoria: 'General' },
]

// GET /noticias            → todas
// GET /noticias?q=texto    → filtra por título, resumen o categoría
// GET /noticias?categoria=Deportes → filtra por categoría exacta
app.get('/noticias', (req, res) => {
  const q = normalizar(req.query.q)
  const categoria = normalizar(req.query.categoria)

  let resultado = noticias
  if (q) {
    resultado = resultado.filter(
      (n) =>
        normalizar(n.titulo).includes(q) ||
        normalizar(n.resumen).includes(q) ||
        normalizar(n.categoria).includes(q)
    )
  }
  if (categoria) {
    resultado = resultado.filter((n) => normalizar(n.categoria) === categoria)
  }

  console.log(`GET /noticias q="${q}" categoria="${categoria}" → ${resultado.length} resultado(s)`)
  res.json(resultado)
})

app.get('/', (req, res) => {
  res.send('API de noticias funcionando. Prueba GET /noticias?q=tec')
})

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`)
  console.log(`Para exponerla: ngrok http ${PORT}`)
})
