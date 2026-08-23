---
title: "Notación en ajedrez"
description: "En el presente apéndice, profundizaremos en la notación algebraica de ajedrez, la cual es la más utilizada en la actualidad."
chapter: "Notación en ajedrez"
part: "appendix"
order: 25
bookChapter: "C"
bookChapterTitle: "Notación en ajedrez"
sectionNumber: "C"
sectionTitle: "Notación en ajedrez"
navDepth: 1
pairedSlug: "appendix3"
source: "es/appendix3.tex"
draft: false
---

En el presente apéndice, profundizaremos en la notación algebraica de ajedrez, la cual es la más utilizada en la actualidad. Optaremos por su versión abreviada, donde sólo se especifica la casilla de destino de la pieza, a diferencia de la versión extendida que incluye también la casilla de origen. La lógica de esta notación es muy directa: cada movimiento se registra indicando el tipo de pieza, seguido de la designación de la columna (mediante una letra minúscula) y un número para especificar la fila donde se va a colocar esta nueva pieza. En ocasiones, no se requiere la letra que indica el tipo de pieza, ya que, en el caso de los peones, esta se omite, lo que implica que si no se especifica el tipo de pieza, se asume que es un peón.

No obstante, esta notación puede presentar ciertas complicaciones. Por ejemplo, puede ocurrir que dos piezas del mismo tipo puedan moverse a la misma casilla, y con la información proporcionada originalmente por esta notación, no sería posible discernir cuál de estas piezas es la que se mueve. Para resolver este problema, se incluye, entre la letra que indica el tipo de pieza y la letra de la columna, la fila o columna original (en casos muy excepcionales puede ser necesario especificar ambas, la columna y la fila, para evitar cualquier ambigüedad), a fin de indicar cuál pieza específica se está moviendo.

Las columnas se designan con letras de la 'a' a la 'h' de izquierda a derecha, mientras que las filas se numeran del 1 al 8 de abajo hacia arriba.

La representación de cada pieza a través de una letra varía dependiendo del idioma. En este texto, se utilizará las designaciones en español. Al ser las designaciones inglesas las más utilizadas se muestran también sus equivalentes. A continuación, se presenta una tabla con las designaciones para cada tipo de pieza en ambos idiomas.

| Pieza | Letras en español | Letras en inglés |
| --- | --- | --- |
| Rey | R | K |
| Dama | D | Q |
| Torre | T | R |
| Alfil | A | B |
| Caballo | C | N |

*Designaciones en español e inglés para cada tipo de pieza de ajedrez*

El patrón que sigue en español es realmente simple, solo se toma la primera letra del nombre de la pieza. En inglés, se sigue un patrón similar, utilizando los correspondientes nombres en inglés (*King*, *Queen*, *Rook*, *Bishop* y *Knight*, en el orden que aparecen en la tabla). Sin embargo, se observa que *King* y *Knight* comienzan con la misma letra, por lo que para el caballo se usa la segunda letra.

Finalmente, cabe destacar que cuando se realiza una captura de pieza, se añade la "x" para indicarlo, así como se añade "#" para indicar el jaque mate. Sin embargo, estos símbolos, aunque útiles para identificar rápidamente estas situaciones en la partida, no aportan información adicional al movimiento en sí, ya que estas circunstancias pueden deducirse a partir de la posición original y del movimiento realizado. Por esta razón, a veces se opta por omitir estos indicadores.

## Ejemplos

Habiendo introducido los principios teóricos, es esencial ilustrar con ejemplos para lograr una comprensión más clara de la notación algebraica.

<figure id="fig-posicion-inicial-del-ajedrez">
  <div class="chessboard" data-fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" data-size="8" data-chess-options="&quot;setfen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1, largeboard&quot;" role="img" aria-label="Posición inicial de un juego de ajedrez" data-rendered="source" data-board-asset="board-8x8-41f3370b0b4360a0.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-41f3370b0b4360a0.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Posición inicial de un juego de ajedrez</figcaption>
</figure>

