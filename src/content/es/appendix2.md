---
title: "Ajedrez"
description: "\" Sin embargo, esta definición simplista no logra abarcar la complejidad que encierra el ajedrez. El ajedrez puede ser considerado como un deporte, una ciencia y un arte, todo al mismo tiempo."
chapter: "Ajedrez"
part: "appendix"
order: 24
bookChapter: "B"
bookChapterTitle: "Ajedrez"
sectionNumber: "B"
sectionTitle: "Ajedrez"
navDepth: 1
pairedSlug: "appendix2"
source: "es/appendix2.tex"
draft: false
---

La Real Academia Española (RAE) define al ajedrez de la siguiente manera:

> "Juego de mesa entre dos personas que se practica sobre un damero en el que se disponen las 16 piezas de cada jugador, desiguales en importancia y valor, que se desplazan y comen las del contrario según ciertas reglas."

Sin embargo, esta definición simplista no logra abarcar la complejidad que encierra el ajedrez. El ajedrez puede ser considerado como un deporte, una ciencia y un arte, todo al mismo tiempo. Se considera un deporte debido al considerable esfuerzo físico y mental que requiere. De hecho, jugar una partida de ajedrez durante cuatro horas (o incluso más) puede resultar más agotador que practicar muchos otros deportes. Además, el ajedrez se enmarca en la ciencia gracias a la aplicación del método científico en su estudio, lo cual ha permitido un amplio desarrollo y una fructífera relación con la computación. Por último, el ajedrez también puede ser considerado un arte, ya que brinda a los ajedrecistas un gozo estético a través de patrones, posiciones y jugadas excepcionales.

Históricamente, el ajedrez ha gozado de cierta popularidad en círculos intelectuales, lo que ha contribuido a su reputación de erudición. Sin embargo, en la actualidad, ha logrado llegar a un público mucho más amplio gracias a la promoción de modalidades rápidas como *eSport* y a la gran popularidad de la serie *Gambito de Dama*. Estos factores han ampliado enormemente su base de seguidores y entusiastas.

Dicho esto, es importante establecer las reglas de este fascinante y aparentemente inagotable juego.

## Reglas básicas

El ajedrez, al igual que cualquier otro juego, tiene un conjunto de reglas y un objetivo específico que los jugadores deben alcanzar. El objetivo es común para ambos contrincantes y consiste en lograr dar jaque mate al rey rival. El jaque mate se produce cuando el rey de un jugador se encuentra amenazado por una de las piezas del oponente de tal manera que no puede escapar de esta amenaza ni moverse a una casilla no amenazada. A partir de este objetivo, se pueden definir tres posibles resultados en una partida: las negras ganan si logran dar jaque mate al rey blanco, las blancas ganan si sus piezas logran dar jaque mate al rey contrario, y finalmente, se produce un empate o tablas si no es posible dar jaque mate o se cumplen algunas de las siguientes condiciones:

- Ambas partes acuerdan un empate.
- Se produce un ahogado donde uno de los bandos no puede realizar ningún movimiento.
- Se han realizado 50 jugadas sin capturar ninguna pieza ni mover ningún peón.
- Se repite la misma posición en el tablero tres veces.

El juego se desarrolla en turnos alternando entre los jugadores, comenzando con las blancas. En cada turno, un jugador puede mover una de sus piezas, lo que puede resultar en la captura de una pieza del oponente. Dependiendo de la pieza, se disponen de diferentes movimientos posibles. La verdadera complejidad del ajedrez radica en lograr una coordinación adecuada entre las piezas, teniendo en cuenta los movimientos específicos de cada una de ellas.

## Piezas

### Rey

La pieza más importante en el ajedrez es el rey, ya que si este recibe jaque mate (es decir, está amenazado por una pieza enemiga y no puede realizar ninguna jugada legal para escapar de la amenaza), se pierde automáticamente la partida. Por lo general, al principio y a mitad de la partida, se debe mantener al rey en una posición segura. Sin embargo, el rey suele desempeñar un papel muy relevante en el final del juego.

En el tablero, al comienzo de la partida, el rey se encuentra ubicado en el centro de la primera fila desde la perspectiva de cada jugador.

<figure id="fig-movimientos-del-rey">
  <div class="chessboard" data-fen="start" data-size="8" data-pieces="Ke5" data-arrows="e5-e4, e5-f4, e5-f5, e5-f6, e5-e6, e5-d6, e5-d5, e5-d4" data-chess-options="&quot;maxfield=h8, showmover=false, pgfstyle=straightmove, markmoves={e5-e4, e5-f4, e5-f5, e5-f6, e5-e6, e5-d6, e5-d5, e5-d4}, arrow=to, setpieces={Ke5}, largeboard&quot;" role="img" aria-label="Posibles movimientos del rey" data-rendered="source" data-board-asset="board-8x8-2d7b39260913fae6.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-2d7b39260913fae6.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Posibles movimientos del rey</figcaption>
