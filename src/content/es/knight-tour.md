---
title: "El tour del caballo"
description: "En esta sección, nos adentraremos en la exploración de uno de los problemas más intrigantes originados del fascinante mundo del ajedrez."
chapter: "Problemas ajedrecísticos"
part: "book"
order: 2
bookChapter: "1"
bookChapterTitle: "Problemas ajedrecísticos"
sectionNumber: "1.2"
sectionTitle: "El tour del caballo"
navDepth: 2
pairedSlug: "knight-tour"
source: "es/knight-tour.tex"
draft: false
---

### El caballo saltarín

En esta sección, nos adentraremos en la exploración de uno de los problemas más intrigantes originados del fascinante mundo del ajedrez. El protagonista de este enigma es el caballo, una pieza cuyo singular tipo de movimiento lo distingue de todas las demás piezas en el tablero de ajedrez. Esta peculiaridad convierte este problema en un retador pasatiempo intelectual. Sin más preámbulos, la definición del problema:

"Colocamos el caballo en una casilla inicial en un tablero de dimensiones $m \times n$. El objetivo es encontrar un camino que recorra cada casilla del tablero exactamente una vez."

En términos más sencillos, el desafío consiste en recorrer todas las casillas del tablero, sin repetir ninguna, utilizando el característico movimiento en "L" del caballo. Al enfrentarse por primera vez a este desafío, es probable que uno se dé cuenta de que no es nada trivial, y puede requerir varios intentos para lograrlo incluso en el clásico tablero de $8 \times 8$. Es importante destacar que el tablero no necesariamente tiene que ser cuadrado; puede ser cualquier rectángulo.

Este problema ha capturado la atención de notables matemáticos a lo largo de la historia. Entre ellos destaca Leonhard Euler, considerado uno de los matemáticos más preeminentes de todos los tiempos. Euler no solo logró resolver este problema para un tablero de $8 \times 8$, sino que además construyó un semi-cuadrado mágico en el que cada fila y columna suman 260, las mitades de las filas y columnas suman 130, y cada número representa el orden del movimiento con el cual el caballo visitó esa casilla en particular.

