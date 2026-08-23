---
title: "Definición formal del ajedrez"
description: "El análisis de cómo la inteligencia artificial (IA) y sus subcampos abordan el estudio del ajedrez requiere primeramente del establecimiento de un objetivo definido."
chapter: "Inteligencia artificial"
part: "book"
order: 5
bookChapter: "2"
bookChapterTitle: "Inteligencia artificial"
sectionNumber: "2.2"
sectionTitle: "Definición formal del ajedrez"
navDepth: 2
pairedSlug: "definition"
source: "es/definition.tex"
draft: false
---

El análisis de cómo la inteligencia artificial (IA) y sus subcampos abordan el estudio del ajedrez requiere primeramente del establecimiento de un objetivo definido. El fin perseguido es el desarrollo de una IA que pueda competir eficientemente en una partida de ajedrez completa, ya sea contra un oponente humano o contra otra IA.

A primera vista, este puede parecer un reto colosal. Sin embargo, se simplifica enormemente si se restringe al objetivo de determinar la mejor jugada posible en una posición específica. Este subobjetivo, en realidad, se equipara con el objetivo inicial, dado que si la IA logra discernir la mejor jugada en cualquier situación concreta, realizar óptimamente las jugadas consecutivas resulta una consecuencia directa.

La posibilidad de enfocarnos solamente en la posición actual para encontrar la mejor jugada se deriva del hecho de que, para esta tarea, no es necesaria la información sobre las posiciones previas o eventos ocurridos anteriormente en la partida. Aunque esta observación puede parecer obvia, su relevancia no debe ser subestimada, ya que nos permite categorizar el ajedrez como un proceso de decisión de Markov (PDM).

Pero, ¿qué es un PDM y cómo se relaciona con las Cadenas de Markov? Antes de contestar a estas preguntas, es crucial explicar el concepto de las Cadenas de Markov y su conexión intrínseca con los PDM.

### Cadenas de Markov

Las Cadenas de Markov surgen del campo de la probabilidad, lo que puede resultar sorprendente al relacionarlas con el ajedrez, un juego en el que el azar no tiene cabida. El nexo de unión radica en que, pese a ser el ajedrez un juego puramente determinista (dada una jugada, se puede prever con absoluta certeza la posición resultante), puede ser modelado como un fenómeno probabilístico donde la posición que surge después de una jugada específica tiene un 100% de probabilidad de ocurrir.