</figure>

Como se puede observar en el tablero, el rey puede moverse a todas las casillas adyacentes, ya sea en dirección horizontal, vertical o diagonal, pero solo puede moverse un paso a la vez. Además, el rey cuenta con un movimiento especial llamado enroque, que permite mover al rey y a una torre simultáneamente en la misma jugada, proporcionando al rey una ubicación más segura. En el Anexo 3, se muestra un ejemplo de cómo se efectúa este movimiento especial en el [ejemplo de enroque](/es/appendix3#fig-ejemplo-de-como-efectuar-el-enroque).

### Dama

Después del rey, la dama es considerada la pieza más importante en el ajedrez, ya que sus movimientos combinan los de una torre y un alfil. Esta versatilidad de movimientos le otorga un gran poder en el tablero. Al inicio de la partida, la dama se encuentra ubicada en la casilla inmediata a la derecha del rey desde la perspectiva de cada jugador.

<figure id="fig-movimientos-de-la-dama">
  <div class="chessboard" data-fen="start" data-size="8" data-pieces="Qe5" data-arrows="e5-e1, e5-h2, e5-h5, e5-h8, e5-e8, e5-b8, e5-a5, e5-a1" data-chess-options="&quot;maxfield=h8, showmover=false, pgfstyle=straightmove, markmoves={e5-e1, e5-h2, e5-h5, e5-h8, e5-e8, e5-b8, e5-a5, e5-a1}, arrow=to, setpieces={Qe5}, largeboard&quot;" role="img" aria-label="Posibles movimientos de la dama" data-rendered="source" data-board-asset="board-8x8-5bf2bdabc734059f.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-5bf2bdabc734059f.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Posibles movimientos de la dama</figcaption>
</figure>

La dama puede moverse a cualquier casilla a lo largo de la fila, columna o diagonal en la que se encuentre. Como se puede apreciar en el [diagrama de movimientos de la dama](#fig-movimientos-de-la-dama), la dama puede moverse en todas las direcciones a cualquier distancia, siempre y cuando no haya ninguna pieza bloqueando su camino. La pérdida prematura de la dama puede llevar a una derrota casi inevitable, debido a su capacidad de controlar grandes áreas del tablero y participar en numerosas combinaciones y ataques.

### Torre

Cada jugador dispone de dos torres, situadas en las esquinas de su correspondiente lado del tablero. Las torres tienen la capacidad de desplazarse a cualquier casilla a lo largo de la fila y columna en la que estén ubicadas.

<figure id="fig-movimientos-de-la-torre">
  <div class="chessboard" data-fen="start" data-size="8" data-pieces="Re5" data-arrows="e5-e1, e5-h5, e5-e8, e5-a5" data-chess-options="&quot;maxfield=h8, showmover=false, pgfstyle=straightmove, markmoves={e5-e1, e5-h5, e5-e8, e5-a5}, arrow=to, setpieces={Re5}, largeboard&quot;" role="img" aria-label="Posibles movimientos de la torre" data-rendered="source" data-board-asset="board-8x8-9101466456044c62.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-9101466456044c62.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Posibles movimientos de la torre</figcaption>
</figure>

Como se puede apreciar en el [diagrama de movimientos de la torre](#fig-movimientos-de-la-torre), las torres pueden moverse a lo largo de las filas y columnas en todas las direcciones. Pueden desplazarse desde un extremo del tablero hasta el otro, lo que les confiere una gran capacidad estratégica y táctica, especialmente en la mitad y el final de la partida. Las torres son piezas valiosas en el ajedrez, ya que pueden controlar columnas y filas enteras, participar en ataques combinados y proteger al rey en posiciones defensivas. Su movilidad y versatilidad las convierten en piezas clave para la planificación de estrategias y la consecución de objetivos en el juego.

### Alfil

Cada jugador dispone de dos alfiles, uno situado a la izquierda de la dama y otro a la derecha del rey.

<figure id="fig-movimientos-del-alfil">
  <div class="chessboard" data-fen="start" data-size="8" data-pieces="Be5" data-arrows="e5-h2, e5-h8, e5-b8, e5-a1" data-chess-options="&quot;maxfield=h8, showmover=false, pgfstyle=straightmove, markmoves={e5-h2, e5-h8, e5-b8, e5-a1}, arrow=to, setpieces={Be5}, largeboard&quot;" role="img" aria-label="Posibles movimientos del alfil" data-rendered="source" data-board-asset="board-8x8-fd8bb66542ea6dcc.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-fd8bb66542ea6dcc.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Posibles movimientos del alfil</figcaption>
</figure>

Al igual que las torres, los alfiles son piezas valiosas en el ajedrez debido a su capacidad de movimiento único a lo largo de las diagonales. Como se muestra en el [diagrama de movimientos del alfil](#fig-movimientos-del-alfil), los alfiles pueden desplazarse en diagonal por todo el tablero. Pueden moverse desde un extremo hasta el otro en un solo movimiento, aprovechando su movimiento característico. Esta capacidad de movimiento diagonal les confiere una gran utilidad estratégica y táctica, ya que pueden controlar casillas de diferentes colores y participar en ataques combinados. Los alfiles son piezas clave en la apertura y el medio juego, donde su movilidad puede influir en el desarrollo de la partida y la ocupación de posiciones estratégicas.

### Caballo

El caballo es una de las piezas más singulares en el ajedrez, ya que tiene un movimiento en forma de L y difiere del movimiento de las demás piezas. Además, a diferencia de las otras piezas, el caballo tiene la capacidad de saltar sobre otras piezas en su trayectoria.

<figure id="fig-movimientos-del-caballo">
  <div class="chessboard" data-fen="start" data-size="8" data-pieces="Ne5" data-arrows="e5-f3, e5-g4, e5-g6, e5-f7, e5-d7, e5-c6, e5-c4, e5-d3" data-chess-options="&quot;maxfield=h8, showmover=false, pgfstyle=straightmove, markmoves={e5-f3, e5-g4, e5-g6, e5-f7, e5-d7, e5-c6, e5-c4, e5-d3}, arrow=to, setpieces={Ne5}, largeboard&quot;" role="img" aria-label="Posibles movimientos del caballo" data-rendered="source" data-board-asset="board-8x8-3f208c17a096ef19.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-3f208c17a096ef19.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Posibles movimientos del caballo</figcaption>
</figure>

Como se muestra en el [diagrama de movimientos del caballo](#fig-movimientos-del-caballo), el caballo puede moverse en un movimiento en L, avanzando dos casillas en una dirección (horizontal o vertical) y luego girando en ángulo recto para avanzar una casilla adicional en una dirección perpendicular. Esta peculiaridad de movimiento permite al caballo saltar sobre otras piezas en su trayectoria, lo que lo convierte en una pieza impredecible y estratégicamente interesante en el juego. Cada jugador cuenta con un par de caballos, que se sitúan entre las torres y los alfiles en la configuración inicial del tablero. Los caballos son conocidos por su capacidad de maniobrar rápidamente por el tablero y pueden desempeñar un papel importante en la creación de amenazas, la defensa y la realización de combinaciones tácticas.

### Peón

A pesar de ser la pieza de menor valor, el peón tiene un movimiento bastante peculiar en el ajedrez. En su primer movimiento, tiene la opción de avanzar dos casillas en lugar de una, lo cual le confiere cierta flexibilidad táctica.

<figure id="fig-movimientos-del-peon">
  <div class="chessboard" data-fen="start" data-size="8" data-pieces="Pb2, pa3, pc3, Pf4, pg4" data-arrows="b2-b4, b2-a3, b2-c3, f2-f4, g4-f3, g4-g3" data-chess-options="&quot;maxfield=h8, showmover=false, pgfstyle=straightmove, markmoves={b2-b4, b2-a3, b2-c3, f2-f4, g4-f3, g4-g3}, arrow=to, setpieces={Pb2, pa3, pc3, Pf4, pg4}, largeboard&quot;" role="img" aria-label="Posibles movimientos del peón" data-rendered="source" data-board-asset="board-8x8-248e9f0032ca1e69.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-248e9f0032ca1e69.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Posibles movimientos del peón</figcaption>
</figure>

El peón tiene una particularidad en su movimiento y captura. En cuanto a su movimiento regular, el peón puede avanzar una casilla hacia adelante en su columna, como se muestra en el [diagrama de movimientos del peón](#fig-movimientos-del-peon). Además, cuando se encuentra en una posición de captura, el peón solo puede capturar una pieza en las dos casillas diagonales hacia el otro lado del tablero desde donde se encuentra.

El peón también tiene una jugada especial llamada "captura al paso". Esta jugada se aplica cuando un peón enemigo avanza dos casillas desde su posición inicial y se encuentra en una posición adyacente al peón rival. En ese caso, el peón puede capturar al peón enemigo como si este solo hubiera avanzado una casilla.

Cabe destacar que el peón no puede retroceder en su movimiento. Sin embargo, cuando un peón alcanza el extremo opuesto del tablero, se produce la coronación. En este momento, el peón puede transformarse en cualquier otra pieza, a excepción del rey, lo que brinda al jugador la oportunidad de mejorar su posición estratégica en el juego.
