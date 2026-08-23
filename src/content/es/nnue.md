---
title: "Stockfish contraataca"
description: "El equipo de desarrollo de Stockfish, lejos de quedarse de brazos cruzados tras su derrota frente a AlphaZero, decidió adoptar una estrategia que recuerda al viejo dicho: \"Si no puedes vencer a tu enemigo, únete a él\"."
chapter: "Estado del arte"
part: "book"
order: 20
bookChapter: "4"
bookChapterTitle: "Estado del arte"
sectionNumber: "4.1"
sectionTitle: "Stockfish contraataca"
navDepth: 2
pairedSlug: "nnue"
source: "es/nnue.tex"
draft: false
---

El equipo de desarrollo de Stockfish, lejos de quedarse de brazos cruzados tras su derrota frente a AlphaZero, decidió adoptar una estrategia que recuerda al viejo dicho: "Si no puedes vencer a tu enemigo, únete a él". De este modo, optaron por incorporar redes neuronales en la estructura de Stockfish. Su objetivo principal era mantener la arquitectura original del programa, pero reemplazar la heurística desarrollada por programadores con una basada en una red neuronal. Esta modificación permitiría a Stockfish evaluar las posiciones del juego con una precisión mucho mayor, especialmente las posiciones "tranquilas".

Sin embargo, esta nueva estrategia presentaba un desafío importante. Al implementar redes neuronales en la heurística, se incrementaría considerablemente el coste computacional de su cálculo, lo que reduciría la velocidad de la búsqueda. Las heurísticas basadas en redes neuronales, con su gran número de capas, tienen un coste computacional muy superior al de las heurísticas empleadas por módulos de ajedrez tradicionales. Por esta razón, AlphaZero optó por utilizar un árbol de búsqueda Monte Carlo en lugar de la poda alfa-beta.

Para la fortuna de los desarrolladores de Stockfish, la solución a este problema surgió de un lugar inesperado: el mundo del Shogi. El Shogi, un juego de estrategia muy popular en Japón y con muchas similitudes al ajedrez, permitiendo la transferencia de muchos conceptos entre ambos juegos. En este contexto, surgió una nueva arquitectura de red neuronal llamada NNUE (de sus siglas en inglés, "Efficiently Updateable Neural Networks") <cite><a href="/es/references#cite-nasu2018efficiently" data-cite="nasu2018efficiently">[Nasu, 2018]</a></cite>. Esta arquitectura buscaba crear una red neuronal que pudiera calcularse con mucha rapidez, lo cual ofreció un impulso significativo para el desarrollo de Stockfish.

La red neuronal tipo NNUE se diseñó con el propósito primordial de maximizar su velocidad de cálculo. La premisa es simple: a mayor rapidez de cálculo, mayor será el número de nodos que se pueden explorar y, por tanto, mejor será la jugada que se encuentre. Las NNUE se caracterizan por tener un número de capas muy reducido (es poco común encontrar más de cinco) y por utilizar capas de perceptrones.

Para adecuar la representación de una posición de ajedrez a una capa de perceptrones, es necesario adoptar un enfoque completamente novedoso. Aquí es donde entra en juego el formato conocido como HalfKP, una representación innovadora y eficiente que permite transformar las posiciones del ajedrez en un formato adecuado para el uso con redes neuronales basadas en perceptrones.

El término HalfKP se deriva de Half-King-Piece, un nombre que refleja claramente su mecanismo de funcionamiento. El concepto fundamental detrás de HalfKP es establecer una relación entre la posición de los reyes de ambos bandos y la disposición de las demás piezas en el tablero de ajedrez.

En concreto, HalfKP emplea una representación binaria (solo toma valor 0 o 1) para indicar la presencia de un cierto tipo de pieza en una posición específica, condicionada por la posición en la que se encuentre tu rey. Por ejemplo, si tu rey está situado en la casilla e1 y un caballo de tu bando se encuentra en la casilla b1, entonces la entrada correspondiente a estas coordenadas en la representación binaria tendrá un valor de 1. Este procedimiento se aplica de manera análoga para el bando contrario.