En este contexto, las Cadenas de Markov representan procesos estocásticos en los que la probabilidad de que ocurran uno o más eventos depende únicamente del estado actual del proceso. El [ejemplo de cadena de Markov](#fig-ejemplo-de-una-cadena-de-markov) proporciona un ejemplo visual de una Cadena de Markov.

<figure id="fig-ejemplo-de-una-cadena-de-markov">
  <img src="/assets/book/definition/chain.png" alt="Ejemplo de una Cadena de Markov" loading="lazy" />
  <figcaption>Ejemplo de una Cadena de Markov</figcaption>
</figure>

En el ejemplo citado, las flechas simbolizan las transiciones y los números asociados representan la probabilidad de que se produzca dicha transición. Los círculos, por otro lado, indican los estados. Por ejemplo, desde el estado 2, existe un 70% de probabilidad de transitar al estado 3 y un 30% de permanecer en el estado 1. También es posible que un estado transite a sí mismo, como se puede observar en el estado 1, que tiene un 50% de probabilidad de mantenerse inalterado.

Para asemejar nuestra definición a un juego de ajedrez, consideremos primero que el estado actual representa la disposición de las piezas en el tablero. Sin embargo, en una cadena de Markov, no encontramos un equivalente a las jugadas o movimientos. Esto se debe a que las Cadenas de Markov no consideran la interacción en su proceso. Para incorporar dicha interacción, necesitamos expandir las capacidades de las Cadenas de Markov al Proceso de Decisión de Markov.

Además, es fundamental tener en cuenta que el ajedrez es un juego de "información perfecta". ¿Qué quiere decir esto? Que tanto el jugador de las piezas blancas como el de las negras están al tanto de la ubicación de todas las piezas, a quién le corresponde el turno y toda la información pertinente al estado actual de la partida.

### Proceso de Decisión de Markov

Un Proceso de Decisión de Markov se compone por cuatro elementos:

- Estados (E)
- Acciones (A)
- Función de transición (F)
- Recompensas (R)

$$
\text{PDM} = \{E, A, F, R \}
$$

Los Estados ($E$) comprenden todas las posibilidades en las que puede encontrarse el proceso. Algunos estados son iniciales (en ellos puede iniciarse el proceso) y otros son finales (el proceso termina al llegar a estos). Cuando se alcanza un estado final, se dice que ha concluido un "episodio" y se regresa a uno de los estados iniciales para comenzar otro "episodio".

Las Acciones ($A$) engloban todas las acciones que puede realizar un agente, es decir, la entidad que interactúa con el proceso. Usualmente, dependiendo del estado actual, sólo se pueden ejecutar un subconjunto de acciones del conjunto total.

La Función de transición ($F$) toma como parámetros el estado actual y una acción, y devuelve un nuevo estado. En otras palabras, determina el estado subsiguiente basándose en el estado actual del proceso y la acción elegida por el agente.

Las Recompensas ($R$) asignan un valor de recompensa (que puede ser negativo) al agente, en función del estado alcanzado. Esto sirve para guiar al agente hacia los estados más beneficiosos.

### Ajedrez como Proceso de Decisión de Markov

Ahora bien, para definir el ajedrez como un Proceso de Decisión de Markov, es necesario describir cada uno de estos elementos en el contexto del juego.

Estados: Similarmente a las Cadenas de Markov, un estado en el ajedrez incluye la disposición de las piezas en el tablero, el turno del jugador, la posibilidad de realizar un enroque o una captura al paso, entre otros factores relevantes. Los estados iniciales son aquellos que no son finales, es decir, cualquier disposición de piezas que no resulte en una victoria o un empate. Los estados finales incluyen todas las situaciones en las que un jugador ha ganado o se ha cumplido una condición de empate. Siguiendo la analogía con los "episodios" mencionados anteriormente, cada partida de ajedrez sería un episodio.

Acciones: En el ajedrez, con dos jugadores, existen dos agentes que pueden realizar una acción (un movimiento) en su turno. Las posibles acciones de cada agente varían enormemente dependiendo del jugador (las blancas tendrán disponibles movimientos diferentes a las negras).

Función de transición: Esta función toma como entrada la posición actual y el movimiento deseado del jugador en turno (blancas o negras), y devuelve la nueva disposición del tablero como resultado de ese movimiento. Esta función es determinista en el ajedrez, es decir, un movimiento específico siempre resultará en una única disposición del tablero.

Recompensas: La asignación de recompensas queda a criterio del diseñador del sistema, pero debe seguir ciertos principios. Todos los estados no finales deben tener una recompensa neutral de 0, ya que no se puede determinar si esa disposición favorece a alguno de los jugadores. Los estados finales deben clasificarse en función de si resultan en una victoria para uno de los jugadores o un empate. La asignación de recompensas debe seguir el siguiente criterio:

$$
R_\textit{ganar} > R_\textit{empatar} > R_\textit{perder}
$$

Donde $R_\textit{ganar}$, $R_\textit{empatar}$ y $R_\textit{perder}$ representan las recompensas por ganar, empatar y perder, respectivamente. Siguiendo esta convención, la recompensa por ganar debe ser mayor que la de empatar, y la recompensa por empatar debe ser mayor que la de perder. A menudo, se asignan valores de +1 para ganar, 0 para empatar y -1 para perder, aunque estos valores pueden variar según las preferencias del diseñador del sistema.

La posibilidad de modificar la recompensa otorgada por cada movimiento en un juego, que por defecto se asume como cero, brinda la oportunidad de ajustar el transcurso de la partida de acuerdo a nuestras necesidades o preferencias. Al asignar una recompensa negativa a cada movimiento, estamos de hecho incentivando un juego más rápido, buscando finalizar la partida en el menor número de movimientos posible. Contrariamente, una recompensa positiva por movimiento fomentaría una partida de mayor duración. En resumen, el ajuste de las recompensas permite una cierta flexibilidad para calibrar el comportamiento del agente en función de los objetivos específicos que deseemos alcanzar.

Consideremos el juego del ajedrez, en el que implementamos un Proceso de Decisión de Markov (PMD). El procedimiento del juego involucra una secuencia cíclica de pasos que se ejecutan en cada turno, hasta llegar a un estado terminal, es decir, hasta que la partida concluye.

La secuencia de pasos se presenta de la siguiente manera:

1. El agente recibe un estado y una recompensa del entorno. En este contexto, el agente es responsable de realizar los movimientos en el juego. En el ajedrez, por ejemplo, donde los jugadores de las piezas blancas y negras toman turnos para moverse, habría un agente distinto para cada color. El entorno tiene la responsabilidad de proporcionar a los agentes la información sobre el estado actual del juego, incluyendo la posición de las piezas y si la partida ha llegado a su fin. Además, utiliza la función de transición para determinar cuál será el siguiente estado. Si la partida ha terminado, el proceso concluye y se otorga a cada agente su recompensa final.
2. Después de recibir la información sobre la posición actual, el agente decide la acción (movimiento) que tomará en esa posición y la comunica al entorno.
3. Tras recibir el movimiento del agente, el entorno aplica la función de transición para determinar la posición siguiente. Concluido este paso, se retorna al primer paso, y el agente correspondiente al color que toca mover toma el control.

Este proceso se repite hasta que se llegue a un estado terminal, lo cual en el ajedrez significa generalmente un jaque mate, un empate o la rendición de uno de los jugadores. En el [ejemplo del proceso de decisión de Markov del ajedrez](#fig-ejemplo-del-ajedrez-como-proceso-de-decision-de-markov) se muestra un ejemplo de todo este proceso.

<figure id="fig-ejemplo-del-ajedrez-como-proceso-de-decision-de-markov">
  <div class="localized-diagram mdp-chess-flow" role="group" aria-label="Ejemplo del ajedrez como Proceso de Decisión de Markov">
    <strong class="mdp-agent">Agente</strong>
    <div class="mdp-state mdp-state-before"><div class="chessboard" data-fen="rnbqkb1r/pppppppp/5n2/8/3P4/5N2/PPP1PPPP/RNBQKB1R b KQkq - 2 2" data-size="8" data-chess-options="&quot;setfen=rnbqkb1r/pppppppp/5n2/8/3P4/5N2/PPP1PPPP/RNBQKB1R b KQkq - 2 2, largeboard&quot;" role="img" aria-label="Posición antes de ...d5" data-rendered="source" data-board-asset="board-8x8-83f553f9ecb1316f.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-83f553f9ecb1316f.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div></div>
    <div class="mdp-state mdp-state-after"><div class="chessboard" data-fen="rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 0 3" data-size="8" data-chess-options="&quot;setfen=rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 0 3, largeboard&quot;" role="img" aria-label="Posición después de ...d5" data-rendered="source" data-board-asset="board-8x8-45f7874441012b4c.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-45f7874441012b4c.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div></div>
    <span class="mdp-edge-label mdp-edge-state-label">1. Estado (posición) y recompensa (0)</span>
    <span class="mdp-edge-label mdp-edge-action-label">2. Acción (d5)</span>
    <span class="mdp-edge-label mdp-edge-transition-label">3. Función de transición</span>
    <svg class="mdp-flow-arrows" viewBox="0 0 1000 650" preserveAspectRatio="none" aria-hidden="true">
      <defs><marker id="mdp-arrow-es" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L0,9 L8,4.5 z" /></marker></defs>
      <path d="M300 470 Q360 235 455 175" marker-end="url(#mdp-arrow-es)" />
      <path d="M455 190 Q360 300 300 430" marker-end="url(#mdp-arrow-es)" />
      <path d="M430 535 L670 535" marker-end="url(#mdp-arrow-es)" />
    </svg>
  </div>
  <figcaption>Ejemplo del ajedrez como Proceso de Decisión de Markov</figcaption>
</figure>

Tras esta formalización del ajedrez, cabe preguntarse, ¿qué se necesita programar para jugar ajedrez? Recordando el objetivo inicial de esta sección, queda claro que debemos programar el agente. La programación del proceso es relativamente sencilla en comparación con la creación de un agente capaz de jugar competente al ajedrez. Para permitir que el agente descubra el mejor movimiento en una posición dada, podemos utilizar una técnica de árbol de búsqueda (en la que la IA simula una serie de movimientos futuros tanto para sí misma como para su rival) o intentar estimar la calidad de los distintos estados (decidir quién tiene la ventaja en cada estado, o si hay un equilibrio). En general, una combinación de estos dos enfoques da los mejores resultados.
