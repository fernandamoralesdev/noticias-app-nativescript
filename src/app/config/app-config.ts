/**
 * (3) Variable de configuración con la URL pública de Ngrok.
 *
 * 1. Levanta la API:      cd api && npm install && npm start
 * 2. Exponla con Ngrok:   ngrok http 3000
 * 3. Copia la URL https que muestra Ngrok aquí (sin "/" al final).
 *
 * También se puede cambiar desde la app en Settings → Editar (queda guardada con ApplicationSettings).
 */
export const AppConfig = {
  apiUrl: 'https://TU-SUBDOMINIO.ngrok-free.app',
}