Observando la Figura [referencia](#fig-posicion-inicial-del-ajedrez), se puede apreciar la disposición de las filas y las columnas en el tablero, tal como se describió en la introducción. Las piezas blancas realizan un movimiento, resultando en la posición mostrada en la Figura [referencia](#fig-posicion-despues-de-cf3).

<figure id="fig-posicion-despues-de-cf3">
  <div class="chessboard" data-fen="rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 1 1" data-size="8" data-chess-options="&quot;setfen=rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 1 1, largeboard&quot;" role="img" aria-label="Posición después de Cf3" data-rendered="source" data-board-asset="board-8x8-3a516bc445886674.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-3a516bc445886674.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Posición después de Cf3</figcaption>
</figure>

Este movimiento se representa como Cf3 en notación algebraica, dado que se mueve el caballo desde la casilla g1 a la casilla f3. Dado que no hay otro caballo que pueda moverse a la casilla f3, no es necesario proporcionar información adicional.

A partir de esta posición, las piezas negras realizan la jugada Cf6, llevándonos a la posición mostrada en la Figura [referencia](#fig-posicion-despues-de-cf6).

<figure id="fig-posicion-despues-de-cf6">
  <div class="chessboard" data-fen="rnbqkb1r/pppppppp/5n2/8/8/5N2/PPPPPPPP/RNBQKB1R w KQkq - 2 2" data-size="8" data-chess-options="&quot;setfen=rnbqkb1r/pppppppp/5n2/8/8/5N2/PPPPPPPP/RNBQKB1R w KQkq - 2 2, largeboard&quot;" role="img" aria-label="Posición después de Cf6" data-rendered="source" data-board-asset="board-8x8-ad88b41e7bdebc78.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-ad88b41e7bdebc78.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Posición después de Cf6</figcaption>
</figure>

Las piezas blancas continúan con d4 y las piezas negras responden con d5, resultando en la siguiente posición:

<figure id="fig-posicion-despues-de-d4-y-d5">
  <div class="chessboard" data-fen="rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 1 3" data-size="8" data-chess-options="&quot;setfen=rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 1 3, largeboard&quot;" role="img" aria-label="Posición después de d4 y d5" data-rendered="source" data-board-asset="board-8x8-e7f9acb3f48c37fc.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-e7f9acb3f48c37fc.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Posición después de d4 y d5</figcaption>
</figure>

Aquí surge un pequeño problema: en la posición anterior, las piezas blancas desean mover el caballo de b1 a d2, pero el caballo blanco de f3 también puede moverse a esa casilla. Por lo tanto, es necesario añadir la columna o la fila, por lo que la jugada podría representarse como Cbd2 o C1d2. Ambas opciones son válidas, aunque Cbd2 es la elección más común.

<figure id="fig-posicion-despues-de-cbd2">
  <div class="chessboard" data-fen="rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPPNPPPP/R1BQKB1R b KQkq - 1 3" data-size="8" data-chess-options="&quot;setfen=rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPPNPPPP/R1BQKB1R b KQkq - 1 3, largeboard&quot;" role="img" aria-label="Posición después de Cbd2" data-rendered="source" data-board-asset="board-8x8-31a09bdf00814e81.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-31a09bdf00814e81.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Posición después de Cbd2</figcaption>
</figure>

Además de las jugadas comúnmente vistas, existen algunas jugadas especiales que merecen ser mencionadas brevemente. La primera de ellas es la denominada promoción, que ocurre cuando un peón alcanza la última fila opuesta y se le ofrece la oportunidad de transformarse en otra pieza. Las opciones de transformación incluyen alfil, caballo, torre o dama. Dado que la dama es la pieza más poderosa, es habitual que el peón se transforme en esta pieza, pero dependiendo de las circunstancias, podría transformarse en otro tipo de pieza. Para señalar esta jugada, se añade una letra minúscula al final de la jugada original, indicando en qué pieza se ha transformado.

Finalmente, queda la jugada especial conocida como enroque, que permite mover simultáneamente al rey y a una torre. Existen dos tipos de enroque: el enroque corto, donde el rey se traslada a la columna g y la torre a la columna f (utilizando la torre más cercana al rey), y se marca en la notación con "0-0". El enroque largo, por otro lado, implica usar la torre más alejada del rey, y el rey se traslada a la columna c y la torre a la columna d. Se marca con "0-0-0". Para efectuar el enroque, ni el rey ni la torre con la que se realiza deben haberse movido previamente. A continuación se muestra un ejemplo de cómo se realiza el enroque en la Figura [referencia](#fig-ejemplo-de-como-efectuar-el-enroque). Como dato curioso, esta posición pertenece a la apertura española, también conocida como la apertura Ruy López. Ruy López es considerado el primer campeón mundial de ajedrez y es oriundo de Extremadura, España.

<figure id="fig-ejemplo-de-como-efectuar-el-enroque">
  <div class="chessboard" data-fen="r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 3 4" data-size="8" data-chess-options="&quot;setfen=r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 3 4&quot;" role="img" aria-label="Ejemplo de cómo efectuar el enroque" data-rendered="source" data-board-asset="board-8x8-51279ab4b7f4a547.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-51279ab4b7f4a547.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <div class="chessboard" data-fen="r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 4 4" data-size="8" data-chess-options="&quot;setfen=r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 4 4&quot;" role="img" aria-label="Ejemplo de cómo efectuar el enroque" data-rendered="source" data-board-asset="board-8x8-e824dae33bcd1b4e.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-e824dae33bcd1b4e.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Ejemplo de cómo efectuar el enroque</figcaption>
</figure>

En el ejemplo anterior, las piezas blancas han realizado el enroque corto, lo que se denotaría con la jugada "0-0". El enroque es una jugada muy común, ya que permite poner al rey a salvo y al mismo tiempo permite que la torre con la que se realiza el enroque entre en juego rápidamente.

Además, en partidas grabadas o transmitidas, a menudo se registra cada jugada junto con el número de jugada, por lo que una secuencia de movimientos podría verse así:

1. e4 e5
2. Nf3 Nc6
3. Bb5 a6
4. Ba4 Nf6
5. O-O Be7

Esto representa cinco movimientos (o diez jugadas) de la apertura española o apertura Ruy López. Como puedes ver, los movimientos de las piezas blancas y negras se registran juntos, con el movimiento de las piezas blancas primero.
