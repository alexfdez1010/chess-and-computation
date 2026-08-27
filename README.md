<p align="center">
  <img src="public/assets/book/cover-es.png" alt="Portada de Ajedrez y Computación" width="260" />
</p>

<h1 align="center">♟️ Ajedrez y Computación</h1>

<p align="center">
  <strong>Una introducción visual a los algoritmos, la inteligencia artificial y el ajedrez.</strong>
</p>

<p align="center">
  Edición web bilingüe de <em>Ajedrez y Computación / Chess and Computation</em>,<br />
  escrito por Alejandro Fernández Camello.
</p>

<p align="center">
  <a href="https://chess-and-computation.alejandrofernandezcamello.me">🌐 Leer online</a>
  ·
  <a href="https://www.amazon.es/Ajedrez-Computación-movimientos-revolución-ajedrez/dp/B0CNCT6DZ1">📕 Comprar la edición en español</a>
</p>

## 📖 Sobre el libro

¿Cómo consigue una máquina jugar al ajedrez? Este proyecto recorre las ideas que hicieron posible el ajedrez computacional, desde los problemas combinatorios clásicos y los algoritmos de búsqueda hasta el aprendizaje por refuerzo, las redes neuronales y sistemas como AlphaZero.

El contenido está pensado para lectores curiosos: no hace falta ser especialista en programación ni un jugador experto para seguirlo.

## ✨ Qué incluye la edición web

- 🇪🇸 🇬🇧 Lectura completa en español e inglés.
- 🧭 Navegación por capítulos, buscador y progreso de lectura.
- ♞ Diagramas de ajedrez y figuras interactivas.
- 🧮 Fórmulas matemáticas renderizadas con KaTeX.
- 🌙 Temas claro y oscuro.
- 📱 Diseño accesible y adaptable a móvil, tableta y escritorio.
- 🔎 Metadatos SEO, Open Graph, JSON-LD y sitemap.

## 🛒 Consigue el libro

La edición en español está disponible en Amazon:

### [📕 Comprar *Ajedrez y Computación* en Amazon España](https://www.amazon.es/Ajedrez-Computación-movimientos-revolución-ajedrez/dp/B0CNCT6DZ1)

También puedes [leer gratis la edición web bilingüe](https://chess-and-computation.alejandrofernandezcamello.me).

## 🚀 Desarrollo local

El sitio está construido con [Astro](https://astro.build/) y utiliza [Bun](https://bun.sh/) como gestor de paquetes y entorno de ejecución.

```sh
git clone https://github.com/alexfdez1010/chess-and-computation.git
cd chess-and-computation
bun install --frozen-lockfile
bun run dev
```

El servidor de desarrollo mostrará la URL local en la terminal.

## 🧰 Comandos

| Comando | Descripción |
| --- | --- |
| `bun run dev` | Inicia el servidor de desarrollo. |
| `bun run check` | Comprueba los tipos y archivos de Astro. |
| `bun run build` | Valida y genera el sitio estático de producción. |
| `bun run qa` | Ejecuta la compilación y todas las verificaciones del sitio. |
| `bun run preview` | Sirve localmente la compilación de producción. |

## 🏗️ Contenido y arquitectura

La compilación genera las rutas de lectura en español e inglés, los diagramas localizados, las ecuaciones, los recursos estáticos y los metadatos del sitio. La URL de producción está configurada en Astro como `https://chess-and-computation.alejandrofernandezcamello.me`, por lo que no necesita una variable de entorno.

El contenido LaTeX original se utiliza en `tmp/source/AC` durante la conversión. Para regenerar los archivos Markdown:

```sh
bun scripts/convert-latex-content.mjs
```

Los recursos del libro y los tableros SVG generados tienen verificaciones adicionales en `scripts/`.

## 🎨 Diseño

Consulta el [sistema de diseño](docs/DESIGN_SYSTEM.md) para conocer las reglas visuales, de accesibilidad, localización y contenido del proyecto.

---

<p align="center">
  Hecho con ♟️, código y curiosidad por <strong>Alejandro Fernández Camello</strong>.
</p>
