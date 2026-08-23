---
title: "Estándares"
description: "En este pequeño capítulo abordaremos algunos de los estándares fundamentales implementados en los programas informáticos de ajedrez."
chapter: "Estándares"
part: "book"
order: 22
bookChapter: "5"
bookChapterTitle: "Estándares"
sectionNumber: "5.0"
sectionTitle: "Estándares"
navDepth: 1
pairedSlug: "standards"
source: "es/standards.tex"
draft: false
---

En este pequeño capítulo abordaremos algunos de los estándares fundamentales implementados en los programas informáticos de ajedrez. Pero antes, debemos preguntarnos: ¿qué es un estándar?

Un estándar es una especificación técnica, o un conjunto de directrices y reglas diseñadas para garantizar la interoperabilidad y la compatibilidad entre diferentes sistemas, dispositivos o aplicaciones. En el contexto específico de la informática, los estándares aseguran que los programas desarrollados por diversas organizaciones y personas puedan ser compatibles en numerosos aspectos, potenciando así sus funcionalidades y permitiendo una interacción fluida entre ellos.

Los estándares que rigen el ajedrez informático son múltiples y variados. En este libro, sin embargo, nos centraremos en tres de los más trascendentales.

El primero de ellos es FEN (Forsyth-Edwards Notation), un estándar utilizado para representar posiciones de ajedrez. El nombre de este estándar proviene de sus creadores, David Forsyth, quien fue el primero en desarrollar este sistema, y Steven Edwards, quien lideró la especificación tanto del estándar FEN como del PGN (Portable Game Notation), que es el segundo estándar que analizaremos.

PGN es empleado para describir de forma precisa una partida de ajedrez completa, desde su inicio hasta su conclusión. Dado que en algunas ocasiones la posición inicial de una partida no comienza con la posición inicial habitual, es necesario especificar esta posición utilizando FEN, de modo que estos dos estándares se complementan y trabajan conjuntamente.

Finalmente, exploraremos el último estándar, conocido como UCI (Universal Chess Interface). Este cumple una doble función: por un lado, especifica cómo deben representarse los movimientos en ajedrez para que puedan ser interpretados sin dificultades por los módulos de ajedrez; por otro lado, regula la comunicación entre las interfaces gráficas de los programas de ajedrez y el módulo respectivo, que es el programa encargado de determinar las jugadas. La conjunción de estas especificaciones contribuye a una experiencia de ajedrez digital más fluida y efectiva. Esto se materializa en que podamos usar cualquier módulo en cualquier interfaz.

## FEN

La Notación de Forsyth-Edwards (FEN, por sus siglas en inglés) establece un estándar universal que puede ser interpretado por humanos y ordenadores de manera sencilla y eficiente. Este estándar se utiliza para representar posiciones de ajedrez, siendo su principal finalidad contener toda la información relevante de una posición para que se pueda reproducir con exactitud y sin obstáculos. Se emplea el formato de texto plano<span class="footnote" role="note">En el campo de la informática, los archivos se pueden categorizar en dos tipos: texto plano y binario. Mientras que el texto plano es legible tanto para humanos como para ordenadores, el binario es interpretable solo por máquinas. A pesar de que los archivos binarios consumen menos memoria que su equivalente en texto plano, este último se prefiere por su simplicidad y universalidad.</span> en la notación FEN, lo que facilita su interpretación por humanos y su procesamiento por ordenadores.

La notación FEN se divide en seis campos, cada uno separado por espacios. A continuación, se detalla el contenido y la interpretación de cada uno de estos campos:

<div id="tab-designaciones-en-espanol-e-ingles-para-cada-tipo-de-pieza-de-ajedrez"></div>

| Pieza | Designación en inglés | Designación en español |
| --- | --- | --- |
| Rey | K | R |
| Dama | Q | D |
| Torre | R | T |
| Alfil | B | A |
| Caballo | N | C |
| Peón | P | P |

*Designaciones de las piezas en inglés y español*

