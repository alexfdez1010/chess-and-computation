---
title: "El problema de las n-damas"
description: "Para estimular su curiosidad y compromiso en este fascinante capítulo, permítanme revelarles un intrigante incentivo."
chapter: "Problemas ajedrecísticos"
part: "book"
order: 1
bookChapter: "1"
bookChapterTitle: "Problemas ajedrecísticos"
sectionNumber: "1.1"
sectionTitle: "El problema de las n-damas"
navDepth: 2
pairedSlug: "n-queens"
source: "es/n-queens.tex"
draft: false
---

### Un problema milenario

Para estimular su curiosidad y compromiso en este fascinante capítulo, permítanme revelarles un intrigante incentivo: existe una recompensa de un millón de dólares para aquel que logre descubrir un algoritmo polinómico determinista que pueda resolver el problema que estamos a punto de describir para cualquier valor de $n$. Aunque el término "algoritmo polinómico" puede ser desconocido para algunos, no se preocupen, en las próximas secciones lo abordaremos con detalle para que puedan comprender su significado y relevancia.

Ahora, para mantener la emoción creciente, es hora de presentarles el problema en cuestión:

"Dado un tablero de ajedrez de dimensión $n \times n$ (lo que significa que cada fila y cada columna tiene $n$ casillas), una solución al problema consiste en colocar $n$ damas de tal manera que ninguna de ellas pueda atacar a otra".

Para expresarlo de manera más clara, el objetivo es colocar las damas de tal manera que no puedan atacarse entre ellas. Esto implica que sólo puede haber una dama en cada fila, columna y diagonal. Para aquellos que no están familiarizados con las reglas del ajedrez, se ha incluido un apéndice al final del libro que explica cómo se mueven las diferentes piezas en este juego.

En caso de que esté pensando en aceptar este desafío, le informamos que resolver este problema es equivalente a demostrar que P=NP, una de las preguntas más importantes y sin resolver en la teoría de la computación. Puede encontrar más información sobre este premio y las reglas del concurso en la página web del Instituto de Matemáticas Clay<span class="footnote" role="note"><a href="https://www.claymath.org/millennium-problems/p-vs-np-problem">https://www.claymath.org/millennium-problems/p-vs-np-problem</a></span> (última consulta el 8/9/2022).

Para familiarizarnos con la problemática en cuestión, es conveniente comenzar con las dimensiones más pequeñas, denotadas como $n$, del tablero de ajedrez.

Para $n = 1$, nos encontramos con un tablero que consta de una sola casilla. En este escenario, disponemos de una única dama para colocar. Debido a las dimensiones del tablero, sólo existe una posible ubicación para la dama, siendo esta la única solución viable para un tablero de este tamaño.

Al incrementar a $n = 2$ o $n = 3$, nos encontramos con un obstáculo. En estos casos, es imposible hallar una solución. La razón subyacente a esta afirmación es que en tableros de ajedrez de estas dimensiones, las damas no pueden ser ubicadas de manera que no se amenacen entre sí, según las reglas del juego.

Al aumentar el tamaño del tablero a $n = 4$, la situación se vuelve más interesante, ya que existen múltiples soluciones. En particular, hay dos soluciones posibles para un tablero de este tamaño. Una de las soluciones se puede visualizar directamente en el tablero. La otra solución se puede obtener mediante una rotación del tablero que ya tiene una solución: simplemente necesitamos desplazar las damas siguiendo las direcciones indicadas por las flechas. De esta manera, se pueden explorar todas las posibles soluciones para un tablero de ajedrez de dimensiones $n = 4$.

