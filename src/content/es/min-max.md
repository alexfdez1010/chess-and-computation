---
title: "El algoritmo minimax"
description: "El funcionamiento del algoritmo minimax es intrínsecamente anclado a su denominación. Este algoritmo se utiliza para identificar la jugada óptima teóricamente, en cualquier juego de información perfecta."
chapter: "Inteligencia artificial"
part: "book"
order: 8
bookChapter: "2"
bookChapterTitle: "Inteligencia artificial"
sectionNumber: "2.5"
sectionTitle: "El algoritmo minimax"
navDepth: 2
pairedSlug: "min-max"
source: "es/min-max.tex"
draft: false
---

### Introducción

El funcionamiento del algoritmo minimax es intrínsecamente anclado a su denominación. Este algoritmo se utiliza para identificar la jugada óptima teóricamente, en cualquier juego de información perfecta -- donde todos los jugadores tienen un conocimiento completo y compartido del estado del juego -- y de suma cero -- donde las ganancias de un jugador se equilibran con las pérdidas del otro(s). Este algoritmo presupone que tanto el jugador que lo utiliza como el oponente harán movimientos óptimos. Aquí es donde el nombre del algoritmo toma relevancia: el jugador seleccionará el movimiento que maximice su beneficio, mientras que el oponente escogerá el movimiento que minimice el beneficio del jugador.

Estos procesos de maximización y minimización se desarrollan en todos los niveles del árbol de juego, que fue desglosado en una sección previa. Cada estado del árbol se clasifica por su nivel, que se define como el número de transiciones requeridas para llegar a ese estado desde el estado inicial o raíz. Por tanto, la raíz se identifica como nivel 0, los estados directamente vinculados a ella como nivel 1, y así sucesivamente.

En los niveles pares del árbol de juego, el jugador maximiza su ventaja eligiendo el movimiento más beneficioso, mientras que en los niveles impares, la minimización entra en juego cuando el oponente intenta seleccionar el movimiento que proporcione menos beneficio al jugador.

Un último aspecto a explicar es cómo se determina la valoración de cada estado. Idealmente, se podría explorar cada rama del árbol hasta llegar a un estado final, y de esta forma, conocer la verdadera valoración de cada estado. Sin embargo, en la práctica, esta exploración exhaustiva es inviable, por lo que recurrimos a las heurísticas. En un nivel de profundidad predeterminado, se detiene el desarrollo del árbol de juego y se evalúan los estados finales de cada rama con la heurística. A partir de estas valoraciones, se calculan las valoraciones de los estados restantes en un proceso de abajo hacia arriba, hasta llegar al estado inicial o raíz del árbol de juego. Evidentemente, para este proceso se emplea el algoritmo minimax.

El concepto del algoritmo minimax puede ser un tanto abstracto a primera vista, por lo que se proporciona un ejemplo paso a paso de su aplicación en la sección a continuación.