1. **Colocación de las piezas:** Define la disposición de las piezas en el tablero, fila por fila, comenzando desde la esquina superior izquierda. Cada pieza se representa por su letra identificativa en inglés (consulta la [Tabla 1](#tab-designaciones-en-espanol-e-ingles-para-cada-tipo-de-pieza-de-ajedrez) para las correspondencias exactas de las piezas). Las piezas blancas se denotan con mayúsculas y las negras con minúsculas. Si existen espacios vacíos entre las piezas, se añade un número que representa la cantidad de espacios. Las filas se separan con '/'.
2. **Bando:** Indica el turno de juego. Se utiliza 'w' para indicar que es el turno de las blancas y 'b' para las negras.
3. **Enroques:** Describe las posibilidades de enroque. Se coloca un '-' si no hay opciones de enroque para ninguno de los bandos. En caso contrario, se añade una 'K' para un enroque corto y una 'Q' para un enroque largo. Si la letra está en mayúscula, corresponde a las blancas; si está en minúscula, a las negras.
4. ***En passant*:** Señala la posibilidad de realizar una jugada de comer al paso. Se utiliza un '-' si no es posible; de lo contrario, se indica la casilla por donde ha pasado el peón después de mover dos espacios, es decir, la casilla en la que terminaría el peón oponente si realizara la captura al paso.
5. **Movimientos desde la última captura o avance de peón:** Proporciona el número de jugadas transcurridas sin que haya habido capturas ni movimientos de peón, lo que se relaciona con la regla de los 50 movimientos. Un "movimiento" se considera completo cuando ambos jugadores han realizado una jugada. Por lo tanto, esta regla se activaría cuando este contador alcance 100.
6. **Contador de movimientos:** Representa el número total de movimientos realizados desde el inicio de la partida.

Para aclarar estos conceptos, se propone un ejemplo a continuación. La [Figura 1](#fig-tablero-de-ejemplo-para-fen) muestra una posición de ajedrez que representaremos usando la notación FEN.

<figure id="fig-tablero-de-ejemplo-para-fen">
  <div class="chessboard" data-fen="rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2" data-size="8" data-chess-options="&quot;setfen=rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2 largeboard&quot;" role="img" aria-label="Tablero de ejemplo para FEN" data-rendered="source" data-board-asset="board-8x8-3afb5e96d80a3b70.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-3afb5e96d80a3b70.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Tablero de ejemplo para FEN</figcaption>
</figure>

La disposición de las piezas se expresaría así (las filas se han dispuesto de manera separada para facilitar la comprensión, pero en realidad se separan con '/' tal y como se ha mencionado anteriormente):

```text
rnbqkbnr
pp1ppppp
8
2p5
4P3
8
PPPP1PPP
RNBQKBNR
```

El turno del bando correspondería a las blancas, por lo que se escribe 'w'. Ambos bandos tienen todas las opciones de enroque disponibles, lo que se representa como 'KQkq'. No hay posibilidad de captura al paso, por lo que se coloca '-'. La última jugada fue c5, lo que indica que han pasado 0 movimientos desde la última jugada de "avance", y al encontrarse en el segundo movimiento de la partida, se indica con un 2 en el último campo.

La representación FEN final de la posición es la siguiente (todo se escribe en la misma línea):

```text
rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR 
w KQkq - 0 2
```

La notación FEN, aunque útil, tiene ciertas limitaciones. No especifica si ha habido repeticiones consecutivas de la misma posición (según las reglas del ajedrez, tres repeticiones de la misma posición resultan en un empate). Para subsanar este inconveniente, se ha desarrollado la Descripción de Posición Extendida (EDP, por sus siglas en inglés), una extensión de FEN que incluye dicha información. Asimismo, para el ajedrez 960 (una variante popular del ajedrez en la que la disposición inicial de las piezas en la primera y última fila es aleatoria), FEN presenta algunas limitaciones en cuanto a la representación del enroque. Para este caso, existen dos soluciones: Shredder-FEN y X-FEN.

## PGN

PGN (Portable Game Notation), según lo establecido por Edwards <cite><a href="/es/references#cite-edwards1994portable" data-cite="edwards1994portable">[Edwards, 1994]</a></cite>, es la modalidad estándar más extendida para la representación de partidas de ajedrez. Siguiendo los principios del FEN, se busca una representación fácil de comprender para las personas y, al mismo tiempo, eficiente para el procesamiento por parte de los sistemas computacionales. Este estándar se centra en consolidar toda la información relevante de la partida, lo que incluye no solo los movimientos del juego, sino también datos adicionales, como la identidad de los jugadores, el lugar de la partida, entre otros detalles.

En cuanto a la representación de la partida en sí, se utiliza una lista de jugadas desde la posición inicial hasta la posición final de la partida. La representación de los movimientos se hace mediante la notación algebraica, la cual se describe en detalle en el anexo 3.

En la mayoría de los casos, la notación algebraica emplea las designaciones en inglés para las piezas. También se muestra el número de movimiento antes de cada par de jugadas. Al finalizar la partida, se indica el resultado: "1-0" para la victoria de las blancas, "0-1" para la victoria de las negras, "1/2-1/2" para los empates y "*" si la partida aún no ha concluido. Es posible añadir comentarios después de cada jugada, encerrándolos entre "{}". Estos comentarios pueden contener información adicional sobre cada movimiento, como el tiempo restante de cada jugador, un recurso que se utiliza en plataformas como Lichess <cite><a href="/es/references#cite-lichess" data-cite="lichess">[Lichess]</a></cite>.

Previo a la lista de movimientos, se incorpora información adicional a la partida. Esta información puede ser heterogénea, aunque los programas informáticos suelen requerir la inclusión de siete elementos específicos. Estos son:

- Evento (*Event*): Designa el evento en el que se desarrolló la partida.
- Sitio (*Site*): Se refiere al lugar donde se disputó la partida, incluyendo la ciudad, región y país. En caso de que la partida haya sido disputada en una plataforma *online*, se indica correspondientemente.
- Fecha (*Date*): Fecha en que se llevó a cabo la partida.
- Resultado (*Result*): Resultado final de la partida.
- Blancas (*White*): Identidad del jugador con las piezas blancas.
- Negras (*Black*): Identidad del jugador con las piezas negras.

Además de estos campos obligatorios, se pueden incluir otros datos adicionales, como el ELO <span class="footnote" role="note">Sistema oficial de ranking en ajedrez</span>, el tiempo asignado para cada movimiento, entre otros. En caso de que la posición inicial no sea la estándar, se debe agregar un campo FEN indicando esta posición inicial.

A continuación, se presenta un ejemplo de una partida utilizando este formato. Se trata de una partida histórica que marcó un hito en la relación entre los humanos y las máquinas en el ajedrez. Esta partida corresponde al sexto encuentro entre Deep Blue y el entonces campeón mundial Garry Kasparov, que concluyó con una puntuación de 3.5 a 2.5 a favor de Deep Blue.

```text
[Event "IBM Man-Machine"]
[Site "New York, NY USA"]
[Date "1997.05.11"]
[Round "6"]
[Result "1-0"]
[White "Deep Blue"]
[Black "Garry Kasparov"]

1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Nd7 5.Ng5 Ngf6 6.Bd3
e6 7.N1f3 h6 8.Nxe6 {El movimiento sorprendió a los 
espectadores, ya que no se creía posible que una 
máquina pudiera realizar un sacrificio a largo plazo.} 
Qe7 9.O-O fxe6 10.Bg6+ Kd8 11.Bf4 b5 12.a4 Bb7 13.Re1 
Nd5 14.Bg3 Kc8 15.axb5 cxb5 16.Qd3 Bc6 17.Bf5 exf5 
18.Rxe7 Bxe7 19.c4 1-0
```

Como se puede observar, la partida incluye los siete campos obligatorios y un comentario a la jugada más inesperada e importante de la partida.

## UCI

La Universal Chess Interface (UCI) es un estándar que facilita dos funciones primordiales en el ámbito del ajedrez digital. En primer lugar, permite representar las jugadas de una forma accesible tanto para los ordenadores como para las personas. En segundo lugar, UCI establece el protocolo de comunicación entre la interfaz gráfica del software de ajedrez y el módulo de procesamiento de jugadas. La adopción de este estándar posibilita que cualquier interfaz gráfica que lo implemente sea compatible con todos los módulos que también hagan uso de la UCI, reflejando la eficacia y la universalidad del sistema.

La representación de las jugadas en UCI es intuitiva y directa, constituida por dos coordenadas consecutivas que señalan el punto de origen y el destino de la pieza en movimiento. Si la jugada conlleva una coronación, se añade a la secuencia de coordenadas la letra que identifica a la nueva pieza, en minúscula.

A modo de ejemplo, si deseamos realizar la jugada Cf3 desde la posición inicial, en formato UCI se representaría como g1f3, indicando el movimiento del caballo desde la posición g1 a f3. La claridad de esta representación radica en que la jugada puede ser interpretada sin necesidad de un conocimiento previo del tablero. Si se proporciona simplemente Cf3, no podríamos determinar el punto de origen de la pieza sin analizar el tablero. La jugada nos indica que el caballo se sitúa en f3, pero podría haber partido de d2, d4, g1, etc. El formato UCI elimina esta ambigüedad y simplifica el procesamiento de la jugada al especificar directamente el punto de origen y destino.

El protocolo de comunicación de UCI, aunque su profundización está orientada principalmente a los desarrolladores, facilita una "separación de responsabilidades" entre la interfaz gráfica y el módulo de procesamiento. La interfaz gráfica es responsable de visualizar el tablero de ajedrez, la partida (generalmente en formato PGN), el libro de aperturas (que contiene información sobre los movimientos típicos en las primeras jugadas de un partido), el tiempo restante de los jugadores, entre otros detalles. El módulo, por otro lado, se dedica a generar las jugadas en respuesta a la información recibida de la interfaz gráfica sobre la posición actual, incluyendo la ubicación de las piezas, la posibilidad de enroques, el tiempo restante, etc. Muchos de estos módulos permiten configurar el nivel de ELO que "intentarán" jugar.

El valor agregado de este protocolo reside en que, independientemente de la estructura interna del software de la interfaz gráfica y del módulo, ambos pueden comunicarse de manera eficaz siempre que se adhieran a la misma interfaz UCI. El módulo puede hacer uso de tecnologías como las redes neuronales o enfoques más tradicionales y seguirán siendo compatibles mientras se adhiera al protocolo.

En resumen, el uso de estándares como UCI en el mundo del ajedrez digital brinda una serie de ventajas, como la simplicidad y claridad en la representación de jugadas, la eficiencia en el procesamiento de las mismas y la interoperabilidad entre diferentes software de ajedrez. Además, estos estándares promueven una comunicación fluida entre la interfaz gráfica y el módulo de procesamiento, facilitando la adaptación y compatibilidad con diversas tecnologías y metodologías. En última instancia, la adopción de estos estándares contribuye a una mayor accesibilidad, comprensibilidad y disfrute del ajedrez.