La Figura [referencia](#fig-soluciones-del-tablero-4x4) presenta ambas soluciones para el problema de las ocho reinas en un tablero de tamaño 4x4. La primera solución consiste en colocar a las damas en las casillas a2, b4, c1 y d3. En la segunda solución, las damas se desplazan a las casillas indicadas por las flechas, situándose en las casillas a3, c4, b1 y d2.

<figure id="fig-soluciones-del-tablero-4x4">
  <div class="chessboard" data-fen="start" data-size="4" data-pieces="qa2, qb4, qc1, qd3" data-arrows="a2-a3, b4-c4, c1-b1, d3-d2" data-chess-options="&quot;maxfield=d4, showmover=false, pgfstyle=straightmove, markmoves={a2-a3, b4-c4, c1-b1, d3-d2}, arrow=to, setpieces={qa2, qb4, qc1, qd3}, largeboard&quot;" role="img" aria-label="Soluciones del tablero 4x4" data-rendered="source" data-board-asset="board-4x4-8391692a2d87bdc0.svg"><img class="source-chessboard" src="/assets/boards/board-4x4-8391692a2d87bdc0.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Soluciones del tablero 4x4</figcaption>
</figure>

En el caso de un tablero de ajedrez de tamaño $n\times n$ con $n = 5$, se pueden encontrar numerosas soluciones, siendo hasta 10 soluciones posibles. Sin embargo, hay que tener en cuenta que solo existen realmente 2 soluciones únicas, ya que las demás son derivadas de estas mediante operaciones de reflexión y rotación.

Para ser más específicos, a partir de la primera solución (tablero de la izquierda), se pueden generar un total de 8 soluciones diferentes, mientras que a partir de la segunda solución (tablero de la derecha), se pueden obtener únicamente 2 soluciones distintas, aplicando las operaciones de rotación y reflexión mencionadas anteriormente.

<figure id="fig-soluciones-del-tablero-5x5">
  <div class="chessboard" data-fen="start" data-size="5" data-pieces="qa5, qb3, qc1, qd4, qe2" data-chess-options="&quot;maxfield=e5, showmover=false, setpieces={qa5, qb3, qc1, qd4, qe2}, largeboard&quot;" role="img" aria-label="Soluciones del tablero 5x5" data-rendered="source" data-board-asset="board-5x5-12344181e6c75897.svg"><img class="source-chessboard" src="/assets/boards/board-5x5-12344181e6c75897.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <div class="chessboard" data-fen="start" data-size="5" data-pieces="qa4, qb1, qc3, qd5, qe2" data-chess-options="&quot;maxfield=e5, showmover=false, setpieces={qa4, qb1, qc3, qd5, qe2}, largeboard&quot;" role="img" aria-label="Soluciones del tablero 5x5" data-rendered="source" data-board-asset="board-5x5-707d875a043b87cd.svg"><img class="source-chessboard" src="/assets/boards/board-5x5-707d875a043b87cd.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Soluciones del tablero 5x5</figcaption>
</figure>

A continuación, se explica de manera sencilla el funcionamiento de las rotaciones y reflexiones.

1. Rotación: Esta operación consiste en girar el tablero de ajedrez en ángulos de 90, 180 o 270 grados en sentido horario o antihorario. Al rotar el tablero, se cambia la posición de las piezas, pero la relación entre ellas se mantiene, lo que puede dar lugar a soluciones aparentemente diferentes pero que son equivalentes.
2. Reflexión: La reflexión implica "reflejar en un espejo" el tablero de ajedrez, es decir, invertir las posiciones de las piezas de forma simétrica con respecto a un eje (horizontal, vertical o diagonal). Al igual que en la rotación, la relación entre las piezas se conserva, por lo que también puede generar soluciones equivalentes a las originales.

Una vez que el lector haya adquirido un buen entendimiento del problema que se está tratando, es posible realizar algunas observaciones generales sobre el mismo. Independientemente de la dimensión $n$ del tablero, existen ciertos patrones geométricos que permanecen constantes y que pueden ayudar a facilitar la búsqueda de una solución de manera más eficaz. Sin embargo, en el enfoque tradicional de este problema, se asume que algunas damas ya están dispuestas en el tablero, lo que, en la mayoría de las circunstancias, obstaculiza la utilización de los patrones geométricos previamente mencionados. Por ende, resulta imperativo desarrollar un algoritmo que pueda resolver el problema bajo estas condiciones específicas.

Uno de los patrones geométricos considerados es el que consiste en ubicar las damas siguiendo el patrón de movimiento del caballo en el ajedrez, es decir, en forma de "L", para evitar que se ataquen entre sí. No obstante, esta solución solo resulta efectiva en casos particulares, dado que, en la mayoría de las situaciones, las damas terminarán atacándose entre sí. Un ejemplo de cómo funciona este patrón se puede observar en la Figura [referencia](#fig-soluciones-del-tablero-5x5), donde todas las damas están dispuestas siguiendo el salto del caballo. Para tableros de mayor tamaño, es posible utilizar la misma técnica, pero con ciertas restricciones. La solución mostrada para un tablero de $n \times n$ es un ejemplo de ello.

<figure id="fig-soluciones-del-tablero-10x10-colocando-las-damas-en-l">
  <div class="chessboard" data-fen="start" data-size="10" data-pieces="qa9, qb7, qc5, qd3, qe1, qf10, qg8, qh6, qi4, qj2" data-chess-options="&quot;maxfield=j10, showmover=false, setpieces={qa9, qb7, qc5, qd3, qe1, qf10, qg8, qh6, qi4, qj2}, largeboard&quot;" role="img" aria-label="Soluciones del tablero 10x10 colocando las damas en L" data-rendered="source" data-board-asset="board-10x10-c261b1e7bd44cb64.svg"><img class="source-chessboard" src="/assets/boards/board-10x10-c261b1e7bd44cb64.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Soluciones del tablero 10x10 colocando las damas en L</figcaption>
</figure>

Es esencial destacar que, si bien la mayoría de las damas se pueden ubicar utilizando el patrón de salto del caballo, en ocasiones es necesario prescindir de este patrón para satisfacer las restricciones del problema.

En síntesis, aunque la estrategia de disposición en forma de "L" puede resultar de gran utilidad, no constituye una solución universal para resolver el problema. En la siguiente sección, se presentará una técnica universal que permitirá resolver el problema en cualquier situación.

### Vuelta atrás versus n-damas

El algoritmo de *Backtracking*, también conocido como "vuelta atrás", es uno de los esquemas algorítmicos más utilizados en la resolución de problemas complejos. De manera general, este algoritmo permite realizar una búsqueda exhaustiva en el espacio de todas las posibles soluciones, seleccionando aquellas que cumplen con los criterios definidos por el problema en cuestión. Además, su capacidad de generar todas las soluciones posibles permite identificar y seleccionar la que sea más óptima o favorable, de acuerdo con los requisitos específicos del problema.

A pesar de estas ventajas, el uso de *Backtracking* presenta una desventaja significativa: el número de soluciones posibles crece exponencialmente en la mayoría de los casos. Si se intenta generar todas las soluciones posibles, el algoritmo tendrá que enfrentarse al coste computacional exponencial inherente a este crecimiento.

Afortunadamente, existen estrategias para mitigar esta complejidad. Dos de las más prominentes son la poda y la búsqueda inteligente. La poda es una técnica que permite abortar la exploración de ciertas ramas del espacio de soluciones tan pronto como se determine que no pueden conducir a una solución válida. Por su parte, la búsqueda inteligente permite definir el orden en el que se exploran las diferentes ramas del espacio de soluciones, dando prioridad a aquellas que, según una heurística predefinida, sean más propensas a contener una solución válida. El concepto de heurística, así como su aplicación en el contexto de la Inteligencia Artificial, será abordado en profundidad en el capítulo dedicado a la Inteligencia Artificial aplicada al ajedrez.

A continuación, nos centraremos en la aplicación del algoritmo de *Backtracking* a nuestro problema en estudio.

#### Representación de los estados

Cuando se realiza un *Backtracking* a través de todas las "soluciones" o "estados" posibles, resulta crucial definir de manera apropiada cómo se van a representar dichos estados. Para el problema específico que estamos abordando, que involucra la ubicación de las damas en un tablero de ajedrez, también debemos considerar que puede haber damas que aún no hayan sido colocadas. Entonces, surge la pregunta: ¿Cómo representamos esto?

Una idea inicial comúnmente considerada es representar la posición de una dama mediante sus coordenadas en el tablero. Aquellas damas que aún no se han colocado simplemente no se incluyen en la lista de coordenadas. La Figura [referencia](#fig-tablero-para-mostrar-la-representacion) muestra el tablero que se usará para mostrar las diferentes representaciones.

<figure id="fig-tablero-para-mostrar-la-representacion">
  <div class="chessboard" data-fen="start" data-size="5" data-pieces="qa4, qb1, qc3, qd5" data-chess-options="&quot;maxfield=e5, showmover=false, setpieces={qa4, qb1, qc3, qd5}, largeboard&quot;" role="img" aria-label="Tablero para mostrar la representación" data-rendered="source" data-board-asset="board-5x5-5baf4538dba917d1.svg"><img class="source-chessboard" src="/assets/boards/board-5x5-5baf4538dba917d1.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Tablero para mostrar la representación</figcaption>
</figure>

La representación con coordenadas que corresponde al tablero presentado anteriormente es la siguiente:

$$
[\text{a4}, \text{b1}, \text{c3}, \text{d5}]
$$

Dado que hay cuatro damas, solo habría cuatro coordenadas en esta representación, aunque es posible colocar una quinta dama en el tablero fácilmente, añadiéndola en la coordenada e2.

La representación que hemos utilizado hasta ahora es útil, pero se puede mejorar, especialmente teniendo en cuenta que, de acuerdo con las reglas del problema, solo puede haber una dama en cada columna y fila. Esta restricción nos permite simplificar la representación de manera significativa.

La idea es emplear una lista de números enteros de tamaño $n$. Para cada columna, vamos a indicar en la lista en qué fila se encuentra la dama. Así, la primera posición de la lista corresponde a la columna "a", la segunda a la columna "b", y así sucesivamente. Si en la columna "a" aparece el valor 3, esto indica que la dama ubicada en la columna "a" se encuentra en la fila 3. Si no se ha colocado una dama en una columna particular, asignamos un valor de -1 a esa posición en la lista.

Por lo tanto, la nueva representación del tablero en la Figura [referencia](#fig-tablero-para-mostrar-la-representacion) sería:

$$
[4,1,3,5,-1]
$$

Según la representación, se tiene la dama de la primera columna en la fila 4, la dama de segunda columna en la fila 1, la dama de la columna 3 en la fila 3, la dama de la columna 4 en la fila 5 y la dama de la columna 5 al no estar todavía colocada tiene un -1.

Gracias a esta representación se puede crear un algoritmo de manera sencilla para resolver este problema.

#### Funcionamiento del algoritmo

Para ilustrar cómo opera el algoritmo de *Backtracking*, se presenta primero un ejemplo paso a paso de cómo se resuelve un caso específico. Posteriormente, se proporciona una visión general del funcionamiento del algoritmo, representándolo a través de un diagrama de flujo.

La Figura [referencia](#fig-posicion-inicial-de-resolucion-usando-vuelta-atras) muestra la configuración inicial de las damas que se utilizará para resolver el problema.

<figure id="fig-posicion-inicial-de-resolucion-usando-vuelta-atras">
  <div class="chessboard" data-fen="start" data-size="5" data-pieces="qb3, qe2" data-chess-options="&quot;maxfield=e5, showmover=false, setpieces={qb3, qe2}, largeboard&quot;" role="img" aria-label="Posición inicial de resolución usando vuelta atrás" data-rendered="source" data-board-asset="board-5x5-bae4b4d9608c98c7.svg"><img class="source-chessboard" src="/assets/boards/board-5x5-bae4b4d9608c98c7.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Posición inicial de resolución usando vuelta atrás</figcaption>
</figure>

El primer paso del algoritmo consiste en establecer una representación correspondiente al tablero inicial. Esta representación se obtiene como sigue:

$$
[-1, \ 3,-1,-1, \ 2]
$$

El algoritmo procederá columna por columna, resolviendo aquellas columnas cuyo valor sea -1, es decir, las columnas que aún no tienen una dama colocada. El proceso comienza por la columna "a".

<figure id="fig-primera-fase-de-resolucion-usando-vuelta-atras">
  <div class="chessboard" data-fen="start" data-size="5" data-pieces="qb3, qe2" data-marks="a1,a5" data-chess-options="&quot;maxfield=e5, showmover=false, padding=-0.2em, setpieces={qb3, qe2}, pgfstyle=circle, markfields={a1,a5}, largeboard&quot;" role="img" aria-label="Primera fase de resolución usando vuelta atrás" data-rendered="source" data-board-asset="board-5x5-40603e4fb7c9d417.svg"><img class="source-chessboard" src="/assets/boards/board-5x5-40603e4fb7c9d417.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Primera fase de resolución usando vuelta atrás</figcaption>
</figure>

Como se puede observar, hay dos posibles filas para colocar la dama: la 1 y la 5. Se opta por la primera, ya que 1 es menor que 5, aunque la elección podría hacerse en cualquier orden. Una vez colocada la dama en la primera columna, en la fila 1, se avanza al siguiente paso, que consiste en colocar la dama en la tercera columna (la dama de la segunda columna ya está colocada).

<figure id="fig-segunda-fase-de-resolucion-usando-vuelta-atras">
  <div class="chessboard" data-fen="start" data-size="5" data-pieces="qb3, qe2, qa1" data-marks="c5" data-chess-options="&quot;maxfield=e5, showmover=false, padding=-0.2em, setpieces={qb3, qe2, qa1}, pgfstyle=circle, markfields={c5}, largeboard&quot;" role="img" aria-label="Segunda fase de resolución usando vuelta atrás" data-rendered="source" data-board-asset="board-5x5-fbccad45f19f611d.svg"><img class="source-chessboard" src="/assets/boards/board-5x5-fbccad45f19f611d.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Segunda fase de resolución usando vuelta atrás</figcaption>
</figure>

$$
[\ 1, \ 3,-1,-1, \ 2]
$$

En este punto, solo hay una opción viable, que consiste en colocar la dama de la columna "c" en la quinta fila, por lo que no se produce ninguna bifurcación. Una bifurcación se produce cuando hay que elegir entre diferentes opciones para colocar la dama en una fila determinada.

<figure id="fig-tercera-fase-de-resolucion-usando-vuelta-atras">
  <div class="chessboard" data-fen="start" data-size="5" data-pieces="qb3, qe2, qa1, qc5" data-chess-options="&quot;maxfield=e5, showmover=false, setpieces={qb3, qe2, qa1, qc5}, largeboard&quot;" role="img" aria-label="Tercera fase de resolución usando vuelta atrás" data-rendered="source" data-board-asset="board-5x5-af7df8f4d3e301ae.svg"><img class="source-chessboard" src="/assets/boards/board-5x5-af7df8f4d3e301ae.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Tercera fase de resolución usando vuelta atrás</figcaption>
</figure>

$$
[\ 1, \ 3, \ 5, -1, \ 2]
$$

Tras colocar la última dama, nos encontramos con una sorpresa desagradable, ya que no hay ninguna casilla en la columna "d" que no esté siendo atacada por otra dama. Por consiguiente, es imposible situar una dama en esa columna sin que sea atacada. Aquí es cuando el algoritmo de "vuelta atrás" entra en acción: como no se ha podido encontrar una solución en este camino, es necesario retroceder a la bifurcación anterior, donde se debía elegir entre diferentes opciones. En este caso concreto, se retrocede a la primera columna, donde se debía elegir entre las filas 1 y 5. Si hubiera habido varias opciones en la columna 3, se habría retrocedido a esa columna. Finalmente, se coloca la dama de la columna "a" en la quinta fila.

<figure id="fig-cuarta-etapa-de-resolucion-usando-vuelta-atras">
  <div class="chessboard" data-fen="start" data-size="5" data-pieces="qb3, qe2, qa5" data-marks="c1" data-chess-options="&quot;maxfield=e5, showmover=false, padding=-0.2em, setpieces={qb3, qe2, qa5}, pgfstyle=circle, markfields={c1}, largeboard&quot;" role="img" aria-label="Cuarta etapa en la resolución del problema con la técnica de vuelta atrás" data-rendered="source" data-board-asset="board-5x5-10a66a152c941adb.svg"><img class="source-chessboard" src="/assets/boards/board-5x5-10a66a152c941adb.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Cuarta etapa en la resolución del problema con la técnica de vuelta atrás</figcaption>
</figure>

$$
[5, \ 3,-1,-1, \ 2]
$$

La solución continúa con la colocación de la siguiente reina en la única posición que queda disponible. Esta posición corresponde a la primera fila de la tercera columna.

<figure id="fig-quinta-etapa-de-resolucion-usando-vuelta-atras">
  <div class="chessboard" data-fen="start" data-size="5" data-pieces="qb3, qe2, qa5, qc1" data-marks="d4" data-chess-options="&quot;maxfield=e5, showmover=false, padding=-0.2em, setpieces={qb3, qe2, qa5, qc1}, pgfstyle=circle, markfields={d4}, largeboard&quot;" role="img" aria-label="Quinta etapa en la resolución del problema con la técnica de vuelta atrás" data-rendered="source" data-board-asset="board-5x5-552a50d15780f4e2.svg"><img class="source-chessboard" src="/assets/boards/board-5x5-552a50d15780f4e2.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Quinta etapa en la resolución del problema con la técnica de vuelta atrás</figcaption>
</figure>

$$
[5, \ 3, \ 1 ,-1, \ 2]
$$

Afortunadamente, en este caso, es posible continuar colocando reinas en la siguiente columna.

<figure id="fig-fase-final-de-resolucion-usando-vuelta-atras">
  <div class="chessboard" data-fen="start" data-size="5" data-pieces="qb3, qe2, qa5, qc1, qd4" data-chess-options="&quot;maxfield=e5, showmover=false, padding=-0.2em, setpieces={qb3, qe2, qa5, qc1, qd4}, pgfstyle=circle, largeboard&quot;" role="img" aria-label="Fase final en la resolución del problema con la técnica de vuelta atrás" data-rendered="source" data-board-asset="board-5x5-a73e4f6277e6732a.svg"><img class="source-chessboard" src="/assets/boards/board-5x5-a73e4f6277e6732a.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Fase final en la resolución del problema con la técnica de vuelta atrás</figcaption>
</figure>

Una vez que se ha colocado una reina en cada columna y se ha confirmado que ninguna comparte la misma fila o diagonal con otra, podemos deducir que hemos hallado una solución. Según las necesidades específicas del problema, podríamos detenernos en este punto o continuar nuestra búsqueda hasta descubrir todas las posibles soluciones. En el caso presente, dado que no existen más bifurcaciones, es evidente que hemos llegado a una única solución.

Tras el análisis del algoritmo, surge una cuestión pertinente: ¿Cómo determina el ordenador que no existen dos reinas en la misma columna, fila o diagonal? En relación a la columna, no tendríamos que verificarlo, ya que la representación de los estados ya lo asegura. Respecto a las filas, sería sencillo comprobarlo examinando la lista del estado actual y verificando si el número de fila ya se encuentra en dicha lista. Sin embargo, existe un método aún más eficiente que implicaría el uso de una lista de 0s y 1s de tamaño igual al número de filas. En esta lista, un 0 en la posición $i$ indicaría que la fila $i$ está desocupada, y un 1 indicaría lo contrario. Este tipo de valor, que solo puede ser 0 o 1, se conoce en la informática como booleano.

Por último, en el caso de las diagonales, la situación sería algo más compleja, pero afortunadamente existe una fórmula que simplifica considerablemente este proceso si convertimos las columnas en números. Para llevar a cabo esta conversión, simplemente se reemplaza cada letra por su correspondiente posición en el alfabeto: la "a" se convierte en 1, la "b" en 2, y así sucesivamente. Con esta equivalencia en mano, podemos aplicar la fórmula.

Dos damas, representadas por las posiciones $i$ y $j$ en un vector $V$, están en la misma diagonal si y solo si $|i - j| = |V[i] - V[j]|$. En otras palabras, la diferencia absoluta entre las columnas $i$ y $j$ debe ser igual a la diferencia absoluta entre las filas $V[i]$ y $V[j]$. El operador de valor absoluto, $|\cdot|$, se utiliza para eliminar cualquier signo negativo. Por ejemplo, $|2| = 2$ y $|-3| = 3$.

Una desventaja de este método es su complejidad computacional, ya que requiere comparar cada dama con todas las demás. Para ilustrar, con $n = 8$ damas, se necesitarían $7 + 6 + 5 + 4 + 3 + 2 + 1 = 28$ comparaciones. Sin embargo, existe una forma más eficiente de abordar este problema: marcando las diagonales ya ocupadas para evitar repetir comparaciones innecesarias. <span class="footnote" role="note">Otro método más rápido para representar estos estados sería utilizando conjuntos de bits o <em>bitsets</em> <cite><a href="/es/references#cite-8stevenhalimfelixhalim2013" data-cite="8stevenhalimfelixhalim2013">[Steven Halim, 2013]</a></cite>.</span>

Una vez analizado un ejemplo y comprendido su funcionamiento, podemos definir el algoritmo mediante un diagrama de flujo que ilustre el proceso general de resolución. La Figura [referencia](#fig-diagrama-de-flujo-de-backtracking-aplicado-a-n-damas) muestra dicho diagrama de flujo. En un programa real, sería necesario detallar más específicamente las acciones realizadas en cada paso del diagrama de flujo, pero dado que este libro tiene un carácter divulgativo, no es necesario entrar en esos detalles técnicos.

<figure id="fig-diagrama-de-flujo-de-backtracking-aplicado-a-n-damas">
  <div class="localized-diagram flow-diagram mermaid-flowchart" data-diagram="flowchart" data-node-count="8" data-mermaid="flowchart TD
  node_start([&quot;Comienzo&quot;]):::terminal
  node_in[/&quot;Entrada&quot;/]:::io
  node_branch1{&quot;¿Colocadas?&quot;}:::decision
  node_branch2{&quot;¿Se puede colocar dama en la fila?&quot;}:::decision
  node_out[/&quot;Solución&quot;/]:::io
  node_end([&quot;Fin&quot;]):::terminal
  node_process1[&quot;Retroceder última bifurcación&quot;]:::process
  node_process2[&quot;Añadir dama&quot;]:::process
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
  classDef process fill:#f7f7f1,color:#171a17,stroke:#6f786f,stroke-width:1.5px" role="img" aria-label="Diagrama de flujo de Backtracking aplicado a n-damas">Comienzo → Entrada → ¿Colocadas? → ¿Se puede colocar dama en la fila? → Solución → Fin → Retroceder última bifurcación → Añadir dama</div>
  <figcaption>Diagrama de flujo de <em>Backtracking</em> aplicado a $n$-damas</figcaption>
</figure>

A continuación, se describen detalladamente cada uno de los pasos del algoritmo representados en el diagrama de flujo.

1. Comienzo: Se inicia el algoritmo.
2. Entrada: Se introduce el problema con las damas ya colocadas en el tablero.
3. ¿Colocadas?: Se verifica si todas las damas han sido ubicadas en el tablero. Si la respuesta es afirmativa, el algoritmo ha encontrado una solución y procede a finalizar. De lo contrario, el algoritmo continúa con el siguiente paso, que consiste en determinar si es posible colocar una dama en la siguiente fila sin interferir con las damas ya ubicadas.
4. ¿Se puede colocar dama en la fila?: Se evalúa si es posible ubicar una dama en la fila actual sin que sea atacada por otras damas presentes en el tablero. Si la respuesta es afirmativa, el algoritmo sitúa una dama en la fila actual y avanza al siguiente paso. Si la respuesta es negativa, el algoritmo retrocede a la última bifurcación, es decir, al punto en el que tuvo que elegir entre diferentes opciones para ubicar las damas.
5. Retroceder última bifurcación: El algoritmo vuelve a la última bifurcación, eliminando la dama ubicada en esa instancia de la entrada.
6. Añadir dama: Se coloca una dama en una posición válida de la fila actual, y luego se retorna al paso 3 para verificar si todas las damas están ubicadas en el tablero.
7. Solución: Se produce una salida que contiene la disposición de las damas en el tablero, constituyendo una solución al problema.
8. Fin: El algoritmo concluye su ejecución.

En resumen, el algoritmo de *Backtracking* aplicado al problema de las $n$-damas se basa en la exploración de las posibles soluciones mediante la colocación de damas en el tablero de forma iterativa. Si en algún momento no es posible colocar una dama en la fila actual, el algoritmo retrocede hasta la última bifurcación y prueba con una disposición diferente. Este proceso se repite hasta encontrar una solución en la que todas las damas estén colocadas en el tablero sin atacarse entre sí.

### Complejidad algorítmica

El objetivo de este capítulo es utilizar el algoritmo que hemos discutido previamente como un pretexto para introducir el concepto de complejidad algorítmica. La complejidad algorítmica surge como una herramienta para medir y comparar la eficiencia de diferentes algoritmos de una manera que no dependa de un hardware de computadora específico. Para establecer esta medida independiente del hardware, recurrimos a una máquina teórica: la Máquina de Turing.

Antes de seguir adelante, proporcionaremos una definición de la Máquina de Turing. Tenga en cuenta que, dado el objetivo divulgativo de este libro, no se busca la rigurosidad de una definición matemática.

La Máquina de Turing, concebida por Alan Turing, consta de una cinta infinita en ambas direcciones. Esta cinta es analizada por una "cabeza" de lectura y escritura que puede moverse a la izquierda o a la derecha. Esta cabeza es capaz de leer y escribir diversos símbolos en la cinta. La máquina tiene un conjunto de estados que, dependiendo del símbolo leído, le indican qué acción debe realizar.

<figure id="fig-maquina-de-turing">
  <img src="/assets/book/n-queens/turing.png" alt="Máquina de Turing" loading="lazy" />
  <figcaption>Máquina de Turing</figcaption>
</figure>

Podemos ofrecer una definición más formal de la Máquina de Turing a través de la siguiente tupla:

$$
MT = \{ \sum,Q,q_0,F,\delta \}
$$

Esta tupla consta de cinco elementos: el alfabeto, el conjunto de estados, el estado inicial, los estados finales y la función de transición, respectivamente.

$\sum$ o alfabeto: Representa el conjunto de símbolos que pueden ser utilizados en una Máquina de Turing específica. Esto incluye el símbolo de espacio en blanco, comúnmente representado por ".". 
 
 $Q$ o conjunto de estados: Son los estados que la máquina puede adoptar. Estos estados, en conjunto con los símbolos, determinan las acciones que la cabeza debe realizar. 
 
 $q_0$ o estado inicial: Es el estado en el que comienza la Máquina de Turing. Es único. 
 
 $F$ o estados finales: Son los estados que, cuando se alcanzan, permiten a la máquina finalizar su proceso. Puede haber varios. 
 
 $\delta$ o función de transición: Es una función que, dada una entrada que consta del estado actual y el símbolo leído por la cabeza, devuelve el próximo estado al que debe pasar la máquina, el símbolo que debe escribir la cabeza en su posición actual y la dirección hacia la cual debe moverse la cabeza.

Aunque la Máquina de Turing es una herramienta valiosa para entender la teoría de la computación, su naturaleza abstracta significa que rara vez se usa en la práctica para determinar la complejidad de un algoritmo.

Dicho esto, la Máquina de Turing posee un poder computacional impresionante y es capaz de resolver una vasta cantidad de problemas. Sin embargo, existen ciertos problemas que están más allá de sus capacidades, a menudo asociados con el llamado problema de la parada. Estos problemas son intrínsecamente irresolubles, no solo para la Máquina de Turing, sino para cualquier ordenador moderno, dado que todas las computadoras se basan en la estructura de la Máquina de Turing.<span class="footnote" role="note">Para más información sobre este aspecto de la computación: <cite><a href="/es/references#cite-6nosons-yanofsky2016" data-cite="6nosons.yanofsky2016">[Noson S. Yanofsky, 2016]</a></cite></span>

En la práctica, para calcular la complejidad de un algoritmo, utilizamos una serie de principios y métodos bien establecidos. Comenzamos definiendo una función que represente la complejidad aproximada del algoritmo. Esta función toma como valor una variable que representa algún aspecto clave de la entrada del algoritmo.

Por ejemplo, en el problema de las $n$-reinas, esta variable representativa es $n$, que indica el tamaño del tablero. En una versión del problema en la que ya se han colocado algunas reinas, sería más apropiado usar $n$ menos el número de reinas colocadas; por lo tanto, la variable más adecuada en este caso sería el número de reinas que quedan por colocar. Si el algoritmo debe operar sobre una lista o un vector, esta variable representativa suele ser el tamaño de estos.

Para determinar el valor de salida de la función de complejidad, debemos analizar cuántas veces se ejecuta una operación representativa dada en función de la variable elegida. En el caso del problema de las $n$-reinas, la operación representativa sería el número de veces que se coloca una reina en el tablero, que en un nivel más bajo se traduce en una asignación en la lista de columnas.

En la mayoría de los casos, resulta imposible determinar con precisión el número exacto de veces que se ejecutará una operación en concreto. En tales casos, es útil considerar el peor escenario posible. De este modo, podemos obtener una cota superior para la complejidad, lo que significa que, para una entrada determinada, el algoritmo no tomará más tiempo que el tiempo correspondiente al peor de los casos.

Aun así, a menudo será imposible encontrar una medida exacta de la complejidad. Sin embargo, lo que nos interesa no es tanto la exactitud de la medida, sino la forma en que el número de operaciones crece en función de la variable representativa de la entrada. Este crecimiento se agrupa en diferentes categorías o "familias" de funciones, de acuerdo con su tasa de crecimiento. A este concepto se le conoce como notación *big*-$O$.

Las familias más comunes, ordenadas de la mejor a la peor en términos de crecimiento, son las siguientes (usaremos $n$ para representar la variable representativa):

$O(1)$: Independientemente del valor de $n$, el tiempo de ejecución del algoritmo permanece constante. Este es el tipo de complejidad que se asocia con las operaciones básicas (sumas, restas, multiplicaciones, etc.) que puede realizar una computadora, como sumar dos números o realizar asignaciones.

$O(\log n)$: Esta es una tasa de crecimiento muy favorable, ya que es inversamente proporcional al crecimiento exponencial. Ejemplos de algoritmos que presentan este tipo de crecimiento son la búsqueda binaria y la búsqueda en un árbol binario de búsqueda.

$O(n)$: En este caso, el tiempo de ejecución del algoritmo crece linealmente con $n$. Aunque es más lento que $O(\log n)$, sigue siendo aceptable para la mayoría de las aplicaciones. Ejemplos de este tipo de crecimiento son la búsqueda de un elemento en una lista o vector no ordenado y la elevación de un número a una potencia.

$O(n \log n)$: Este tipo de crecimiento es ligeramente más rápido que $O(n)$, y es común en los algoritmos relacionados con la ordenación de elementos. Ejemplos de algoritmos con este tipo de crecimiento son Heapsort y Quicksort (en el caso promedio).

$O(n^a)$ donde $a > 1$: Este tipo de crecimiento incluye todos los algoritmos cuyo tiempo de ejecución crece como un polinomio de $n$, con excepción de los casos lineales ya mencionados. Aunque el valor de $a$ puede ser alto, este tipo de crecimiento sigue siendo preferible a los tipos de crecimiento que mencionaremos a continuación. Ejemplos de este tipo de crecimiento son la multiplicación de matrices $O(n^3)$ y los algoritmos que utilizan dos bucles anidados $O(n^2)$.

$O(a^n)$ donde $a > 1$: Este es el inicio de los algoritmos con tiempo de ejecución no polinómico, y son la pesadilla de cualquier programador. Aunque $n$ sea pequeño, la computación requerida para resolver el problema puede ser inmensa. Ejemplos de problemas con este tipo de crecimiento son la satisfacibilidad booleana y la partición de un conjunto en dos subconjuntos de igual suma.

$O(n!)$, $O(n^n)$: Estos son los casos de crecimiento más rápido y se encuentran entre los más difíciles de manejar. Cuando $n$ es un número grande, tanto $n!$ como $n^n$ crecen más rápido que cualquier exponencial, sin importar el valor de $a$ en la exponencial. Ejemplos de problemas con este tipo de crecimiento son el problema de las $n$-reinas y el problema del viajero.

Una vez definidas las familias, podemos usar unas reglas prácticas y simples para calcular la complejidad de un problema específico. En primer lugar, definimos las operaciones básicas, que son las diferentes operaciones aritméticas, lógicas, asignaciones y similares. Todas estas operaciones tienen una complejidad $O(1)$, es decir, son constantes, y constituyen los bloques de construcción más básicos de cualquier algoritmo.

La complejidad lineal aparece cuando se ejecutan una o varias de las operaciones básicas definidas anteriormente en un bucle que itera un número de veces que crece linealmente con $n$. Por ejemplo, si se asigna el valor 1 a todos los elementos de una lista de tamaño $n$, la complejidad será $O(n)$. Para alcanzar una complejidad de $O(n^2)$, necesitas tener una estructura de bucle anidado en la que ambos bucles estén iterando proporcionalmente a $n$. Un ejemplo común de esto es cuando se recorren todos los pares de elementos en una lista. En general, si tienes $a$ bucles anidados que iteran proporcionalmente a $n$, obtendrás una complejidad de $O(n^a)$.

Por otro lado, la complejidad $O(\log n)$ a menudo se logra mediante un enfoque de "divide y vencerás", en el que el problema se divide en mitades sucesivas hasta llegar a un caso base. La búsqueda binaria es un ejemplo común de esto.

Para las complejidades exponenciales $O(a^n)$, a menudo surgen en algoritmos que exploran todas las posibles combinaciones o permutaciones de un conjunto. El problema del viajante de comercio es un ejemplo notorio.

Finalmente, el cálculo de la complejidad de un algoritmo puede implicar sumar las complejidades de las diferentes partes del algoritmo. Sin embargo, cuando se suman complejidades, solo la de crecimiento más rápido es relevante. Por ejemplo, si una parte de tu algoritmo tiene una complejidad de $O(n^2)$ y otra parte tiene una complejidad de $O(n)$, la complejidad total será $O(n^2)$, ya que $n^2$ crece más rápido que $n$. Este principio se aplica a todas las formas de combinar complejidades.

Es importante recordar que estas son reglas generales y que puede haber casos en los que estas reglas no se apliquen exactamente. Sin embargo, son una buena guía para entender cómo escala un algoritmo a medida que el tamaño de la entrada aumenta. Una vez conocidos estos conceptos podemos comenzar a analizar la complejidad de las $n$-damas.

En la exploración del problema de las $n$-damas, hemos considerado diversas estrategias para su solución, basándonos en diferentes representaciones del estado. De igual forma, analizaremos la complejidad de estas soluciones siguiendo el mismo criterio.

Consideremos un tablero de 4x4 en el que necesitamos ubicar 4 damas. Si generamos todas las combinaciones posibles sin importar el orden, el cálculo sería el siguiente:

$$
\frac{16!}{4!(16-4)!} = \frac{16 \times 15 \times 14 \times 13}{4!} = 1820
$$

Para llegar a este resultado, razonamos de la siguiente manera: hay 16 casillas disponibles para la primera dama, 15 para la segunda, 14 para la tercera y 13 para la última. Como el orden no importa, debemos dividir entre $4!$, según los principios de combinatoria. Este resultado se puede generalizar para un tablero de n x n con la siguiente fórmula:

$$
\alpha(n) = \frac{(n^2)!}{n!(n^2-n)!} = \frac{n^2*(n^2-1)* ... * (n^2-n+1)}{n!}
$$

Así, $\alpha(n)$ indica el número de formas de situar $n$ damas en un tablero de n x n.

En secciones anteriores, se discutieron representaciones más eficientes de una solución en lugar de simplemente usar coordenadas. Por ejemplo, podríamos asignar un número entre $1$ y $n$ (ambos inclusive) a cada columna, lo cual representa la fila en la que se sitúa la dama de dicha columna. Esta representación reduciría significativamente el número de opciones posibles.

Para un tablero de 4x4 en el que debemos colocar 4 damas, cada columna ofrece cuatro opciones, lo cual se repite cuatro veces. Este número es considerablemente alto para un tablero de 4x4. La fórmula general en este caso sería simplemente:

$$
\alpha(n) = n^n
$$

Estos dos métodos presentan algunas de las peores complejidades que hemos analizado hasta ahora.

Si recordamos, se puede optimizar la búsqueda descartando algunas posibles soluciones a medida que se generan. Por ejemplo, es evidente que cualquier configuración que coloque dos damas en la misma fila no es una solución válida, por lo que podemos descartarla inmediatamente y evitar gastar recursos innecesarios. Sin embargo, calcular la complejidad en este caso es un desafío, ya que necesitamos una aproximación; sería imposible encontrar una fórmula que proporcione la complejidad exacta para cualquier $n$.

Podemos ir descartando las filas en las que ya hemos colocado una dama, reduciendo en cada paso el número de filas a comprobar en la columna siguiente. Para las diagonales, la situación es más complicada. En el peor de los casos, podemos descartar una casilla en la columna siguiente, pero es posible que no podamos descartar ninguna en las columnas posteriores. En el peor de los casos, por tanto, la fórmula para este método sería simplemente el factorial de $n$. En la primera columna, hay $n$ opciones; en la segunda, $n-1$; y así sucesivamente. La fórmula por tanto sería el famoso factorial.

$$
\beta(n) = n!
$$

Este es el rendimiento estándar del algoritmo de *backtracking* para las $n$-damas. Se pueden mejorar aún más los resultados utilizando heurísticas o representaciones más eficientes de las diagonales, pero esto está fuera del alcance de este libro.

En conclusión, tras haber analizado la complejidad del problema de las $n$-damas, podemos afirmar que aún no se ha encontrado ningún algoritmo capaz de resolverlo en un tiempo razonable para valores grandes de $n$. Es decir, no se ha descubierto ningún algoritmo polinómico determinista que lo resuelva. Por tanto, se clasifica como un problema NP-difícil.

En general, los problemas pueden dividirse en dos tipos según su dificultad: fáciles, si pueden resolverse en tiempo polinómico determinista; o difíciles, si no se puede encontrar un algoritmo polinómico determinista que los resuelva. La gran pregunta sin resolver es si ambos conjuntos son idénticos y, por tanto, existe un algoritmo polinómico determinista para resolver cualquier problema computable. Esa es justamente la cuestión

### El asombroso crecimiento exponencial

El crecimiento exponencial a menudo se retrata como una fuerza devastadora e incontrolable. ¿Pero es realmente así de malo? Para apreciar la velocidad vertiginosa con la que puede crecer una función exponencial, recurramos a la antigua leyenda del origen del ajedrez.

Según la narración, un monarca de un lejano reino, abrumado por el tedio, convocó un concurso en el que sus súbditos podrían presentar un juego para su entretenimiento. El creador del juego que más deleitara al rey recibiría cualquier recompensa que deseara. Entre las numerosas propuestas, una destacó por encima del resto: el ajedrez. El inventor del juego, un hombre de humilde condición, pidió al rey que colocase un grano de arroz en la primera casilla del tablero de ajedrez, dos granos en la segunda, cuatro en la tercera, y así sucesivamente, hasta llegar a la sexagésimo cuarta casilla.

El rey, inicialmente, se rió de la modesta solicitud, pero cuando sus consejeros calcularon la cantidad de arroz necesaria, se quedaron atónitos. No había suficiente arroz en todo el reino, ni siquiera en varias generaciones, para cumplir con la petición del inventor. Cuando el rey comprendió la magnitud de la solicitud, no pudo más que admirar la astucia del humilde creador del ajedrez.

Después de escuchar esta historia, es natural preguntarse cuántos granos de arroz se requerirían. Para responder a esta pregunta, primero consideramos cuántos granos hay en cada casilla. En la primera casilla hay un grano, es decir, $2^0$, en la segunda hay dos granos o $2^1$ y en la tercera hay $2^2$ o cuatro granos. Continuando con este patrón, la cantidad total de granos se puede calcular matemáticamente utilizando un sumatorio (permite sumar una serie de números que siguen un patrón):

$$
\sum_{k=0}^{63}{2^k} = 2^{64} - 1 = 18446744073709551615 \textrm{ granos}
$$

La fórmula de la izquierda suma todos los granos de cada casilla, la del centro emplea un "truco" para simplificar la suma con exponenciales, y en la parte derecha se muestra el número total de granos necesarios. La cifra es asombrosa. Para ponerla en perspectiva, la producción mundial actual de arroz es de aproximadamente 743 millones de toneladas, y cada tonelada puede contener unos 50 millones de granos. Por lo tanto, la producción mundial total sería de unos 37150 billones de granos.

Comparando esta cifra con el número de granos requeridos para el tablero de ajedrez, se necesitarían casi 500 años de producción para cubrir la demanda, como se muestra en el siguiente cálculo:

$$
\frac{18446744073709551615}{37150 * 10^{12}} = 496,55 \textrm{ años}
$$

Así, como se puede observar, el crecimiento exponencial es verdaderamente rápido y puede llegar a ser abrumador, tal como se ha expuesto en las secciones previas de este capítulo. Por tanto, es crucial no subestimar su impacto.

### El enigma de ¿P=NP?

El problema ¿P=NP? busca determinar si el conjunto P, referente a los algoritmos que pueden resolverse en tiempo polinomial determinista, es equivalente al conjunto NP, que comprende los algoritmos resueltos en tiempo polinómico no determinista. Una observación importante a tener en cuenta es que P es un subconjunto de NP, ya que los algoritmos deterministas están incluidos en la categoría no determinista. Es decir, un algoritmo P también será NP, pero un algoritmo NP no necesariamente pertenecerá a P. Dentro de NP existe un subconjunto denominado problemas NP-completos para los que, hasta la fecha, no se ha encontrado un algoritmo que pertenezca a P. La búsqueda de una solución al problema ¿P=NP? se centra en demostrar que existe un algoritmo P para estos problemas.

Desde un punto de vista teórico basado en la Máquina de Turing, se puede definir el problema de la siguiente manera:

"P=NP si existe una Máquina de Turing determinista con una cota superior polinómica temporal que pueda transformar una Máquina de Turing no determinista con cota superior temporal polinómica en una Máquina de Turing determinista con la misma cota superior."

Este enunciado puede resultar complejo al principio. En el caso de las máquinas de Turing no deterministas, un estado particular y la lectura de un símbolo pueden desencadenar una o más acciones en lugar de una sola, como sucede con las máquinas deterministas. Esta característica, aplicada a los ordenadores, implica que deben ejecutarse diferentes acciones, sin saber cuál de ellas llevará a la solución, provocando la temida complejidad exponencial.

En resumen, resolver el problema P=NP consistiría en encontrar un algoritmo polinómico determinista que pueda transformar cualquier algoritmo polinómico no determinista en uno polinómico, o demostrar que tal algoritmo no existe. Cualquiera de estas soluciones le concedería al descubridor un premio de un millón de dólares.

Para simplificar, se ha demostrado que existe un problema no polinómico, la satisfacibilidad booleana, al que se puede convertir cualquier algoritmo polinómico. Este problema consiste en determinar si, dada una expresión lógica, existe una entrada que haga que la fórmula sea verdadera. La demostración de este hecho excede el alcance de este libro, pero una intuición de por qué esto podría ser así está relacionada con el hecho de que los ordenadores son, en última instancia, una serie de puertas lógicas. Este fue el primer problema descubierto de los denominados problemas NP-completos, a los que se pueden convertir todos los demás problemas NP mediante un algoritmo polinómico.

Los problemas NP-completos son bastante comunes en la vida cotidiana, y muchos de ellos están relacionados con los grafos, que se discutirán en el próximo apartado. También se encuentran frecuentemente en problemas de optimización, entre otros.

Es importante mencionar que, en la práctica, se suelen utilizar algoritmos aproximados para resolver estos tipos de problemas, con el objetivo de eludir la complejidad exponencial. Estos algoritmos permiten encontrar una solución que, aunque no sea la óptima, puede ser válida según los criterios definidos. En otras palabras, si se utiliza un algoritmo exponencial para entradas pequeñas, podría ser posible encontrar la mejor solución. Sin embargo, en el caso de entradas muy grandes, se recurrirá a un algoritmo aproximado, que en ocasiones no proporcionará la mejor respuesta.