La representación binaria consta de un total de $64 \times 64 \times 8 \times 2 = 81920$ entradas. El primer factor de 64 corresponde a las 64 casillas posibles para el rey, el segundo 64 hace referencia a las diferentes ubicaciones en las que podría encontrarse cualquier otra pieza, el 8 se refiere a los distintos tipos de piezas posibles excluyendo a los reyes (es decir, peón, torre, caballo, alfil, dama y sus contrapartes negras), y finalmente, el 2 indica que este proceso se lleva a cabo para los reyes de ambos bandos.

En contraste, la salida de este sistema es mucho más simple y consta de un solo valor numérico que representa la evaluación de la posición en términos de centipeones, donde 1 peón equivale a 100 centipeones. Esta es una de las unidades de medida más comúnmente utilizadas para evaluar la posición en una partida de ajedrez.

A continuación se presenta un ejemplo del funcionamiento de la entrada dado su complejidad. Dado el tablero mostrado en el [tablero de ejemplo HalfKP](#fig-tablero-de-ejemplo-para-halfkp).

<figure id="fig-tablero-de-ejemplo-para-halfkp">
  <div class="chessboard" data-fen="b2r3r/k4p1p/p2q1np1/NppP4/3p1Q2/P4PPB/1PP4P/1K1RR3 w - - 1 24" data-size="8" data-chess-options="&quot;setfen=b2r3r/k4p1p/p2q1np1/NppP4/3p1Q2/P4PPB/1PP4P/1K1RR3 w - - 1 24, largeboard&quot;" role="img" aria-label="Tablero de ejemplo para HalfKP" data-rendered="source" data-board-asset="board-8x8-0e3dab4ed34f10af.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-0e3dab4ed34f10af.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Tablero de ejemplo para HalfKP</figcaption>
</figure>

Vamos a tener marcado con 1 las siguientes entradas:

- Rey propio b1 y peón propio a3
- Rey propio b1 y peón propio b2
- Rey propio b1 y peón propio c2
- Rey propio b1 y peón propio d5
- Rey propio b1 y peón propio f3
- Rey propio b1 y peón propio g3
- Rey propio b1 y peón propio h2
- Rey propio b1 y peón rival a6
- Rey propio b1 y peón rival b5
- Rey propio b1 y peón rival c5
- Rey propio b1 y peón rival d4
- Rey propio b1 y peón rival f7
- Rey propio b1 y peón rival g6
- Rey propio b1 y peón rival h7
- Rey propio b1 y caballo propio a5
- Rey propio b1 y caballo rival f6
- Rey propio b1 y alfil propio h3
- Rey propio b1 y alfil rival a8
- Rey propio b1 y torre propia d1
- Rey propio b1 y torre propia e1
- Rey propio b1 y torre rival d8
- Rey propio b1 y torre rival h8
- Rey propio b1 y dama propia f4
- Rey propio b1 y dama rival d6

Para el monarca adversario, emplearíamos una designación similar. Solo deberíamos reemplazar la frase "Rey propio b1" por "Rey rival a7", invirtiendo los términos 'propio' y 'rival' en las piezas de la lista. Aquellas casillas que no aparezcan en ninguna de las listas permanecerán a cero. Con respecto a los valores de entrada, es importante destacar que ciertas entradas nunca podrán tener un valor de 1. Por ejemplo, en una situación donde simultáneamente se presente 'rey propio e1' y 'pieza e1'. A pesar de ello, para facilitar el procesamiento, se suelen mantener estas posiciones.

Es notable que esta representación contiene cierta redundancia, es decir, incluye información adicional. Esta característica se evidencia en la repetición de la colocación de las piezas para cada rey. Sin embargo, tal redundancia ofrece ciertas ventajas, especialmente en el contexto de las redes neuronales, las cuales son capaces de optimizar sus resultados en esta circunstancia. Otro beneficio de esta representación radica en su facilidad para realizar actualizaciones. Si se desplaza una pieza, solo es necesario asignar dos de las entradas a 1 y otras dos a 0. En contraste, si se mueve uno de los reyes, se requerirá realizar una mayor cantidad de modificaciones. Afortunadamente, en el ajedrez, los movimientos del rey son infrecuentes, excepto en las etapas finales del juego.

Además, esta representación brinda una ventaja por su simplicidad al "reflejar" la posición en el tablero. Si deseamos intercambiar las piezas blancas por las negras en una posición dada, solo debemos intercambiar la sección correspondiente a nuestro rey por la del rey adversario. Al mantener esta representación siempre orientada hacia el jugador que tiene el turno, permite una rápida adaptación a las diferentes configuraciones del juego.

Para entrenar este tipo de red neuronal se utiliza una combinación de aprendizaje supervisado y reforzado. En el aprendizaje supervisado, se emplean partidas de alta calidad que involucran a los grandes maestros más fuertes y partidas entre módulos, especialmente de la versión *open source*de AlphaZero, Leela Chess Zero. Después de completar esta etapa de entrenamiento supervisado, se procede a combinarla con el aprendizaje reforzado, en el cual se juegan partidas contra sí mismo, siguiendo el enfoque utilizado por AlphaZero.

En cuanto a la red neuronal, cuenta con una primera capa de 256 perceptrones, cada uno de los cuales puede recibir un total de 40960 entradas. Los 256 valores generados por esta capa se transfieren a una segunda capa que consta de 32 perceptrones. Los resultados de esta segunda capa se procesan en una tercera capa también de 32 perceptrones. Finalmente, estos últimos consolidan sus resultados en una salida única, la cual se ha comentado previamente <cite><a href="/es/references#cite-klein2022neural" data-cite="klein2022neural">[Klein, 2022]</a></cite>.

En la primera capa, se manejan 40960 entradas, pero, ¿no se mencionó que se tienen en total 81920 entradas? Efectivamente, eso es cierto, pero la entrada se divide entre la sección del rey propio y la del rey rival. Cada una de estas secciones se procesa de forma independiente por los mismos perceptrones y se transfieren a la segunda capa, resultando en un total de 512 entradas en lugar de las 256 inicialmente esperadas debido a los 256 perceptrones de la primera capa.

Una manera de conceptualizar este proceso es pensar que la red neuronal está evaluando la disposición de las piezas en relación a cada rey, intentando determinar cuál de los dos bandos presenta una situación más favorable.

El empleo de esta red neuronal conlleva una serie de ventajas para su implementación en el ámbito de la computación. Estos beneficios incluyen la capacidad de reutilizar cálculos ya realizados a partir de otras posiciones, lo que se logra mediante mínimas variaciones en las entradas. Además, la estructura de la red permite ejecutar diversos cálculos de manera paralela, es decir, realizar varias operaciones simultáneamente. Este aspecto facilita un notable incremento en la velocidad de procesamiento, contribuyendo a un desempeño más eficiente y rápido de la red neuronal en el análisis de las posiciones en el juego de ajedrez.

Tras la implementación de esta mejora, Stockfish ha conseguido reafirmar su posición entre los mejores módulos de ajedrez a nivel mundial. Sin embargo, la competencia para determinar el mejor programa de ajedrez es un evento anual de alto nivel y la contienda es feroz. Participan múltiples programas distintos, pero aquellos que generalmente ocupan las posiciones de liderazgo emplean enfoques similares al de Stockfish o al de AlphaZero/Leela Chess Zero. La continua innovación y mejora en las estrategias de programación de ajedrez aseguran una competencia emocionante e incierta, mostrando el gran avance en la intersección de la inteligencia artificial y el juego de ajedrez.