La elegancia de esta solución se puede apreciar en la Figura [referencia](#fig-cuadrado-magico-de-euler).

<figure id="fig-cuadrado-magico-de-euler">
  <div class="chessboard" data-fen="start" data-size="8" data-marks="a1-a1, b1-b1, c1-c1, d1-d1, e1-e1, f1-f1, g1-g1, h1-h1, a2-a2, b2-b2, c2-c2, d2-d2, e2-e2, f2-f2, g2-g2, h2-h2, a3-a3, b3-b3, c3-c3, d3-d3, e3-e3, f3-f3, g3-g3, h3-h3, a4-a4, b4-b4, c4-c4, d4-d4, e4-e4, f4-f4, g4-g4, h4-h4, a5-a5, b5-b5, c5-c5, d5-d5, e5-e5, f5-f5, g5-g5, h5-h5, a6-a6, b6-b6, c6-c6, d6-d6, e6-e6, f6-f6, g6-g6, h6-h6, a7-a7, b7-b7, c7-c7, d7-d7, e7-e7, f7-f7, g7-g7, h7-h7, a8-a8, b8-b8, c8-c8, d8-d8, e8-e8, f8-f8, g8-g8, h8-h8" data-labels="{&quot;a1&quot;:&quot;54&quot;,&quot;b1&quot;:&quot;27&quot;,&quot;c1&quot;:&quot;42&quot;,&quot;d1&quot;:&quot;7&quot;,&quot;e1&quot;:&quot;58&quot;,&quot;f1&quot;:&quot;23&quot;,&quot;g1&quot;:&quot;38&quot;,&quot;h1&quot;:&quot;11&quot;,&quot;a2&quot;:&quot;43&quot;,&quot;b2&quot;:&quot;6&quot;,&quot;c2&quot;:&quot;55&quot;,&quot;d2&quot;:&quot;26&quot;,&quot;e2&quot;:&quot;39&quot;,&quot;f2&quot;:&quot;10&quot;,&quot;g2&quot;:&quot;59&quot;,&quot;h2&quot;:&quot;22&quot;,&quot;a3&quot;:&quot;28&quot;,&quot;b3&quot;:&quot;53&quot;,&quot;c3&quot;:&quot;8&quot;,&quot;d3&quot;:&quot;41&quot;,&quot;e3&quot;:&quot;24&quot;,&quot;f3&quot;:&quot;57&quot;,&quot;g3&quot;:&quot;12&quot;,&quot;h3&quot;:&quot;37&quot;,&quot;a4&quot;:&quot;5&quot;,&quot;b4&quot;:&quot;44&quot;,&quot;c4&quot;:&quot;25&quot;,&quot;d4&quot;:&quot;56&quot;,&quot;e4&quot;:&quot;9&quot;,&quot;f4&quot;:&quot;40&quot;,&quot;g4&quot;:&quot;21&quot;,&quot;h4&quot;:&quot;60&quot;,&quot;a5&quot;:&quot;52&quot;,&quot;b5&quot;:&quot;29&quot;,&quot;c5&quot;:&quot;4&quot;,&quot;d5&quot;:&quot;45&quot;,&quot;e5&quot;:&quot;20&quot;,&quot;f5&quot;:&quot;61&quot;,&quot;g5&quot;:&quot;36&quot;,&quot;h5&quot;:&quot;13&quot;,&quot;a6&quot;:&quot;47&quot;,&quot;b6&quot;:&quot;2&quot;,&quot;c6&quot;:&quot;49&quot;,&quot;d6&quot;:&quot;32&quot;,&quot;e6&quot;:&quot;15&quot;,&quot;f6&quot;:&quot;34&quot;,&quot;g6&quot;:&quot;17&quot;,&quot;h6&quot;:&quot;64&quot;,&quot;a7&quot;:&quot;30&quot;,&quot;b7&quot;:&quot;51&quot;,&quot;c7&quot;:&quot;46&quot;,&quot;d7&quot;:&quot;3&quot;,&quot;e7&quot;:&quot;62&quot;,&quot;f7&quot;:&quot;19&quot;,&quot;g7&quot;:&quot;14&quot;,&quot;h7&quot;:&quot;35&quot;,&quot;a8&quot;:&quot;1&quot;,&quot;b8&quot;:&quot;48&quot;,&quot;c8&quot;:&quot;31&quot;,&quot;d8&quot;:&quot;50&quot;,&quot;e8&quot;:&quot;33&quot;,&quot;f8&quot;:&quot;16&quot;,&quot;g8&quot;:&quot;63&quot;,&quot;h8&quot;:&quot;18&quot;}" data-chess-options="&quot;maxfield=h8, showmover=false, largeboard, pgfstyle=text, text= \\bfseries 54, markregions={a1-a1}, text= \\bfseries 27, markregions={b1-b1}, text= \\bfseries 42, markregions={c1-c1}, text= \\bfseries 7, markregions={d1-d1}, text= \\bfseries 58, markregions={e1-e1}, text= \\bfseries 23, markregions={f1-f1}, text= \\bfseries 38, markregions={g1-g1}, text= \\bfseries 11, markregions={h1-h1}, text= \\bfseries 43, markregions={a2-a2}, text= \\bfseries 6, markregions={b2-b2}, text= \\bfseries 55, markregions={c2-c2}, text= \\bfseries 26, markregions={d2-d2}, text= \\bfseries 39, markregions={e2-e2}, text= \\bfseries 10, markregions={f2-f2}, text= \\bfseries 59, markregions={g2-g2}, text= \\bfseries 22, markregions={h2-h2}, text= \\bfseries 28, markregions={a3-a3}, text= \\bfseries 53, markregions={b3-b3}, text= \\bfseries 8, markregions={c3-c3}, text= \\bfseries 41, markregions={d3-d3}, text= \\bfseries 24, markregions={e3-e3}, text= \\bfseries 57, markregions={f3-f3}, text= \\bfseries 12, markregions={g3-g3}, text= \\bfseries 37, markregions={h3-h3}, text= \\bfseries 5, markregions={a4-a4}, text= \\bfseries 44, markregions={b4-b4}, text= \\bfseries 25, markregions={c4-c4}, text= \\bfseries 56, markregions={d4-d4}, text= \\bfseries 9, markregions={e4-e4}, text= \\bfseries 40, markregions={f4-f4}, text= \\bfseries 21, markregions={g4-g4}, text= \\bfseries 60, markregions={h4-h4}, text= \\bfseries 52, markregions={a5-a5}, text= \\bfseries 29, markregions={b5-b5}, text= \\bfseries 4, markregions={c5-c5}, text= \\bfseries 45, markregions={d5-d5}, text= \\bfseries 20, markregions={e5-e5}, text= \\bfseries 61, markregions={f5-f5}, text= \\bfseries 36, markregions={g5-g5}, text= \\bfseries 13, markregions={h5-h5}, text= \\bfseries 47, markregions={a6-a6}, text= \\bfseries 2, markregions={b6-b6}, text= \\bfseries 49, markregions={c6-c6}, text= \\bfseries 32, markregions={d6-d6}, text= \\bfseries 15, markregions={e6-e6}, text= \\bfseries 34, markregions={f6-f6}, text= \\bfseries 17, markregions={g6-g6}, text= \\bfseries 64, markregions={h6-h6}, text= \\bfseries 30, markregions={a7-a7}, text= \\bfseries 51, markregions={b7-b7}, text= \\bfseries 46, markregions={c7-c7}, text= \\bfseries 3, markregions={d7-d7}, text= \\bfseries 62, markregions={e7-e7}, text= \\bfseries 19, markregions={f7-f7}, text= \\bfseries 14, markregions={g7-g7}, text= \\bfseries 35, markregions={h7-h7}, text= \\bfseries 1, markregions={a8-a8}, text= \\bfseries 48, markregions={b8-b8}, text= \\bfseries 31, markregions={c8-c8}, text= \\bfseries 50, markregions={d8-d8}, text= \\bfseries 33, markregions={e8-e8}, text= \\bfseries 16, markregions={f8-f8}, text= \\bfseries 63, markregions={g8-g8}, text= \\bfseries 18, markregions={h8-h8},&quot;" role="img" aria-label="Cuadrado mágico de Euler" data-rendered="source" data-board-asset="board-8x8-08ce56e190216daa.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-08ce56e190216daa.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Cuadrado mágico de Euler</figcaption>
</figure>

Más allá de esta intrigante construcción, este problema también puede ser utilizado como un medio para generar arte computacional. A continuación, se presenta una serie de composiciones artísticas inspiradas en los movimientos de un caballo:

<figure id="fig-composiciones-artisticas-con-el-tour-del-caballo">
  <div class="subfigure-grid" role="group" aria-label="Composiciones artísticas basadas en el Tour del Caballo">
    <figure class="subfigure" id="fig-tablero-20x20" data-width="0.49\textwidth" style="--subfigure-width:49%">
      <img src="/assets/book/knight-tour/board_knight20x20art-83.png" alt="Composición basada en un tablero de 20x20" loading="lazy" />
      <figcaption>Composición basada en un tablero de 20x20</figcaption>
    </figure>
    <figure class="subfigure" id="fig-tablero-50x50" data-width="0.49\textwidth" style="--subfigure-width:49%">
      <img src="/assets/book/knight-tour/board_knight50x50art-82.png" alt="Composición basada en un tablero de 50x50" loading="lazy" />
      <figcaption>Composición basada en un tablero de 50x50</figcaption>
    </figure>
    <figure class="subfigure" id="fig-tablero-64x64" data-width="0.49\textwidth" style="--subfigure-width:49%">
      <img src="/assets/book/knight-tour/board_knight64x64art-84.png" alt="Composición basada en un tablero de 64x64" loading="lazy" />
      <figcaption>Composición basada en un tablero de 64x64</figcaption>
    </figure>
    <figure class="subfigure" id="fig-tablero-130x130" data-width="0.49\textwidth" style="--subfigure-width:49%">
      <img src="/assets/book/knight-tour/board_knight130x130art-85.png" alt="Composición basada en un tablero de 130x130" loading="lazy" />
      <figcaption>Composición basada en un tablero de 130x130</figcaption>
    </figure>
  </div>
  <figcaption>Composiciones artísticas basadas en el Tour del Caballo</figcaption>
</figure>

Las obras representadas corresponden a tableros de diferentes tamaños: 20x20 (esquina superior izquierda), 50x50 (esquina superior derecha), 64x64 (esquina inferior izquierda) y 130x130 (esquina inferior derecha). Cada una de estas composiciones ilustra la rica variedad de patrones que pueden surgir de la sencilla pero desafiante tarea de recorrer un tablero de ajedrez con un caballo.

Para relacionar más al lector con el problema procederé a mostrar la solución de un tablero 8x8 mediante flechas:

<figure id="fig-solucion-al-tablero-de-8x8">
  <div class="chessboard" data-fen="start" data-size="8" data-pieces="na8" data-arrows="a8-b6, b6-d7, d7-c5, c5-a4, a4-b2, b2-d1, d1-c3, c3-e4, e4-f2, f2-h1, h1-g3, g3-h5, h5-g7, g7-e6, e6-f8, f8-g6, g6-h8, h8-f7, f7-e5, e5-g4, g4-h2, h2-f1, f1-e3, e3-c4, c4-d2, d2-b1, b1-a3, a3-b5, b5-a7, a7-c8, c8-d6, d6-e8, e8-f6, f6-h7, h7-g5, g5-h3, h3-g1, g1-e2, e2-f4, f4-d3, d3-c1, c1-a2, a2-b4, b4-d5, d5-c7, c7-a6, a6-b8, b8-c6, c6-d8, d8-b7, b7-a5, a5-b3, b3-a1, a1-c2, c2-d4, d4-f3, f3-e1, e1-g2, g2-h4, h4-f5, f5-e7, e7-g8, g8-h6" data-chess-options="&quot;maxfield=h8, showmover=false, setpieces={na8}, pgfstyle=straightmove, markmoves={a8-b6, b6-d7, d7-c5, c5-a4, a4-b2, b2-d1, d1-c3, c3-e4, e4-f2, f2-h1, h1-g3, g3-h5, h5-g7, g7-e6, e6-f8, f8-g6, g6-h8, h8-f7, f7-e5, e5-g4, g4-h2, h2-f1, f1-e3, e3-c4, c4-d2, d2-b1, b1-a3, a3-b5, b5-a7, a7-c8, c8-d6, d6-e8, e8-f6, f6-h7, h7-g5, g5-h3, h3-g1, g1-e2, e2-f4, f4-d3, d3-c1, c1-a2, a2-b4, b4-d5, d5-c7, c7-a6, a6-b8, b8-c6, c6-d8, d8-b7, b7-a5, a5-b3, b3-a1, a1-c2, c2-d4, d4-f3, f3-e1, e1-g2, g2-h4, h4-f5, f5-e7, e7-g8, g8-h6}, arrow=to, largeboard&quot;" role="img" aria-label="Solución al tablero de 8x8" data-rendered="source" data-board-asset="board-8x8-624290f41bc844ee.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-624290f41bc844ee.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Solución al tablero de 8x8</figcaption>
</figure>

Una observación crucial en la resolución de este problema es que las primeras casillas que visita el caballo tienden a estar ubicadas en las regiones más alejadas del centro. Esta técnica desempeña un papel fundamental en la solución del desafío planteado. Por si no se ha dado cuenta se trata de la solución al cuadrado mágico de Euler mostrado anteriormente.

El tour del caballo en este contexto está estrechamente vinculado a uno de los problemas más relevantes en el campo de la informática: el conocido problema de encontrar un camino hamiltoniano, el cual se clasifica como un problema NP.

### Caminos hamiltonianos y grafos

El problema del camino hamiltoniano se define de la siguiente manera:

"Dado un grafo, se busca encontrar un camino que visite cada uno de los vértices exactamente una vez". (Un camino es la secuencia en la que se recorren los vértices del grafo).

Esta definición presenta una notable similitud con el concepto del tour del caballo. Pero ¿qué son exactamente un grafo y sus vértices?

Un grafo es una estructura de datos que proporciona una gran flexibilidad para representar relaciones entre diferentes elementos. Consiste en un conjunto de vértices (también conocidos como nodos) y aristas (o conexiones). Los vértices pueden ser cualquier tipo de objeto, desde números hasta palabras y objetos más complejos. Las aristas, por otro lado, conectan dos vértices si existe alguna relación entre ellos. En el caso de que las aristas tengan un valor numérico que represente algún aspecto de la relación entre los elementos conectados, se denomina grafo valuado.

Volviendo al tema del camino hamiltoniano, al modificar ligeramente las condiciones del problema, surgen dos problemas interesantes adicionales. Si agregamos la restricción de que, al llegar al último vértice, se debe regresar al vértice inicial, se obtiene lo que se conoce como ciclo hamiltoniano. Por otro lado, si utilizamos un grafo valuado (cada arista tiene asociado un número que expresa el coste de usar esa arista) y buscamos el camino que minimice la suma de los valores de las aristas recorridas, nos enfrentamos al problema del viajante.

Pero ¿cómo se relacionan los grafos y los diferentes problemas hamiltonianos con el tour del caballo?

Aunque no sea evidente a primera vista, el tablero de ajedrez puede considerarse como un grafo implícito, donde los vértices y las aristas están presentes de manera disimulada. En este caso, los vértices representarían las casillas del tablero, mientras que las aristas modelarían la relación entre dos casillas. Por lo tanto, habría una arista entre dos casillas específicas si es posible moverse de una a otra mediante un único movimiento del caballo. A continuación, se muestra un ejemplo de un tablero de $3 \times 3$ y su correspondiente transformación en un grafo que ilustra el anterior concepto.

<figure id="fig-tablero-de-ajedrez-a-grafo">
  <div class="subfigure-grid" role="group" aria-label="Tablero de ajedrez a grafo">
    <figure class="subfigure" id="fig-tablero-de-ajedrez" data-width="0.45\textwidth" style="--subfigure-width:45%">
      <div class="chessboard" data-fen="start" data-size="3" data-marks="a1-a1, b1-b1, c1-c1, a2-a2, b2-b2, c2-c2, a3-a3, b3-b3, c3-c3" data-labels="{&quot;a1&quot;:&quot;1&quot;,&quot;b1&quot;:&quot;2&quot;,&quot;c1&quot;:&quot;3&quot;,&quot;a2&quot;:&quot;4&quot;,&quot;b2&quot;:&quot;5&quot;,&quot;c2&quot;:&quot;6&quot;,&quot;a3&quot;:&quot;7&quot;,&quot;b3&quot;:&quot;8&quot;,&quot;c3&quot;:&quot;9&quot;}" data-chess-options="&quot;maxfield=c3, largeboard, showmover=false, pgfstyle=text, text= \\bfseries 1, markregions={a1-a1}, text= \\bfseries 2, markregions={b1-b1}, text= \\bfseries 3, markregions={c1-c1}, text= \\bfseries 4, markregions={a2-a2}, text= \\bfseries 5, markregions={b2-b2}, text= \\bfseries 6, markregions={c2-c2}, text= \\bfseries 7, markregions={a3-a3}, text= \\bfseries 8, markregions={b3-b3}, text= \\bfseries 9, markregions={c3-c3}&quot;" role="img" aria-label="Tablero de ajedrez" data-rendered="source" data-board-asset="board-3x3-02af1a615070534e.svg"><img class="source-chessboard" src="/assets/boards/board-3x3-02af1a615070534e.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
      <figcaption>Tablero de ajedrez</figcaption>
    </figure>
    <figure class="subfigure" id="fig-grafo" data-width="0.45\textwidth" style="--subfigure-width:45%">
      <img src="/assets/book/knight-tour/graph_3x3.png" alt="Grafo" loading="lazy" />
      <figcaption>Grafo</figcaption>
    </figure>
  </div>
  <figcaption>Tablero de ajedrez a grafo</figcaption>
</figure>

En primer lugar, se numeran las casillas del tablero asignándole a cada uno de ellas un número natural (esto es una técnica muy usual a la hora de trabajar con grafos) y se dibuja el grafo.

En esta representación, se cumple que existe una arista entre dos casillas si es posible moverse entre ellas en un solo movimiento. Por ejemplo, desde la casilla 9 se puede llegar a las casillas 4 y 2 mediante un movimiento de caballo, mientras que la casilla 5 no tiene ninguna arista, ya que no es posible llegar a ella desde ninguna otra casilla.

Ahora bien, ¿cómo es capaz un ordenador de entender un grafo y cómo se representa para que sea comprendido por una máquina?

### Representación de grafos

La representación de un grafo es un elemento crucial en la eficacia y eficiencia de los algoritmos que los utilizan. Existen múltiples representaciones, cada una con sus ventajas y desventajas únicas. Antes de adentrarnos en la explicación de estas representaciones, es esencial reconocer que los grafos pueden ser de dos tipos: dirigidos y no dirigidos.

En los grafos dirigidos, las aristas funcionan como "flechas", es decir, la relación existe sólo desde un vértice hacia otro, y puede darse el caso de que no exista una relación en sentido contrario. En contraste, en los grafos no dirigidos, las aristas indican que existe una relación bidireccional entre los dos vértices, tal como se ilustró con el grafo que discutimos anteriormente.

Entre las diversas representaciones de grafos, la matriz de adyacencia es una opción notable. Como su nombre lo sugiere, es una matriz en la que la fila $i$ y la columna $j$ representan la relación desde el vértice $i$ hacia el vértice $j$.

Si estamos trabajando con un grafo no ponderado, es común usar un 1 para denotar la existencia de una arista desde $i$ a $j$, y un 0 en caso contrario. Sin embargo, si el grafo es ponderado, colocaremos el valor de la arista que conecta los vértices $i$ y $j$ en la respectiva posición de la matriz. Si no existe tal conexión, a menudo se usa un número muy grande para indicar que la arista es inutilizable, aunque también existen otras alternativas.

Tomemos, por ejemplo, la matriz de adyacencia del grafo de un tablero 3x3, que se representaría de la siguiente manera:

<figure id="fig-representacion-usando-una-matriz-de-adyacencia">
  <div class="figure-equation" data-math="\begin{bmatrix}
            0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 1 &amp; 0 &amp; 1 &amp; 0 \\
            0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 1 &amp; 0 &amp; 1 \\
            0 &amp; 0 &amp; 0 &amp; 1 &amp; 0 &amp; 0 &amp; 0 &amp; 1 &amp; 0 \\
            0 &amp; 0 &amp; 1 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 1 \\
            0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\
            1 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 1 &amp; 0 &amp; 0 \\
            0 &amp; 1 &amp; 0 &amp; 0 &amp; 0 &amp; 1 &amp; 0 &amp; 0 &amp; 0 \\
            1 &amp; 0 &amp; 1 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\
            0 &amp; 1 &amp; 0 &amp; 1 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\
        \end{bmatrix}" aria-label="bmatrix 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 1 &amp; 0 &amp; 1 &amp; 0 \\ 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 1 &amp; 0 &amp; 1 \\ 0 &amp; 0 &amp; 0 &amp; 1 &amp; 0 &amp; 0 &amp; 0 &amp; 1 &amp; 0 \\ 0 &amp; 0 &amp; 1 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 1 \\ 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\ 1 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 1 &amp; 0 &amp; 0 \\ 0 &amp; 1 &amp; 0 &amp; 0 &amp; 0 &amp; 1 &amp; 0 &amp; 0 &amp; 0 \\ 1 &amp; 0 &amp; 1 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\ 0 &amp; 1 &amp; 0 &amp; 1 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\ bmatrix"></div>
  <figcaption>Representación usando una matriz de adyacencia</figcaption>
</figure>

Es relevante notar que la matriz de adyacencia es simétrica. Es decir, si intercambiamos filas por columnas, obtenemos la misma matriz. Esta característica siempre está presente en las matrices de adyacencia de grafos no dirigidos, debido a la naturaleza bidireccional de sus relaciones. Puede parecer que existe una redundancia de información, y en efecto, así es. Por lo tanto, realmente sólo necesitamos la mitad de la matriz, específicamente, la sección por encima o debajo de la diagonal que se extiende desde la esquina superior izquierda hasta la esquina inferior derecha, para tener todos los datos necesarios del grafo. Además, es importante señalar que tanto la columna como la fila del 5 están vacías, ya que es imposible llegar a esa casilla o partir de ella hacia otra.

La principal ventaja de esta representación es que permite consultar en tiempo constante si se puede pasar de un vértice a otro. Esto es particularmente útil en la implementación de dos algoritmos ampliamente utilizados en grafos: Warshall y Floyd. Warshall es útil para determinar si existe un camino entre un vértice y cualquier otro, y también proporciona dicho camino. Por otro lado, Floyd opera sobre grafos ponderados y proporciona el camino más corto entre dos vértices, si existe, y el valor de dicho camino.

Sin embargo, la matriz de adyacencia también almacena relaciones inexistentes, es decir, los 0s en la matriz. Además, estos 0s superan en número a los 1s, lo que indica que el número de relaciones es pequeño en comparación con el total de posibles relaciones. Esto nos lleva a preguntar: ¿no debería existir una forma de almacenar únicamente las relaciones existentes en el grafo y evitar almacenar los 0s?

Efectivamente, la respuesta es afirmativa. Para este propósito, se puede utilizar la lista de adyacencia. Su principal premisa es almacenar sólo las relaciones entre los diferentes vértices, lo que permite un gran ahorro de memoria e incluso, en ocasiones, de tiempo de cómputo. En una lista de adyacencia, cada vértice tiene asignada una lista en la que figuran los vértices con los que está relacionado. La lista de adyacencia para el grafo anterior se presentaría de la siguiente manera:

<figure id="fig-representacion-usando-una-lista-de-adyacencia">
  <div class="figure-equation" data-math="\begin{aligned}
&amp;1 \rightarrow
        \begin{bmatrix}
            6 &amp; 8
        \end{bmatrix}
        \\
        &amp;2 \rightarrow
        \begin{bmatrix}
            7 &amp; 9
        \end{bmatrix}
        \\
        &amp;3 \rightarrow
        \begin{bmatrix}
            4 &amp; 8
        \end{bmatrix}
        \\
        &amp;4 \rightarrow
        \begin{bmatrix}
            3 &amp; 9
        \end{bmatrix}
        \\
        &amp;5 \rightarrow
        \\
        &amp;6 \rightarrow
        \begin{bmatrix}
            1 &amp; 7
        \end{bmatrix}
        \\
        &amp;7 \rightarrow
        \begin{bmatrix}
            2 &amp; 6
        \end{bmatrix}
        \\
        &amp;8 \rightarrow
        \begin{bmatrix}
            1 &amp; 3
        \end{bmatrix}
        \\
        &amp;9 \rightarrow
        \begin{bmatrix}
            2 &amp; 4
        \end{bmatrix}
        \\
\end{aligned}" aria-label="aligned &amp;1 bmatrix 6 &amp; 8 bmatrix \\ &amp;2 bmatrix 7 &amp; 9 bmatrix \\ &amp;3 bmatrix 4 &amp; 8 bmatrix \\ &amp;4 bmatrix 3 &amp; 9 bmatrix \\ &amp;5 \\ &amp;6 bmatrix 1 &amp; 7 bmatrix \\ &amp;7 bmatrix 2 &amp; 6 bmatrix \\ &amp;8 bmatrix 1 &amp; 3 bmatrix \\ &amp;9 bmatrix 2 &amp; 4 bmatrix \\ aligned"></div>
  <figcaption>Representación usando una lista de adyacencia</figcaption>
</figure>

Como puede ver, se ha logrado una significativa reducción en la cantidad de información almacenada utilizando la lista de adyacencia. En este caso específico del tablero de ajedrez, somos afortunados ya que una pieza de caballo solo puede moverse a un máximo de dos casillas. Sin embargo, a medida que el tamaño del tablero aumenta, la eficiencia en términos de memoria de la lista de adyacencia sobre la matriz de adyacencia también se incrementa. Esto se debe a que, como mucho, un caballo podrá moverse a 8 casillas diferentes desde una casilla específica, por lo que la lista tendrá a lo sumo ese número de elementos.

La principal desventaja de este método de representación es que, si necesitamos verificar la existencia de una arista entre dos vértices, debemos buscar en la lista del primer vértice para ver si el segundo vértice aparece o no. Es importante mencionar que esta representación también puede ser usada para grafos ponderados. En ese caso, los elementos de las listas son reemplazados por tuplas de dos valores: el vértice y el peso de la arista. Esta representación puede no ser adecuada para algoritmos como Floyd o Warshall <span class="footnote" role="note">El algoritmo de Floyd encuentra la ruta más corta entre todos los pares de nodos en un grafo. Por otro lado, el algoritmo de Warshall determina si existe un camino entre todos los pares de nodos.</span>, pero es más eficiente para algoritmos que buscan caminos o ciclos hamiltonianos.

Por último, vale la pena mencionar que existe otra forma de representar un grafo, denominada lista de aristas. Como su nombre lo indica, esta lista contiene todas las aristas, cada una expresada como una tupla de dos enteros, donde el primer entero representa el vértice origen y el segundo el vértice destino. Sin embargo, este método de representación se utiliza raramente.

Habiendo examinado las diferentes formas de representación de un grafo, estamos listos para abordar el problema del camino hamiltoniano. Para resolver este desafío, debemos recurrir a una estrategia bien conocida: el *backtracking*.

### *Backtracking* vs. el tour del caballo

Al igual que en el problema de las $n$-damas, nos enfrentamos a una interrogante: ¿cómo podemos prever si una decisión que tomamos nos llevará inexorablemente a un callejón sin salida o a una solución válida?

Necesitaremos la habilidad de retroceder y explorar otros caminos para encontrar una solución válida, si es que existe. Por esta razón, el *backtracking* parece la opción más adecuada de manera intuitiva. Sin embargo, como se mencionó anteriormente, estamos lidiando con un problema NP. Afortunadamente, el "tour del caballo" es una versión específica del problema donde podemos mejorar notablemente la eficiencia del algoritmo utilizando una heurística <span class="footnote" role="note">Una heurística es una regla práctica o método aproximado que ayuda a simplificar y resolver problemas, a menudo permitiendo encontrar soluciones suficientemente buenas aunque no siempre óptimas.</span> conocida como la regla de Warnsdorff. Esta regla reduce la complejidad del algoritmo, permitiendo una solución en tiempo lineal.

Una heurística es una guía que nos orienta hacia los estados que son más propensos a conducir a una solución válida. La regla de Warnsdorff nos aconseja dirigirnos hacia el vértice de menor grado. Aquí surge una nueva pregunta: ¿qué es el grado de un vértice?

El grado de un vértice se define como el número de vértices a los que se puede llegar desde dicho vértice con un único movimiento. Es similar al número de aristas de un vértice, pero no se cuentan aquellas aristas que llevan a un vértice ya visitado. Si el grado de un vértice es 0, significa que no podremos realizar ningún movimiento más una vez que lleguemos a ese vértice. Por lo tanto, solo deberíamos dirigirnos a un vértice de grado 0 si este es el último movimiento que pretendemos hacer.

Una vez que hemos aclarado este término, podemos proceder a resolver el problema en un tablero de 5x5. Supongamos que la casilla inicial del caballo corresponde a1, es decir, un caballo situado en la esquina inferior izquierda. Usaremos una matriz de las mismas dimensiones que el tablero para registrar las casillas que ya hemos visitado y avanzar en la resolución del problema. Esta matriz será de enteros, y el valor de una casilla será el número de orden en el que fue visitada. Al comenzar, todos los valores de la matriz serán 0, excepto la casilla inicial, que tendrá el valor 1. El cero indica que esa casilla no ha sido visitada de momento.

<figure id="fig-posicion-inicial-del-tour-del-caballo-usando-vuelta-atras">
  <div class="chessboard" data-fen="start" data-size="5" data-pieces="na1" data-chess-options="&quot;maxfield=e5, showmover=false, setpieces={na1}, largeboard&quot;" role="img" aria-label="Posición inicial del tour del caballo usando vuelta atrás" data-rendered="source" data-board-asset="board-5x5-9017a090556574f5.svg"><img class="source-chessboard" src="/assets/boards/board-5x5-9017a090556574f5.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Posición inicial del tour del caballo usando vuelta atrás</figcaption>
</figure>

En la primera vuelta alrededor del tablero, el caballo ha pasado por las cuatro esquinas, ya que estas siempre tienen grado 1, al llevar solo a dos casillas y una de ellas ya estará visitada (por la que ha llegado a la esquina). En el segundo movimiento, al moverse desde la casilla b3 a la a5, se aplica claramente la regla al preferir ir a la esquina a5 con grado 1 en lugar de ir a las casillas c5 o d4 con grado 3. La matriz de visitados quedaría de la siguiente manera, junto al tablero que indica los movimientos del caballo:

<figure id="fig-primera-fase-del-tour-del-caballo-usando-vuelta-atras">
  <div class="subfigure-grid" role="group" aria-label="Primera fase del tour del caballo usando vuelta atrás">
    <figure class="subfigure" id="fig-tablero-de-ajedrez-con-los-movimientos-de-la-primera-fase" data-width="0.45\textwidth" style="--subfigure-width:45%">
      <div class="chessboard" data-fen="start" data-size="5" data-pieces="nc2" data-arrows="a1-b3, b3-a5, a5-c4, c4-e5, e5-d3, d3-e1, e1-c2" data-chess-options="&quot;maxfield=e5, showmover=false, setpieces={nc2}, pgfstyle=straightmove, markmoves={a1-b3, b3-a5, a5-c4, c4-e5, e5-d3, d3-e1, e1-c2}, arrow=to&quot;" role="img" aria-label="Tablero de ajedrez con los movimientos de la primera fase" data-rendered="source" data-board-asset="board-5x5-f8d48ac43784681e.svg"><img class="source-chessboard" src="/assets/boards/board-5x5-f8d48ac43784681e.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
      <figcaption>Tablero de ajedrez con los movimientos de la primera fase</figcaption>
    </figure>
    <figure class="subfigure" id="fig-matriz-con-los-movimientos-de-la-primera-fase" data-width="0.45\textwidth" style="--subfigure-width:45%">
      <div class="figure-equation" data-math="\begin{bmatrix}
                    3 &amp; 0 &amp; 0 &amp; 0 &amp; 5 \\
                    0 &amp; 0 &amp; 4 &amp; 0 &amp; 0 \\
                    0 &amp; 2 &amp; 0 &amp; 6 &amp; 0 \\
                    0 &amp; 0 &amp; 8 &amp; 0 &amp; 0 \\
                    1 &amp; 0 &amp; 0 &amp; 0 &amp; 7 \\
                \end{bmatrix}" aria-label="bmatrix 3 &amp; 0 &amp; 0 &amp; 0 &amp; 5 \\ 0 &amp; 0 &amp; 4 &amp; 0 &amp; 0 \\ 0 &amp; 2 &amp; 0 &amp; 6 &amp; 0 \\ 0 &amp; 0 &amp; 8 &amp; 0 &amp; 0 \\ 1 &amp; 0 &amp; 0 &amp; 0 &amp; 7 \\ bmatrix"></div>
      <figcaption>Matriz con los movimientos de la primera fase</figcaption>
    </figure>
  </div>
  <figcaption>Primera fase del tour del caballo usando vuelta atrás</figcaption>
</figure>

Siguiendo la misma heurística, el caballo realiza una segunda vuelta por el tablero, obteniendo el siguiente tablero y estado:

<figure id="fig-segunda-fase-del-tour-del-caballo-usando-vuelta-atras">
  <div class="subfigure-grid" role="group" aria-label="Segunda fase del tour del caballo usando vuelta atrás">
    <figure class="subfigure" id="fig-tablero-de-ajedrez-con-los-movimientos-de-la-segunda-fase" data-width="0.45\textwidth" style="--subfigure-width:45%">
      <div class="chessboard" data-fen="start" data-size="5" data-pieces="nb1" data-arrows="a1-b3, b3-a5, a5-c4, c4-e5, e5-d3, d3-e1, e1-c2, c2-d3, e3-d1, d1-b2, b2-a4, a4-c5, c5-e4, e4-d2, d2-b1" data-chess-options="&quot;maxfield=e5, showmover=false, setpieces={nb1}, pgfstyle=straightmove, markmoves={a1-b3, b3-a5, a5-c4, c4-e5, e5-d3, d3-e1, e1-c2, c2-d3, e3-d1, d1-b2, b2-a4, a4-c5, c5-e4, e4-d2, d2-b1}, arrow=to&quot;" role="img" aria-label="Tablero de ajedrez con los movimientos de la segunda fase" data-rendered="source" data-board-asset="board-5x5-1f137e80750d7288.svg"><img class="source-chessboard" src="/assets/boards/board-5x5-1f137e80750d7288.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
      <figcaption>Tablero de ajedrez con los movimientos de la segunda fase</figcaption>
    </figure>
    <figure class="subfigure" id="fig-matriz-con-los-movimientos-de-la-segunda-fase" data-width="0.45\textwidth" style="--subfigure-width:45%">
      <div class="figure-equation" data-math="\begin{bmatrix}
                    3 &amp; 0 &amp; 13 &amp; 0 &amp; 5 \\
                    12 &amp; 0 &amp; 4 &amp; 0 &amp; 14 \\
                    0 &amp; 2 &amp; 0 &amp; 6 &amp; 9 \\
                    0 &amp; 11 &amp; 8 &amp; 15 &amp; 0 \\
                    1 &amp; 16 &amp; 0 &amp; 10 &amp; 7 \\
                \end{bmatrix}" aria-label="bmatrix 3 &amp; 0 &amp; 13 &amp; 0 &amp; 5 \\ 12 &amp; 0 &amp; 4 &amp; 0 &amp; 14 \\ 0 &amp; 2 &amp; 0 &amp; 6 &amp; 9 \\ 0 &amp; 11 &amp; 8 &amp; 15 &amp; 0 \\ 1 &amp; 16 &amp; 0 &amp; 10 &amp; 7 \\ bmatrix"></div>
      <figcaption>Matriz con los movimientos de la segunda fase</figcaption>
    </figure>
  </div>
  <figcaption>Segunda fase del tour del caballo usando vuelta atrás</figcaption>
</figure>

En la última vuelta, el tablero se completaría y se obtendría el siguiente tablero y estado final:

<figure id="fig-tercera-fase-del-tour-del-caballo-usando-vuelta-atras">
  <div class="subfigure-grid" role="group" aria-label="Tercera fase del tour del caballo usando vuelta atrás">
    <figure class="subfigure" id="fig-tablero-de-ajedrez-con-los-movimientos-de-la-tercera-fase" data-width="0.45\textwidth" style="--subfigure-width:45%">
      <div class="chessboard" data-fen="start" data-size="5" data-pieces="nc3" data-arrows="a1-b3, b3-a5, a5-c4, c4-e5, e5-d3, d3-e1, e1-c2, c2-e3, e3-d1, d1-b2, b2-a4, a4-c5, c5-e4, e4-d2, d2-b1, b1-a3, a3-b5, b5-d4, d4-e2, e2-c1, c1-a2, a2-b4, b4-d5, d5-c3" data-chess-options="&quot;maxfield=e5, showmover=false, setpieces={nc3}, pgfstyle=straightmove, markmoves={a1-b3, b3-a5, a5-c4, c4-e5, e5-d3, d3-e1, e1-c2, c2-e3, e3-d1, d1-b2, b2-a4, a4-c5, c5-e4, e4-d2, d2-b1, b1-a3, a3-b5, b5-d4, d4-e2, e2-c1, c1-a2, a2-b4, b4-d5, d5-c3}, arrow=to, normalboard&quot;" role="img" aria-label="Tablero de ajedrez con los movimientos de la tercera fase" data-rendered="source" data-board-asset="board-5x5-0c192892af64ded2.svg"><img class="source-chessboard" src="/assets/boards/board-5x5-0c192892af64ded2.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
      <figcaption>Tablero de ajedrez con los movimientos de la tercera fase</figcaption>
    </figure>
    <figure class="subfigure" id="fig-matriz-con-los-movimientos-de-la-tercera-fase" data-width="0.45\textwidth" style="--subfigure-width:45%">
      <div class="figure-equation" data-math="\begin{bmatrix}
                    3 &amp; 18 &amp; 13 &amp; 24 &amp; 5 \\
                    12 &amp; 23 &amp; 4 &amp; 19 &amp; 14 \\
                    17 &amp; 2 &amp; 25 &amp; 6 &amp; 9 \\
                    22 &amp; 11 &amp; 8 &amp; 15 &amp; 20 \\
                    1 &amp; 16 &amp; 21 &amp; 10 &amp; 7 \\
                \end{bmatrix}" aria-label="bmatrix 3 &amp; 18 &amp; 13 &amp; 24 &amp; 5 \\ 12 &amp; 23 &amp; 4 &amp; 19 &amp; 14 \\ 17 &amp; 2 &amp; 25 &amp; 6 &amp; 9 \\ 22 &amp; 11 &amp; 8 &amp; 15 &amp; 20 \\ 1 &amp; 16 &amp; 21 &amp; 10 &amp; 7 \\ bmatrix"></div>
      <figcaption>Matriz con los movimientos de la tercera fase</figcaption>
    </figure>
  </div>
  <figcaption>Tercera fase del tour del caballo usando vuelta atrás</figcaption>
</figure>

Como resultado interesante, se observa que la última casilla visitada es justamente la central, que en el tablero de 5x5 es la única casilla con grado 8 al inicio del problema. Esto demuestra que el caballo, siguiendo la heurística utilizada, logra alcanzar y visitar todas las casillas del tablero, finalizando en la única casilla con grado 8 al comienzo.

Para terminar, a continuación se presenta el diagrama de flujo que indica el funcionamiento del algoritmo usado para resolver el tour del caballo.

<figure id="fig-diagrama-de-flujo-de-backtracking-aplicado-al-tour-del-caballo">
  <div class="localized-diagram flow-diagram mermaid-flowchart" data-diagram="flowchart" data-node-count="8" data-mermaid="flowchart TD
  node_start([&quot;Comienzo&quot;]):::terminal
  node_in[/&quot;Entrada&quot;/]:::io
  node_branch1{&quot;¿Todas las casillas recorridas?&quot;}:::decision
  node_branch2{&quot;¿Se puede mover el caballo a una casilla?&quot;}:::decision
  node_out[/&quot;Solución&quot;/]:::io
  node_end([&quot;Fin&quot;]):::terminal
  node_process1[&quot;Retroceder última bifurcación&quot;]:::process
  node_process2[&quot;Mover caballo&quot;]:::process
  node_start --&gt; node_in
  node_in --&gt; node_branch1
  node_branch1 --&gt;|no| node_branch2
  node_branch1 --&gt;|sí| node_out
  node_out --&gt; node_end
  node_branch2 --&gt;|no| node_process1
  node_branch2 --&gt;|sí| node_process2
  node_process1 --&gt; node_in
  node_process2 --&gt; node_in
  classDef terminal fill:#46765f,color:#fff,stroke:#2f5d48,stroke-width:2px
  classDef io fill:#e8eee9,color:#171a17,stroke:#46765f,stroke-width:1.5px
  classDef decision fill:#f1eee2,color:#171a17,stroke:#46765f,stroke-width:2px
  classDef process fill:#f7f7f1,color:#171a17,stroke:#6f786f,stroke-width:1.5px" role="img" aria-label="Diagrama de flujo de Backtracking aplicado al tour del caballo">Comienzo → Entrada → ¿Todas las casillas recorridas? → ¿Se puede mover el caballo a una casilla? → Solución → Fin → Retroceder última bifurcación → Mover caballo</div>
  <figcaption>Diagrama de flujo de <em>Backtracking</em> aplicado al tour del caballo</figcaption>
</figure>

A continuación, se describen detalladamente cada uno de los pasos del algoritmo representados en el diagrama de flujo.

1. Comienzo: Se inicia el algoritmo.
2. Entrada: Se introduce el problema con la casilla inicial del caballo y el tamaño del tablero. A medida que avance el problema incluirá las casillas ya recorridas y la posición actual del caballo.
3. ¿Todas las casillas recorridas?: Se verifica si se han recorrido todas las casillas con el caballo. Si es así se termina y en caso contrario se continua con el algoritmo en la siguiente fase.
4. ¿Se puede mover el caballo a una casilla?: Se intenta colocar el caballo en una de las casillas a su alcance en un único movimiento. Esas casillas además no deben haberse visitado. En el caso de que haya más de una se ordenan siguiendo la regla de Warnsdorff de menor a mayor.
5. Retroceder última bifurcación: El algoritmo vuelve a la última bifurcación, eliminando el último movimiento del caballo junto a la indicación de que esa casilla ha sido visitada.
6. Mover caballo: Se mueve el caballo a la casilla seleccionada. La casilla en la que estaba anteriormente el caballo se marca como visitada.
7. Solución: Una matriz del mismo tamaño que el tablero usado que indica en qué movimiento ha visitado el caballo esa salida.
8. Fin: El algoritmo concluye su ejecución.

Se puede ver que es muy parecido al algoritmo de las $n$-damas. Y es natural al usar los dos *backtracking*. Las únicas diferencias reseñables son la representación (por algo es la parte más importante del algoritmo) y el uso de la regla de Warnsdorff. La regla simplemente cambia el orden en el que se visitan las casillas priorizando aquellas que tengan menos movimientos disponibles.

### Complejidad algorítmica del tour del caballo

En el estudio de la complejidad algorítmica, resulta habitual tomar en consideración el caso peor, aquel en que todas las circunstancias posibles que pueden ser adversas efectivamente ocurren. Una estrategia simplificada para calcular este escenario peor podría consistir en suponer que el caballo siempre podrá mover al máximo número de casillas.

Por ejemplo, partiendo de una casilla en un tablero de ajedrez, es posible realizar hasta 8 movimientos distintos, es decir, cada vértice en este contexto tiene un máximo de 8 aristas. Esto implica que para cada casilla transitada, existen 8 posibles elecciones. Dado que el tablero es de dimensiones n x m, esta decisión se tomaría n*m veces, proporcionando la siguiente fórmula para la complejidad en el peor caso:

$$
\delta(n, m) = 8^{nm}
$$

Donde $n$ denota el número de filas y $m$ el número de columnas. Aunque este cálculo muestra un crecimiento exponencial, afortunadamente este límite superior está bastante alejado de la verdadera complejidad del problema en cuestión.

En la mayoría de los casos, el número de elecciones será menor a 8, dado que puede suceder que la casilla en estudio tenga menos de 8 aristas, o que alguna de estas aristas conduzca a una casilla previamente visitada, la cual no necesitará ser considerada nuevamente. Aplicando la heurística de Warnsdorff, el recorrido del tablero se realiza desde el exterior hacia el interior, lo que implica que, al llegar a las casillas centrales, ya se habrá visitado las casillas periféricas a estas, evitando así considerar numerosas trayectorias.

Con estas consideraciones, el problema puede resolverse en un tiempo razonable mediante un ordenador, incluso cuando $n$ y $m$ son superiores a 100. En el caso de que el tour del caballo busque encontrar un ciclo hamiltoniano, es decir, un recorrido que desde la última casilla permita regresar a la inicial en un solo movimiento, esta heurística no reduciría la complejidad de manera tan significativa, ya que no orienta la búsqueda hacia la última casilla apropiada.

Comparando la complejidad del problema general del camino/ciclo hamiltoniano y el problema del viajero, se puede observar una notable diferencia respecto al tour del caballo, dado que cada vértice en estos problemas podría tener un número indeterminado de aristas, desde una sola hasta una arista dirigida a cada uno de los otros vértices.

Nuevamente, para el cálculo de la complejidad es necesario considerar el peor caso, en el que todos los vértices están conectados con todos los demás. Si consideramos un grafo con $n$ vértices, donde existe una arista entre todos los vértices, en el primer vértice tendríamos que elegir entre $n - 1$ aristas, ya que solo se ha visitado este primer vértice. En el segundo vértice, tendríamos $n - 2$ opciones de aristas, ya que el primer vértice y el actual ya han sido visitados. Continuando con este procedimiento, se puede apreciar su similitud con la función factorial, lo que nos lleva a la siguiente fórmula:

$$
\gamma(n) = (n-1)! = (n -1)*(n-2)* ... * 2 * 1
$$

En la búsqueda del camino/ciclo hamiltoniano, no se alcanzaría esta complejidad en un escenario donde todos los vértices están interconectados, ya que habría un camino/ciclo hamiltoniano posible seleccionando las aristas de manera aleatoria. Sin embargo, esta complejidad se presenta con frecuencia en el problema del viajero, debido a la posibilidad común de que todos los vértices estén conectados. En este caso, sería necesario explorar todas las rutas posibles para determinar cuál de ellas tiene un coste menor <span class="footnote" role="note">Afortunadamente, es posible reducir esta complejidad utilizando el paradigma de la programación dinámica, que posee una complejidad de $O(2^n*n^2)$. Este tópico será tratado en el próximo capítulo. <cite><a href="/es/references#cite-3stevenhalimfelixhalim2013" data-cite="3stevenhalimfelixhalim2013">[Steven Halim, 2013]</a></cite></span>.

Con respecto a la heurística utilizada en el tour del caballo, no resultaría muy útil en el caso general, ya que su aporte a la identificación de las rutas más prometedoras no es suficiente para compensar el coste computacional asociado a su aplicación.