El primer paso es calcular los valores de los estados finales del árbol de juego generado (en este caso, los estados al final de cada rama), empleando la heurística. Este proceso se representa en la Figura [referencia](#fig-primer-paso-del-algoritmo-minimax-generico).

<figure id="fig-primer-paso-del-algoritmo-minimax-generico">
  <img src="/assets/book/min-max/step1.png" alt="Primer paso del algoritmo Minimax genérico" loading="lazy" />
  <figcaption>Primer paso del algoritmo Minimax genérico</figcaption>
</figure>

En el árbol de decisión, aquellos valores que ya han sido determinados se ilustran utilizando su valor numérico correspondiente. Por otro lado, los nodos cuyos valores aún no han sido calculados se representarán como Max o Min, esto dependerá de si su valor será el máximo o mínimo de sus nodos hijos respectivamente. Es importante destacar que los nodos cuyos valores ya han sido calculados no poseen nodos hijos, es decir, no están vinculados a ningún nodo en un nivel inferior. En la terminología del árbol de decisiones, a estos nodos se les llama nodos hoja, haciendo una analogía con las hojas de un árbol en el mundo natural.

Una vez que se han calculado las heurísticas de estos estados finales, podemos proceder a determinar la heurística del nivel inmediatamente adyacente. Para ello, debemos tomar el valor mínimo de los estados en el nivel inferior, lo cual corresponde a la fase de minimización. Por ejemplo, en el nodo ubicado a la izquierda del nivel 1, se tomará $\min(1,45;0,2)$, aquí, el uso del punto y coma es para evitar confusiones con la coma que se utiliza para separar cifras decimales y enteras, y se obtendrá como resultado 0,2, ya que este valor es menor que 1,45. Siguiendo este proceso, en el estado central del nivel 1, seleccionamos $\min(0,25;0,34)$ y obtenemos 0,25, ya que es menor que 0,34. Finalmente, el nodo ubicado a la derecha en el nivel 1, al ser un estado final, ya tiene un valor calculado, por lo que se ignora temporalmente. En la Figura [referencia](#fig-segundo-paso-del-algoritmo-minimax-generico), se ilustra el resultado de este proceso.

<figure id="fig-segundo-paso-del-algoritmo-minimax-generico">
  <img src="/assets/book/min-max/step2.png" alt="Segundo paso del algoritmo Minimax genérico" loading="lazy" />
  <figcaption>Segundo paso del algoritmo Minimax genérico</figcaption>
</figure>

Ahora, debemos llevar a cabo una fase de maximización. Es decir, necesitamos obtener el valor máximo de los estados adyacentes inferiores al estado situado en el nivel cero o estado inicial. Así, aplicamos $\max(0,2;0,25;2,32)$, obteniendo como resultado 2,32, ya que este valor es mayor que 0,2 y 0,25. Dado que este es el estado inicial, se ha completado el algoritmo Minimax. Por tanto, podemos determinar que la mejor transición es la que lleva al estado con el valor 2,32. En la Figura [referencia](#fig-tercer-paso-del-algoritmo-minimax-generico), se muestra el árbol de juego finalizado.

<figure id="fig-tercer-paso-del-algoritmo-minimax-generico">
  <img src="/assets/book/min-max/step3.png" alt="Tercer paso del algoritmo Minimax genérico" loading="lazy" />
  <figcaption>Tercer paso del algoritmo Minimax genérico</figcaption>
</figure>

Es relevante mencionar que no todos los estados finales se encuentran en el mismo nivel de profundidad. En el ejemplo anterior, el estado final con valor 2,32 está en el nivel 1, en lugar de estar en el nivel 2, como los demás. Esto puede suceder si el estado con valor 2,32 representa un estado final en el árbol de juego completo (es decir, no se puede expandir más desde allí) o bien, se ha decidido no expandir más ese nodo. Esta última técnica es comúnmente utilizada, ya que mediante una heurística adicional (la cual determina cuán beneficioso es expandir un estado) se puede decidir si es valioso continuar expandiendo ese estado o finalizar la ramificación en ese punto.

Después de revisar este ejemplo general y sencillo, podemos avanzar a un ejemplo más complejo y realista en el que se aplique el algoritmo minimax a un juego de ajedrez.

### Algoritmo minimax aplicado al ajedrez

#### Consideraciones especiales

El ajedrez, como caso específico de la aplicación del algoritmo minimax, posee algunas particularidades. Lo más relevante es que el tamaño del árbol de juego del ajedrez es inmensamente grande, un hecho que se ha enfatizado repetidamente. Esto nos motiva a buscar formas de reducir el número de estados que se añaden al árbol de juego simulado que utiliza el algoritmo minimax. Una estrategia que ya se ha mencionado consiste en usar una heurística que permita evaluar cuán "interesante" es un estado para decidir explorarlo. Este concepto de "interesante" ayuda a establecer una prioridad en la expansión de los estados, ya que es probable que no tengamos tiempo de explorar todos hasta su conclusión. Al definir esta heurística, deberíamos considerar factores como el nivel del estado en relación al estado inicial, el valor de la heurística que indica la calidad de una posición, entre otros.

Finalmente, cabe destacar que la expansión de este árbol de juego estará limitada principalmente por el tiempo disponible. Por ejemplo, en una partida con tiempo limitado, la computadora deberá devolver la mejor jugada que haya podido encontrar en el breve tiempo que tiene. Por el contrario, si la partida permite un tiempo de juego más extenso, la computadora tendrá más tiempo para encontrar la mejor jugada, lo que probablemente resultará en una mejor solución en la misma posición que en el caso anterior, dado que ha podido expandir más el árbol de juego.

#### Ejemplo aplicado al ajedrez

Se presenta el árbol de juego ilustrado en la Figura [referencia](#fig-arbol-de-juego-del-ejemplo-de-minimax-aplicado-al-ajedrez), que representa la secuencia de movimientos en el ejemplo de aplicación del algoritmo minimax al juego de ajedrez. La posición inicial corresponde al comienzo de una partida de ajedrez estándar, donde las blancas realizan la jugada d4, seguida por la respuesta de las negras con d5. A partir de esta posición, las blancas deben tomar la decisión de determinar cuál movimiento es el mejor.

<figure id="fig-arbol-de-juego-del-ejemplo-de-minimax-aplicado-al-ajedrez">
  <img src="/assets/book/min-max/example1-es.png" alt="Árbol de juego del ejemplo de minimax aplicado al ajedrez" loading="lazy" />
  <figcaption>Árbol de juego del ejemplo de minimax aplicado al ajedrez</figcaption>
</figure>

Cada nodo del árbol representa una posición del tablero y las diferentes ramas indican los posibles movimientos que se pueden realizar desde esa posición. La Figura [referencia](#fig-tableros-representados-en-el-ejemplo-de-minimax-aplicado-al-ajedrez) muestra los tableros correspondientes a cada posición representada en el ejemplo de aplicación del algoritmo minimax al ajedrez.

<figure id="fig-tableros-representados-en-el-ejemplo-de-minimax-aplicado-al-ajedrez">
  <div class="subfigure-grid" role="group" aria-label="Tableros representados en el ejemplo de minimax aplicado al ajedrez">
    <figure class="subfigure" id="p01" data-width="0.30\textwidth" style="--subfigure-width:30%">
      <div class="chessboard" data-fen="rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2" data-size="8" data-chess-options="&quot;maxfield=h8, showmover=false, setfen=rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2, tinyboard&quot;" role="img" aria-label="P01" data-rendered="source" data-board-asset="board-8x8-0c6a5168df5b5102.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-0c6a5168df5b5102.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
      <figcaption>P01</figcaption>
    </figure>
    <figure class="subfigure" id="p02" data-width="0.30\textwidth" style="--subfigure-width:30%">
      <div class="chessboard" data-fen="rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2" data-size="8" data-chess-options="&quot;maxfield=h8, showmover=false, setfen=rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2, tinyboard&quot;" role="img" aria-label="P02" data-rendered="source" data-board-asset="board-8x8-85e1d0f71d62f3c1.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-85e1d0f71d62f3c1.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
      <figcaption>P02</figcaption>
    </figure>
    <figure class="subfigure" id="p03" data-width="0.30\textwidth" style="--subfigure-width:30%">
      <div class="chessboard" data-fen="rnbqkbnr/ppp1pppp/8/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R b KQkq - 1 2" data-size="8" data-chess-options="&quot;maxfield=h8, showmover=false, setfen=rnbqkbnr/ppp1pppp/8/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R b KQkq - 1 2, tinyboard&quot;" role="img" aria-label="P03" data-rendered="source" data-board-asset="board-8x8-e3de74b4a0ab74b2.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-e3de74b4a0ab74b2.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
      <figcaption>P03</figcaption>
    </figure>
    <figure class="subfigure" id="p04" data-width="0.30\textwidth" style="--subfigure-width:30%">
      <div class="chessboard" data-fen="rnbqkbnr/ppp1pppp/8/3p4/3P1B2/8/PPP1PPPP/RN1QKBNR b KQkq - 1 2" data-size="8" data-chess-options="&quot;maxfield=h8, showmover=false, setfen=rnbqkbnr/ppp1pppp/8/3p4/3P1B2/8/PPP1PPPP/RN1QKBNR b KQkq - 1 2, tinyboard&quot;" role="img" aria-label="P04" data-rendered="source" data-board-asset="board-8x8-8138e5d26d35d0d6.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-8138e5d26d35d0d6.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
      <figcaption>P04</figcaption>
    </figure>
    <figure class="subfigure" id="p05" data-width="0.30\textwidth" style="--subfigure-width:30%">
      <div class="chessboard" data-fen="rnbqkbnr/pp2pppp/2p5/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3" data-size="8" data-chess-options="&quot;maxfield=h8, showmover=false, setfen=rnbqkbnr/pp2pppp/2p5/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3, tinyboard&quot;" role="img" aria-label="P05" data-rendered="source" data-board-asset="board-8x8-f129c40e13c3b6aa.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-f129c40e13c3b6aa.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
      <figcaption>P05</figcaption>
    </figure>
    <figure class="subfigure" id="p06" data-width="0.30\textwidth" style="--subfigure-width:30%">
      <div class="chessboard" data-fen="rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3" data-size="8" data-chess-options="&quot;maxfield=h8, showmover=false, setfen=rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3, tinyboard&quot;" role="img" aria-label="P06" data-rendered="source" data-board-asset="board-8x8-87ce9a1e0e34290d.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-87ce9a1e0e34290d.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
      <figcaption>P06</figcaption>
    </figure>
    <figure class="subfigure" id="p07" data-width="0.30\textwidth" style="--subfigure-width:30%">
      <div class="chessboard" data-fen="rn1qkbnr/ppp1pppp/8/3p4/3P2b1/5N2/PPP1PPPP/RNBQKB1R w KQkq - 2 3" data-size="8" data-chess-options="&quot;maxfield=h8, showmover=false, setfen=rn1qkbnr/ppp1pppp/8/3p4/3P2b1/5N2/PPP1PPPP/RNBQKB1R w KQkq - 2 3, tinyboard&quot;" role="img" aria-label="P07" data-rendered="source" data-board-asset="board-8x8-62f6356013199498.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-62f6356013199498.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
      <figcaption>P07</figcaption>
    </figure>
    <figure class="subfigure" id="p08" data-width="0.30\textwidth" style="--subfigure-width:30%">
      <div class="chessboard" data-fen="rn1qkbnr/ppp1pppp/8/3p1b2/3P1B2/8/PPP1PPPP/RN1QKBNR w KQkq - 2 3" data-size="8" data-chess-options="&quot;maxfield=h8, showmover=false, setfen=rn1qkbnr/ppp1pppp/8/3p1b2/3P1B2/8/PPP1PPPP/RN1QKBNR w KQkq - 2 3, tinyboard&quot;" role="img" aria-label="P08" data-rendered="source" data-board-asset="board-8x8-c89b684cf768b029.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-c89b684cf768b029.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
      <figcaption>P08</figcaption>
    </figure>
    <figure class="subfigure" id="p09" data-width="0.30\textwidth" style="--subfigure-width:30%">
      <div class="chessboard" data-fen="rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/8/PPP1PPPP/RN1QKBNR w KQkq - 2 3" data-size="8" data-chess-options="&quot;maxfield=h8, showmover=false, setfen=rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/8/PPP1PPPP/RN1QKBNR w KQkq - 2 3, tinyboard&quot;" role="img" aria-label="P09" data-rendered="source" data-board-asset="board-8x8-7946cecc0165df8e.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-7946cecc0165df8e.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
      <figcaption>P09</figcaption>
    </figure>
    <figure class="subfigure" id="p10" data-width="0.30\textwidth" style="--subfigure-width:30%">
      <div class="chessboard" data-fen="rnbqkbnr/pp2pppp/2p5/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR b KQkq - 1 3" data-size="8" data-chess-options="&quot;maxfield=h8, showmover=false, setfen=rnbqkbnr/pp2pppp/2p5/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR b KQkq - 1 3, tinyboard&quot;" role="img" aria-label="P10" data-rendered="source" data-board-asset="board-8x8-ece839beb8b0082b.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-ece839beb8b0082b.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
      <figcaption>P10</figcaption>
    </figure>
    <figure class="subfigure" id="p11" data-width="0.30\textwidth" style="--subfigure-width:30%">
      <div class="chessboard" data-fen="rnbqkbnr/pp2pppp/2p5/3p4/2PP4/5N2/PP2PPPP/RNBQKB1R b KQkq - 1 3" data-size="8" data-chess-options="&quot;maxfield=h8, showmover=false, setfen=rnbqkbnr/pp2pppp/2p5/3p4/2PP4/5N2/PP2PPPP/RNBQKB1R b KQkq - 1 3, tinyboard&quot;" role="img" aria-label="P11" data-rendered="source" data-board-asset="board-8x8-09373bf1bc94e144.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-09373bf1bc94e144.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
      <figcaption>P11</figcaption>
    </figure>
    <figure class="subfigure" id="p12" data-width="0.30\textwidth" style="--subfigure-width:30%">
      <div class="chessboard" data-fen="rnbqkbnr/ppp2ppp/4p3/3P4/3P4/8/PP2PPPP/RNBQKBNR b KQkq - 0 3" data-size="8" data-chess-options="&quot;maxfield=h8, showmover=false, setfen=rnbqkbnr/ppp2ppp/4p3/3P4/3P4/8/PP2PPPP/RNBQKBNR b KQkq - 0 3, tinyboard&quot;" role="img" aria-label="P12" data-rendered="source" data-board-asset="board-8x8-09205c3fafefcee8.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-09205c3fafefcee8.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
      <figcaption>P12</figcaption>
    </figure>
  </div>
  <figcaption>Tableros representados en el ejemplo de minimax aplicado al ajedrez</figcaption>
</figure>

Una vez que se ha obtenido el árbol de juego y las posiciones correspondientes, se puede proceder a la siguiente fase del algoritmo Minimax, que consiste en calcular el valor de las posiciones terminales. Estas posiciones se refieren a aquellas que no tienen ramas saliendo de ellas, es decir, no se pueden realizar más movimientos a partir de ellas.

Al calcular la heurística de estas posiciones terminales, se obtendrá una aproximación realista del valor de cada posición. El resultado de este cálculo dará lugar a una nueva representación del árbol de juego, como se muestra en la Figura [referencia](#fig-primera-fase-del-ejemplo-de-minimax-aplicado-al-ajedrez).

<figure id="fig-primera-fase-del-ejemplo-de-minimax-aplicado-al-ajedrez">
  <img src="/assets/book/min-max/example2.png" alt="Primera fase del ejemplo de minimax aplicado al ajedrez" loading="lazy" />
  <figcaption>Primera fase del ejemplo de minimax aplicado al ajedrez</figcaption>
</figure>

Al examinar el árbol de juego, se puede notar que no todos los estados se encuentran en el mismo nivel. Por ejemplo, el estado P10 está en el mismo nivel que P11 y P12, es decir, en el nivel 3. Sin embargo, P07, P08 y P09 se sitúan en el nivel 2. Esta disparidad en los niveles implica que será necesario encontrar tanto el máximo como el mínimo de esos niveles respectivamente.

En términos prácticos, esto significa que, en el proceso de evaluación y selección de movimientos, se deberá buscar el máximo valor posible en el nivel 3 (donde se encuentran P10, P11 y P12), mientras que en el nivel 2 se buscará el mínimo valor. Estas operaciones de búsqueda y selección permitirán determinar los movimientos más favorables para cada jugador, considerando tanto las posibilidades de éxito como las contramedidas que puedan adoptar los oponentes en cada nivel del árbol de juego.

<figure id="fig-segunda-fase-del-ejemplo-de-minimax-aplicado-al-ajedrez">
  <img src="/assets/book/min-max/example3.png" alt="Segunda fase del ejemplo de minimax aplicado al ajedrez" loading="lazy" />
  <figcaption>Segunda fase del ejemplo de minimax aplicado al ajedrez</figcaption>
</figure>

En la segunda fase del algoritmo, se realiza la maximización y minimización para calcular los valores de algunos estados en el nivel 2 y nivel 1, respectivamente.

En el nivel 2, el estado P05 se calcula como el máximo entre los valores de P10 y P11, lo cual resulta en un valor de 0,25. Por otro lado, el estado P06 toma el valor de P12, ya que P12 es su único descendiente en el árbol de juego.

En cuanto al proceso de minimización en el nivel 1, el estado P03 toma el valor de P07, dado que P07 es su único descendiente. Por otro lado, el estado P04 toma el mínimo valor entre P08 y P09, que es 0,20.

<figure id="fig-tercera-fase-del-ejemplo-de-minimax-aplicado-al-ajedrez">
  <img src="/assets/book/min-max/example4.png" alt="Tercera fase del ejemplo de Minimax aplicado al ajedrez" loading="lazy" />
  <figcaption>Tercera fase del ejemplo de Minimax aplicado al ajedrez</figcaption>
</figure>

En la tercera fase del algoritmo, se realiza el cálculo del valor del estado restante en el nivel 1, que es P02. En este caso, el valor de P02 se determina como el mínimo entre los valores de P05 y P06, ya que se encuentra en un nivel impar, lo que implica una fase de minimización.

Con este cálculo adicional, se han obtenido todos los valores necesarios para calcular el valor del estado original. Este estado original está representado en la Figura [referencia](#fig-cuarta-fase-del-ejemplo-de-minimax-aplicado-al-ajedrez). A partir de los valores calculados en las fases anteriores, se puede determinar el valor óptimo de este estado según el algoritmo minimax, considerando las estrategias de maximización y minimización en los niveles correspondientes del árbol de juego.

<figure id="fig-cuarta-fase-del-ejemplo-de-minimax-aplicado-al-ajedrez">
  <img src="/assets/book/min-max/example5.png" alt="Cuarta fase del ejemplo de minimax aplicado al ajedrez" loading="lazy" />
  <figcaption>Cuarta fase del ejemplo de minimax aplicado al ajedrez</figcaption>
</figure>

Finalmente, se calcula el valor del estado inicial, denominado P01. Este cálculo se realiza tomando el valor máximo entre los estados P02, P03 y P04, resultando en un valor de 0,30. Este valor indica que el estado descendiente que lo posee corresponde a la mejor jugada potencial. De esta manera, según el árbol de juego desarrollado, la transición al estado P03, o lo que es equivalente, la jugada Cf3, se identifica como la mejor opción.

Es importante recalcar que los árboles de juego generados por ordenadores pueden alcanzar un tamaño formidable, llegando incluso a contener más de un millón de estados, un número que eclipsa de manera significativa al número de estados en el ejemplo proporcionado anteriormente. Por lo tanto, se vuelve esencial explorar métodos para reducir el tamaño de este árbol. En una sección previa, se ha presentado cómo es posible dar prioridad a ciertos estados en función de su valor. Sin embargo, existe una técnica que puede disminuir de forma significativa el tamaño del árbol de juego, a veces incluso reduciéndolo a la mitad. Esta técnica se conoce como poda alfa-beta, y se puede considerar como una mejora del algoritmo Minimax. Este tema será discutido con mayor profundidad en la siguiente sección de este capítulo.
