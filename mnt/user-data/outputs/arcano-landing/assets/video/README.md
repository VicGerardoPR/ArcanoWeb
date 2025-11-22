# Video Placeholder

Este es un archivo placeholder para `hero-video.mp4`.

## Cómo agregar tu video:

1. **Prepara tu video**:
   - Formato: MP4 (H.264)
   - Resolución recomendada: 1920x1080 o 1280x720
   - Duración: 5-15 segundos
   - Tamaño: < 5MB
   - FPS: 24-30

2. **Optimiza el video** (usando ffmpeg):
   ```bash
   ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart hero-video.mp4
   ```

3. **Coloca el archivo**:
   - Nombre: `hero-video.mp4`
   - Ubicación: `/assets/video/`

4. **Verifica**:
   - El video debe tener autoplay sin sonido
   - Debe ser responsive
   - Frame-by-frame scroll debe funcionar

## Ideas para el video:

- Logo animado de Arcano Intelligence
- Transición de colores (negro → verde neón)
- Elementos tecnológicos abstractos
- Partículas o red de conexiones
- Código en movimiento
- Efectos glitch futuristas

## Alternativa sin video:

Si no tienes un video, el código ya incluye un fallback con un gradiente animado que se ve profesional.

## Recursos para crear videos:

- **Canva**: https://canva.com (plantillas de video)
- **Runway ML**: https://runwayml.com (IA para video)
- **Pexels Videos**: https://pexels.com/videos (videos gratis)
- **Coverr**: https://coverr.co (videos para web gratis)
