---
title: "AlphaZero"
description: "En esta sección profundizaremos en el análisis de un módulo revolucionario que ha transformado el panorama del ajedrez tal como lo conocemos."
chapter: "Aprendizaje profundo reforzado"
part: "book"
order: 18
bookChapter: "3"
bookChapterTitle: "Aprendizaje profundo reforzado"
sectionNumber: "3.6"
sectionTitle: "AlphaZero"
navDepth: 2
pairedSlug: "alphazero"
source: "es/alphazero.tex"
draft: false
---

En esta sección profundizaremos en el análisis de un módulo revolucionario que ha transformado el panorama del ajedrez tal como lo conocemos. Este módulo, denominado AlphaZero, es famoso por su impacto en el ámbito del ajedrez computacional. Aunque el código fuente de AlphaZero no está a disposición del público, la metodología y su funcionamiento han sido minuciosamente descritos en el artículo de investigación publicado por Deep Mind <cite><a href="/es/references#cite-silver2017mastering" data-cite="silver2017mastering">[Silver, 2017]</a></cite>.

Por otro lado, existe una versión de código abierto, u *open source* <span class="footnote" role="note">Este término indica que el código fuente está disponible para consulta y uso gratuito</span>, denominada Leela Chess Zero (LCZero), cuya arquitectura y mecanismo de funcionamiento se asemejan notablemente a los de AlphaZero.

Tanto LCZero como AlphaZero operan sobre el principio de utilizar una inteligencia artificial (IA) sin conocimientos previos del juego de ajedrez, de ahí el término "Zero" en sus respectivos nombres. Esta IA se va educando y mejorando a medida que juega contra sí misma, lo cual permite prescindir de cualquier prejuicio o sesgo humano inherente. Esta metodología representa un marcado contraste con los enfoques tradicionales, en los cuales la búsqueda de jugadas se basa en conocimientos aportados por expertos en ajedrez.

En términos generales, ambos sistemas se componen de dos elementos fundamentales: una red neuronal y un árbol de búsqueda Monte Carlo. La red neuronal toma como entrada una posición específica del ajedrez y devuelve, como salida, la distribución de probabilidad de las posibles jugadas y una valoración de dicha posición, la cual se situará entre -1 y 1. El árbol de búsqueda Monte Carlo, utilizando la información proporcionada por la red neuronal, selecciona el mejor movimiento a realizar en la posición dada.

El principal desafío que enfrenta LCZero en comparación con AlphaZero radica en su limitada capacidad computacional. Para mitigar este problema, los desarrolladores de LCZero han implementado una solución distribuida, permitiendo así que cualquier usuario contribuya al entrenamiento de LCZero, aportando su "granito de arena" <span class="footnote" role="note"><https://lczero.org/contribute/></span>.

### Arquitectura de la Red Neuronal

La red neuronal en cuestión cuenta con un gran número de capas, particularmente en la sección de extracción de características. La entrada está formada por una serie de canales (matrices de 8x8), los cuales adoptan únicamente valores 0 o 1. Estos canales contienen la información de la posición en una forma que resulta fácilmente interpretable para la red neuronal. Posteriormente, se realiza la extracción de características; durante este proceso, la red neuronal identifica y extrae patrones a partir de los canales de entrada. Estos patrones son luego procesados por las capas finales de la red para determinar el valor del estado actual y la política de selección de acciones.

La [Figura 1](#fig-red-neuronal-de-alphazero) muestra la red neuronal usada por AlphaZero con las partes antes mencionadas.

<figure id="fig-red-neuronal-de-alphazero">
  <div class="localized-diagram" data-diagram="alphazero-network" data-label="Red neuronal de AlphaZero" role="img" aria-label="Red neuronal de AlphaZero">Red neuronal de AlphaZero</div>
  <figcaption>Red neuronal de AlphaZero</figcaption>
</figure>

#### Entrada

Según se especifica en el artículo de investigación, la entrada comprende un total de 119 canales. Estos canales se pueden clasificar en dos grupos principales.

El primer grupo se compone de la información relativa a la disposición de las piezas en el tablero de ajedrez y dos canales adicionales para indicar si una posición específica se ha repetido una o dos veces.

Para representar la disposición de las piezas se utiliza el formato conocido como *one-hot encoding*. En este formato, todos los elementos de la matriz $8 \times 8$ se establecen inicialmente en 0 y se cambian a 1 si una pieza de un tipo particular se encuentra en esa casilla. De este modo, cada tipo de pieza está asociado con un canal específico.

A modo de ilustración, consideremos el tablero mostrado en la [Figura 2](#fig-posicion-de-ejemplo-para-mostrar-el-formato-one-hot-encoding). A continuación, se muestran los canales correspondientes a varias de las piezas presentes en este tablero.

<figure id="fig-posicion-de-ejemplo-para-mostrar-el-formato-one-hot-encoding">
  <div class="chessboard" data-fen="rnbqk1nr/ppp2ppp/8/4P3/1BP5/8/PP2KpPP/RN1Q1BNR b kq - 1 7" data-size="8" data-chess-options="&quot;maxfield=h8, setfen=rnbqk1nr/ppp2ppp/8/4P3/1BP5/8/PP2KpPP/RN1Q1BNR b kq - 1 7, largeboard&quot;" role="img" aria-label="Posición de ejemplo para mostrar el formato one-hot encoding" data-rendered="source" data-board-asset="board-8x8-8a233edf3b81d5da.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-8a233edf3b81d5da.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Posición de ejemplo para mostrar el formato <em>one-hot encoding</em></figcaption>
</figure>

En primer lugar, se inicia con los peones blancos. La [Figura 3](#fig-representacion-en-formato-one-hot-encoding-de-los-peones-blancos) muestra la matriz resultante. En esta matriz, todas las posiciones ocupadas por peones blancos se representan con el valor 1, mientras que las posiciones vacías se representan con el valor 0. Cada tipo de pieza (peón, caballo, alfil, torre, dama y rey de ambos colores) se asigna a un canal específico, lo que da un total de 12 canales distintos.

<figure id="fig-representacion-en-formato-one-hot-encoding-de-los-peones-blancos">
  <div class="figure-equation" data-math="\begin{bmatrix}
            0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\
            0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\
            0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\
            0 &amp; 0 &amp; 0 &amp; 0 &amp; 1 &amp; 0 &amp; 0 &amp; 0 \\
            0 &amp; 0 &amp; 1 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\
            0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\
            1 &amp; 1 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 1 &amp; 1 \\
            0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\
        \end{bmatrix}" aria-label="bmatrix 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\ 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\ 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\ 0 &amp; 0 &amp; 0 &amp; 0 &amp; 1 &amp; 0 &amp; 0 &amp; 0 \\ 0 &amp; 0 &amp; 1 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\ 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\ 1 &amp; 1 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 1 &amp; 1 \\ 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\ bmatrix"></div>
  <figcaption>Representación en formato <em>one-hot encoding</em> de los peones blancos</figcaption>
</figure>

En el caso siguiente, se procede con los caballos negros. La [Figura 4](#fig-representacion-en-formato-one-hot-encoding-de-los-caballos-negros) ilustra el canal correspondiente a esta pieza.

<figure id="fig-representacion-en-formato-one-hot-encoding-de-los-caballos-negros">
  <div class="figure-equation" data-math="\begin{bmatrix}
            0 &amp; 1 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 1 &amp; 0 \\
            0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\
            0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\
            0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\
            0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\
            0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\
            0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\
            0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\
        \end{bmatrix}" aria-label="bmatrix 0 &amp; 1 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 1 &amp; 0 \\ 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\ 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\ 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\ 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\ 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\ 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\ 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 &amp; 0 \\ bmatrix"></div>
  <figcaption>Representación en formato <em>one-hot encoding</em> de los caballos negros</figcaption>
</figure>

De forma análoga, se procedería con el resto de tipos de piezas. Continuando con los canales, es pertinente hablar sobre los dos canales utilizados para informar sobre la repetición de la posición. El primer canal tendrá todos sus valores a 1 solo si la posición se ha repetido una vez, mientras que el segundo canal se activará si la posición actual se ha repetido exactamente dos veces. Esto proporciona a la red neuronal la información de que si repite la posición una vez más (habiendo sido repetida un total de tres veces), el juego se declarará en tablas. En total, este primer grupo de canales cuenta con $12+2=14$ canales. Este grupo se repite 8 veces, ya que se almacenan las 8 últimas posiciones en lugar de únicamente la última <span class="footnote" role="note">En mi opinión, no considero necesario almacenar las 8 últimas posiciones, siendo solo necesaria la última, ya que la información de los dos primeros grupos de canales provee toda la necesaria para la posición actual</span>. De esta forma, habrá $14*8=112$ canales en total.

Además, se debe tener en cuenta la posibilidad de *en passant* (comer al paso). Para representar esta eventualidad, el peón que puede ser capturado *en passant* se traslada de la quinta fila a la última fila en su canal correspondiente. Dado que un peón nunca puede estar en la última fila, esta representación no genera ninguna confusión.

Por otra parte, el segundo grupo de canales almacena información relativa a la posición actual que no está directamente relacionada con la disposición de las piezas. Este grupo consta de 7 canales, sumando un total de $119$ canales cuando se combina con el primer grupo. A continuación, se detallan los canales de este segundo grupo:

- Color: Indica el turno del jugador. Si es el turno de las blancas, todos los valores del canal serán 0; de lo contrario, serán 1.
- Número de movimientos: Representa el número total de movimientos realizados en la partida. Todos los valores de la matriz corresponderán a este número. Por ejemplo, si se han realizado 49 movimientos, todos los valores de la matriz serán 49.
- Enroque corto de las blancas: Indica si las blancas pueden realizar un enroque corto. Si es posible, todos los valores del canal serán 1; en caso contrario, serán 0.
- Enroque largo de las blancas: Similar al anterior, pero para el enroque largo.
- Enroque corto de las negras: Similar al anterior, pero para las negras y el enroque corto.
- Enroque largo de las negras: Similar al anterior, pero para el enroque largo.
- Número de movimientos sin progreso: Similar al canal del número de movimientos, pero cuenta solo aquellos en los que no se ha producido un progreso. Se considera que un movimiento produce progreso si un peón avanza o se captura una pieza. Si se realizan 50 movimientos sin progreso, la partida se declarará en tablas.

Así es, la entrada a la red neuronal constará de 119 matrices de $8 \times 8$. Además, es relevante señalar que el tablero siempre se presenta desde la perspectiva del jugador que tiene el turno, es decir, no todos los jugadores verán exactamente el mismo tablero, sino que uno de ellos lo percibirá girado.

Esta entrada se somete a una capa de convolución, inaugurando la fase de extracción de características. Cada capa de convolución está conformada por filtros convolucionales, que se complementan con una normalización de *batch* y una función de activación ReLU. Este esquema es consistente a lo largo de todas las capas convolucionales de esta red neuronal.

La normalización de *batch* es una técnica que normaliza la entrada. Su uso es muy común, pues tiende a mejorar la estabilidad y el rendimiento de las redes neuronales <cite><a href="/es/references#cite-ioffe2015batch" data-cite="ioffe2015batch">[Ioffe, 2015]</a></cite>. Para aplicarla, se calculan la media y la desviación estándar de la entrada. Luego, se aplica la siguiente fórmula a cada valor de entrada ($x_i$):

$$
y_i = \frac{x_i-\mu}{\sigma}
$$

Donde $\mu$ es la media y $\sigma$ es la desviación estándar.

En una variante más completa de la normalización de *batch*, se incluyen dos parámetros adicionales que permiten escalar y desplazar la salida normalizada ($y_i$). Así, el resultado final ($z_i$) se calcula como:

$$
z_i = \gamma*y_i + \beta
$$

En este caso, los parámetros aprendibles son $\gamma$ (escala) y $\beta$ (desplazamiento).

#### Extracción de características

La porción de la red neuronal que se dedica a la extracción de características es bastante voluminosa. Se compone de un total de 40 bloques residuales. Cada uno de estos bloques residuales incluye dos capas convolucionales, pero la segunda capa tiene una particularidad notable. Lo especial de esta segunda capa es que posee una conexión a la entrada original del bloque residual, que se activa después de la normalización de *batch* en esta capa. Este enlace residual permite sumar la salida, tras su normalización, con la entrada original del bloque. Esta operación de suma se realiza elemento a elemento. Finalmente, a este resultado se le aplica la función de activación ReLU de la segunda capa convolucional.

Gracias a esta conexión residual, se puede realizar la retropropagación (*backpropagation*) de manera más directa, sin necesidad de pasar por todas las capas intermedias.

La [Figura 5](#fig-estructura-de-un-bloque-residual-en-alphazero) ilustra la estructura de un bloque residual como el que se ha descrito anteriormente.

<figure id="fig-estructura-de-un-bloque-residual-en-alphazero">
  <div class="localized-diagram" data-diagram="alphazero-residual" data-label="Estructura de un bloque residual en AlphaZero" role="img" aria-label="Estructura de un bloque residual en AlphaZero">Estructura de un bloque residual en AlphaZero</div>
  <figcaption>Estructura de un bloque residual en AlphaZero</figcaption>
</figure>

#### Política

El proceso comienza con la extracción de características, las cuales son posteriormente canalizadas a través de una serie de filtros de convolución. A estos datos se les aplica una normalización de *batch*, seguida por la implementación de una función de activación ReLU. Al finalizar este proceso, obtenemos un tensor (varias matrices ordenadas) de dimensiones $8 \times 8 \times 73$. Este tensor refleja la distribución de probabilidad de los diferentes movimientos posibles en un tablero de ajedrez, obtenida tras aplicar la función Softmax.

Aunque a primera vista, $8*8*73=4672$ puede parecer una cantidad exorbitante de movimientos posibles, esta cifra se debe a que incluye todas las combinaciones de casillas y movimientos factibles en el juego, e incluso algunos más. Cada componente del tensor $8 \times 8$ corresponde a una casilla específica del tablero de ajedrez en la cual se ubica una pieza que está por moverse. De manera más específica, existen realmente 73 movimientos posibles.

Dentro de estos 73 movimientos posibles, los primeros 56 corresponden a los movimientos de la dama, incluyendo todos los movimientos posibles para la dama, rey, alfil y torre. Los ocho movimientos subsecuentes, es decir, aquellos del 57 al 64, engloban los ocho posibles saltos del caballo. Finalmente, los 9 movimientos restantes están reservados para las situaciones en que un peón es promovido a otra pieza que no es una dama.

La lógica detrás de los movimientos de la dama se rige por la orientación de un compás; en consecuencia, la dama puede moverse en cualquiera de las 8 direcciones indicadas por este. En cada dirección, la dama tiene la capacidad de moverse entre 1 y 7 casillas. El producto de estos valores nos proporciona el total de movimientos posibles para la dama. Durante la codificación, se asignará a cada dirección un valor numérico entre 1 y 7, tal y como se muestra en la [Figura 6](#fig-asignacion-de-valores-a-las-direcciones-de-los-movimientos-de-dama). A este valor se le sumará el número de casillas que la dama planea moverse.

<figure id="fig-asignacion-de-valores-a-las-direcciones-de-los-movimientos-de-dama">
  <div class="localized-diagram" data-diagram="alphazero-directions" data-label="Asignación de valores a las direcciones de los movimientos de dama" role="img" aria-label="Asignación de valores a las direcciones de los movimientos de dama">Asignación de valores a las direcciones de los movimientos de dama</div>
  <figcaption>Asignación de valores a las direcciones de los movimientos de dama</figcaption>
</figure>

La fórmula por tanto quedará así:

$$
f(\alpha_d,c) = 7*\alpha_d + c
$$

$\alpha_d$ es el coeficiente de las direcciones (consultar [Figura 6](#fig-asignacion-de-valores-a-las-direcciones-de-los-movimientos-de-dama)) y $c$ el número de casillas a mover.

A continuación un ejemplo para clarificar el funcionamiento.

<figure id="fig-ejemplo-de-codificacion-de-los-movimientos-de-la-dama">
  <div class="chessboard" data-fen="8/8/8/8/3Q4/8/8/8" data-size="8" data-arrows="d4-d2" data-chess-options="&quot;maxfield=h8, setfen=8/8/8/8/3Q4/8/8/8, pgfstyle=straightmove, markmoves={d4-d2}, arrow=to, showmover=false, largeboard&quot;" role="img" aria-label="Ejemplo de codificación de los movimientos de la dama" data-rendered="source" data-board-asset="board-8x8-927b8da24fad7a8f.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-927b8da24fad7a8f.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Ejemplo de codificación de los movimientos de la dama</figcaption>
</figure>

La dama tiene como objetivo desplazarse a la casilla señalada por la flecha, específicamente, de d4 a d2. Este movimiento, que se efectúa en dirección sur, tiene asignado un coeficiente de 4. Así, la acción resultante será $4*7+2=30$ en el caso de que el movimiento abarque dos casillas. En relación a las coordenadas de la subsección de 8x8, estaríamos hablando de $(4, 4)$, pues se sitúa en la fila 4 y en la columna "d", la cual tiene un valor numérico equivalente a 4.

En el caso de los movimientos del caballo, el proceso se asemeja. Se aplicará nuevamente el criterio de dirección de las agujas del reloj, por lo que las casillas ubicadas en la esquina superior derecha recibirán valores de 1 y 2. La fórmula correspondiente sería:

$$
f(\beta_s) = 56+\beta_s
$$

En esta fórmula, $\beta_s$ denota el coeficiente del salto del caballo conforme al sentido de las agujas del reloj. A este coeficiente se le suma $56$ para indicar un movimiento de caballo.

La [Figura 7](#fig-ejemplo-de-codificacion-de-los-movimientos-del-caballo) proporciona un ejemplo ilustrativo de este esquema de codificación.

<figure id="fig-ejemplo-de-codificacion-de-los-movimientos-del-caballo">
  <div class="chessboard" data-fen="8/8/8/8/8/5n2/8/8" data-size="8" data-arrows="f3-e1" data-chess-options="&quot;maxfield=h8, setfen=8/8/8/8/8/5n2/8/8, pgfstyle=straightmove, markmoves={f3-e1}, arrow=to, showmover=false, largeboard&quot;" role="img" aria-label="Ejemplo de codificación de los movimientos del caballo" data-rendered="source" data-board-asset="board-8x8-3b41809924b33ab0.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-3b41809924b33ab0.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Ejemplo de codificación de los movimientos del caballo</figcaption>
</figure>

En el ejemplo, el caballo localizado en la casilla f3 pretende moverse a la casilla e1. Este movimiento se identifica por un coeficiente de 5, siendo el quinto salto en el sentido de las agujas del reloj, por lo que la acción se computará como $56+5=61$. Las coordenadas correspondientes serían $(3, 6)$ debido a que el caballo está situado en la casilla f3 (fila 3, columna 6).

Finalmente, se debe considerar la promoción del peón. Un peón puede convertirse en dama, caballo, alfil o torre una vez que alcanza la última fila. Si se transforma en dama, su movimiento se codifica normalmente como tal. Sin embargo, si se promociona a alguna de las otras tres piezas, necesita su propio código de movimiento. Además, cuando un peón se promociona, puede hacerlo avanzando un paso en la diagonal izquierda superior, un paso hacia adelante, o un paso en la diagonal derecha superior. Es decir, habrá $3*3=9$ movimientos posibles en total. Se aplicará un procedimiento análogo al de los movimientos de la dama, donde se asignará un coeficiente a cada pieza promovida y luego se sumará el movimiento. Los coeficientes a utilizar son:

- Torre: 0
- Alfil: 1
- Caballo: 2

Respecto a los movimientos, se asignarán los siguientes valores:

- Diagonal izquierda superior: 1
- Paso hacia adelante: 2
- Diagonal derecha superior: 3

La fórmula a aplicar será:

$$
f(\delta_p,m) = 64+3*\delta_p+m
$$

Donde $\delta_p$ es el coeficiente de la pieza promovida y $m$ el valor del movimiento correspondiente. Al valor original se le resta uno.

A continuación, se muestra un ejemplo de la promoción de un peón. La [Figura 8](#fig-ejemplo-de-codificacion-de-la-coronacion-de-un-peon) representa la posición inicial.

<figure id="fig-ejemplo-de-codificacion-de-la-coronacion-de-un-peon">
  <div class="chessboard" data-fen="8/1P6/8/8/8/8/8/8" data-size="8" data-arrows="b7-c8" data-chess-options="&quot;maxfield=h8, setfen=8/1P6/8/8/8/8/8/8, pgfstyle=straightmove, markmoves={b7-c8}, arrow=to, showmover=false, largeboard&quot;" role="img" aria-label="Ejemplo de codificación de la coronación de un peón" data-rendered="source" data-board-asset="board-8x8-f9125459a1b66bf9.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-f9125459a1b66bf9.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Ejemplo de codificación de la coronación de un peón</figcaption>
</figure>

En este caso, el peón tiene como objetivo promocionarse a alfil, por lo que el coeficiente $\delta_p=1$. Aplicando la fórmula, obtenemos que la acción es $64+3*1+3=70$ (considerando un movimiento hacia la diagonal derecha superior).

Un posible interrogante podría ser: ¿cómo se representan las promociones en el lado de las piezas negras? Sin embargo, esto no sería necesario ya que el tablero se visualiza siempre desde la perspectiva del jugador, por lo que los peones siempre se promocionarían en la última fila.

Esta representación, no obstante, presenta una problemática. Muchas de las acciones no pueden ocurrir en todas las posiciones. Por ejemplo, si se tiene una dama situada en la esquina inferior izquierda (casilla a1) nunca podrá moverse al sureste, sur, suroeste, oeste y noroeste. En el caso de un caballo en esa casilla, solo podría moverse a 2 de las 8 posibles casillas. Además, un peón solo podrá promocionar si se encuentra en la penúltima fila. Teniendo en cuenta estos factores, Leela Chess Zero pudo reducir el número total de movimientos a $1858$ <cite><a href="/es/references#cite-lczero-network" data-cite="lczero-network">[Desarrolladores de Leela Chess Zero]</a></cite>. Para lograrlo se sigue el mismo sistema anterior, pero se eliminan todas las jugadas imposibles.

#### Valor

Afortunadamente, el mecanismo de la salida del valor es considerablemente más simple que el de la política. El proceso comienza con la aplicación de un filtro convolucional, seguido de una normalización de *batch*, y después se implementa una función de activación ReLU. A partir de este punto, se transita de las matrices bidimensionales a un vector, iniciando la aplicación de una capa de perceptrones. Luego se implementa otra función de activación ReLU, seguida de otra capa de perceptrones que consta únicamente de un perceptrón. A la salida de este último, se aplica una función de activación conocida como Tanh.

La función de activación Tanh tiene la característica especial de transformar todos los valores al rango $(-1,1)$. La definición matemática de esta función es la siguiente:

$$
tanh(x) = \frac{e^x-e^{-x}}{e^x+e^{-x}}
$$

Esta función resulta ideal en relación a la recompensa esperada que también se encuentra dentro de este rango. De esta manera, valores cercanos a -1 indican una posición al borde de la derrota, si es cercano a 0 se interpreta como una posición igualada, y finalmente, si su valor se acerca a 1, la victoria es prácticamente segura. En caso de que esta función reciba un valor muy alto positivo, devolverá un valor cercano a 1, mientras que si este valor alto es negativo, el resultado estará próximo a -1. Estas recompensas esperadas siempre serán evaluadas desde la perspectiva del jugador, de manera que si se lleva la ventaja, las recompensas serán superiores a 0 tanto para las piezas blancas como para las negras.

### Árbol de búsqueda Monte Carlo

El Árbol de Búsqueda Monte Carlo (MCTS, por sus siglas en inglés) es uno de los aspectos más sobresalientes de AlphaZero. Este mecanismo de búsqueda arbórea sigue una lógica similar al algoritmo Minimax y su versión mejorada con la poda alfa-beta, pero introduce el componente de simulaciones.

Cuando la inteligencia artificial se encuentra en un estado particular, genera un árbol de manera similar a los algoritmos previamente mencionados, aunque este será mucho más reducido. Este árbol comprenderá los estados que resultan de tomar una acción en el estado original, y a su vez los estados que surgen de tomar acciones en los estados previamente generados. Este proceso concluye cuando se llega a un nodo hoja del árbol. Cada nodo del árbol conserva la siguiente información:

- $N$: La cantidad de veces que esa acción ha sido seleccionada en las simulaciones.
- $W$: El valor acumulativo de este estado según las simulaciones.
- $Q$: El valor promedio de este estado en función de las simulaciones. Se obtiene dividiendo el valor total entre la cantidad de veces que esa acción ha sido seleccionada. En otras palabras, $Q = W / N$
- $P$: La probabilidad inicial de seleccionar esa acción (proporcionada por la política de la red neuronal).

El proceso de simulación se realiza un número determinado de veces, que puede estar definido por el tiempo disponible (por ejemplo, todas las simulaciones posibles en un minuto) o por un número fijo de simulaciones. Al seleccionar la acción a tomar, se consideran tres parámetros: $Q$, $N$ y $P$. A mayores valores de $Q$ y $P$, mayores posibilidades tendrá la simulación de ser seleccionada; sin embargo, en contraposición, se busca que $N$ tenga el valor más bajo posible para maximizar la función. $N$ opera de esta manera para facilitar la exploración de aquellos nodos que aún no han sido suficientemente explorados. La fórmula para obtener el valor de la acción sería la siguiente:

$$
A = Q + \frac{P}{1+N}
$$

Como se puede observar, al aumentar $Q$ y $P$ se incrementa el valor de $A$, mientras que al aumentar $N$ se disminuye el valor de $A$. Se suma $1$ a $N$ para evitar divisiones por cero ($N$ puede tener un valor de $0$).

En un nodo determinado, se seleccionará la acción que conduzca al estado con el mayor valor $V$. Este proceso culmina al llegar a un nodo hoja, dando inicio a la fase de actualización. Se obtiene el valor del nodo hoja $v$ utilizando la red neuronal y se llevan a cabo las siguientes actualizaciones en todos los nodos que se han visitado:

$$
N := N + 1 \\
W := W + v \\
Q := \frac{W}{N}
$$

Por un lado, se incrementa el número de simulaciones realizadas en ese nodo. El valor total $W$ se incrementa al sumarle el valor obtenido en esta simulación, y se recalcula el valor de $Q$ con los valores actualizados de $W$ y $N$.

Una vez finalizadas todas las simulaciones, se selecciona el mejor movimiento de acuerdo con ellas. Para ello, se elige la acción que ha tenido un mayor número de simulaciones, es decir, que tiene un mayor valor de $N$. Esta es la estrategia competitiva (que busca jugar de la mejor manera posible), pero puede ser que el sistema esté en entrenamiento y tenga mayor interés en explorar (resurgiendo así el dilema de exploración versus explotación). En este último caso, el sistema generará una distribución de probabilidad basada en el $N$ de los diferentes nodos. Para generar la probabilidad, simplemente suma todas las simulaciones y divide las simulaciones de cada nodo entre este total. Después de elegir la acción, se descarta todo el árbol excepto el subárbol correspondiente a la acción seleccionada, esto permite reutilizar los cálculos realizados en el anterior paso para calcular las siguientes jugadas. <cite><a href="/es/references#cite-silver2017masteringgo" data-cite="silver2017masteringgo">[Silver, 2017]</a></cite> <cite><a href="/es/references#cite-alphagozero-cheatsheet" data-cite="alphagozero-cheatsheet">[David Foster]</a></cite>.

A continuación, se presenta un ejemplo ilustrativo que tiene por objetivo esclarecer el funcionamiento del árbol de búsqueda Monte Carlo.

Consideremos la posición que se muestra en la [Figura 9](#fig-posicion-de-ejemplo-para-mcts), donde las blancas deben seleccionar entre tres movimientos posibles: Rf3, b3 y Db3.

<figure id="fig-posicion-de-ejemplo-para-mcts">
  <div class="chessboard" data-fen="r3k2r/p2p1ppp/bqp1p3/3nP3/1bP1NP2/8/PP2K1PP/R1BQ1B1R w kq - 3 12" data-size="8" data-arrows="b2-b3, d1-b3, e2-f3" data-chess-options="&quot;maxfield=h8, setfen=r3k2r/p2p1ppp/bqp1p3/3nP3/1bP1NP2/8/PP2K1PP/R1BQ1B1R w kq - 3 12, pgfstyle=straightmove, markmoves={b2-b3, d1-b3, e2-f3}, arrow=to, largeboard&quot;" role="img" aria-label="Posición de ejemplo para el análisis con MCTS" data-rendered="source" data-board-asset="board-8x8-958788d5adc1815c.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-958788d5adc1815c.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Posición de ejemplo para el análisis con MCTS</figcaption>
</figure>

El agente que juega con las piezas blancas ha generado un árbol de búsqueda Monte Carlo, y está a punto de llevar a cabo la última simulación del árbol. En el nodo sólo se muestran los valores $N$, $W$ y $P$, ya que $Q$ puede calcularse fácilmente a partir de $W$ y $N$.

<figure id="fig-mcts-antes-de-la-ultima-simulacion">
  <div class="localized-diagram" data-diagram="mcts-initial" data-label="Estado del árbol MCTS antes de realizar la última simulación" role="img" aria-label="Estado del árbol MCTS antes de realizar la última simulación">Estado del árbol MCTS antes de realizar la última simulación</div>
  <figcaption>Estado del árbol MCTS antes de realizar la última simulación</figcaption>
</figure>

Se efectúa la última simulación, seleccionando los movimientos Rf3 y f5, ya que son los que presentan el valor más alto según la fórmula empleada para las simulaciones. Al llegar al nodo después de f5, se ejecuta la red neuronal, obteniendo un valor de $v=0,6$. Con este valor, se procede a actualizar todos los nodos que fueron atravesados durante la simulación, lo que resulta en el siguiente árbol:

<figure id="fig-mcts-despues-de-terminar-la-simulacion">
  <div class="localized-diagram" data-diagram="mcts-final" data-label="Estado del árbol MCTS después de finalizar la última simulación" role="img" aria-label="Estado del árbol MCTS después de finalizar la última simulación">Estado del árbol MCTS después de finalizar la última simulación</div>
  <figcaption>Estado del árbol MCTS después de finalizar la última simulación</figcaption>
</figure>

Una vez que la última simulación se ha completado, es el momento de seleccionar la acción a llevar a cabo. El criterio para la elección se basa en el número de simulaciones $N$, por lo que la acción seleccionada es Rf3. Después de esta decisión, se descarta todo el árbol excepto la parte que se origina desde el nodo al que ha llevado el movimiento Rf3.

Tras haber estudiado el funcionamiento del árbol de búsqueda Monte Carlo, el próximo paso es examinar cómo fue entrenada y evaluada la inteligencia artificial.

### Entrenamiento

El proceso de entrenamiento de la red neuronal se inicia desde cero, sin aportarle ningún conocimiento preexistente sobre el ajedrez, convirtiéndola en una *tabula rasa*. Su única opción para adquirir conocimientos es jugar partidas contra sí misma, aprender de sus propios errores y, de esta manera, mejorar su rendimiento de manera gradual.

Existen diferencias significativas en el aprendizaje de AlphaZero con respecto a su precursor, AlphaGo Zero. En el caso de AlphaZero, los parámetros de la red neuronal son actualizados constantemente, sin importar los resultados. En contraste, AlphaGo Zero solo actualiza sus parámetros si la red neuronal más reciente logra superar a su versión anterior.

Durante el proceso de entrenamiento, AlphaZero genera una gran cantidad de partidas contra sí mismo. Estas partidas se convierten en el corpus de entrenamiento de la red neuronal. Todas las posiciones de estas partidas son aleatorizadas y, para cada una, se almacenan las probabilidades de búsqueda correspondientes al árbol de búsqueda Monte Carlo, así como el resultado de la partida. Posteriormente, la red neuronal recibe cada posición y devuelve tanto la política (probabilidades de búsqueda) como el valor del estado (resultado de la partida).

Para evaluar el desempeño de la red, se utilizan dos métricas: la función de pérdida de entropía cruzada (Cross-Entropy Loss) para comparar la política devuelta por la red con la almacenada, y la función de pérdida de error cuadrático medio (Mean-Squared Loss) para comparar el valor del estado. Con estas dos funciones se obtiene la pérdida total.

Finalmente, con el fin de prevenir el *overfitting* <span class="footnote" role="note">El <em>overfitting</em> o sobreajuste se produce cuando un modelo de redes neuronales se entrena en exceso con un conjunto de datos específico, lo que lleva a aprender patrones que son específicos de esos datos pero que no se generalizan bien a nuevos datos. Esto puede resultar en un rendimiento deficiente cuando se aplica el modelo a nuevas muestras.</span>, se introduce un componente de regularización en el cálculo de la pérdida total.

#### Pérdida de Entropía Cruzada (Cross-Entropy Loss)

La función de pérdida de Entropía Cruzada se emplea habitualmente en problemas de clasificación o en la determinación de la política de acciones. Esta función asume que la salida de la red neuronal es una distribución de probabilidad, mientras que la salida real o esperada es un vector en formato *one-hot encoding*. Por ejemplo, si tenemos un total de 5 acciones posibles y la acción escogida es la tercera, el vector en este formato sería el siguiente:

$$
\begin{bmatrix}
0 & 0 & 1 & 0 & 0
\end{bmatrix}
$$

En este vector, todos los valores son cero excepto en la posición 3, que corresponde a la acción seleccionada y tiene valor 1. Este vector y la distribución de probabilidad se introducen en la fórmula de la función de pérdida de Entropía Cruzada:

$$
\mathcal{L}_1(\hat{y},y) = - \sum_{i=1}^{n}y_i*\log{\hat{y}_i}
$$

Aquí, $y$ representa al vector en formato *one-hot encoding* e $\hat{y}$ al vector de probabilidades. <cite><a href="/es/references#cite-cross-entropy" data-cite="cross-entropy">[Kiprono Elijah Koech]</a></cite>

Una observación importante es que, a pesar de que el vector tiene $n$ elementos, solo el valor en la posición que tiene un 1 afectará al resultado final, pues cuando $y_i=0$, el término correspondiente en la suma se cancela <span class="footnote" role="note">En el caso de que se obtenga $0*\log 0$, se toma por convenio que es igual a $0$ para facilitar el entrenamiento</span>. Por lo tanto, esta función de pérdida evalúa la probabilidad de que se produzca la acción o la clase esperada. Es importante destacar que la función siempre arrojará valores positivos, dado que el término logarítmico proporcionará valores negativos (al recibir valores entre 0 y 1) que se anulan con el signo negativo que antecede al sumatorio.

#### Pérdida de Error Cuadrático Medio (Mean-Squared Loss)

La función de pérdida de Error Cuadrático Medio se utiliza con frecuencia en problemas de regresión, al igual que la función de pérdida de Entropía Cruzada. En este caso, esta función se usa para aproximar la recompensa esperada. A diferencia de la función de Entropía Cruzada, su funcionamiento es más simple, ya que compara la diferencia entre dos valores numéricos mediante la siguiente fórmula:

$$
\mathcal{L}_2(\hat{y},y) = (\hat{y} - y)^2
$$

Para calcular esta pérdida, se resta la predicción de la red neuronal al valor real y se eleva al cuadrado el resultado, asegurando así que la pérdida sea un valor positivo. Si esta pérdida perteneciera a un *batch* (es decir, en una sola pasada de la red neuronal se calculan varias entradas), se tendría que dividir este valor entre $n$, siendo $n$ el número de entradas. La fórmula quedaría de la siguiente forma:

$$
\mathcal{L}_2(\hat{y},y) = \frac{1}{n}\sum_{i=1}^{n}(\hat{y}_i - y_i)^2
$$

Donde $\hat{y}_i$ y $y_i$ corresponden respectivamente a los valores de la posición $i$ en la predicción de la red neuronal y el valor real <cite><a href="/es/references#cite-mean-squared" data-cite="mean-squared">[George Seif]</a></cite>. Se aplicaría de la misma manera a la Entropía Cruzada si fuera un *batch* calculando la media entre todas.

#### Regularización

AlphaZero emplea un tipo de regularización conocido como L2, una de las técnicas más utilizadas en el campo de la inteligencia artificial. El propósito de la regularización es disminuir la complejidad del modelo y evitar el sobreajuste, o *overfitting*. Para lograr esto, se añade un término adicional a la función de pérdida general, que incrementa su valor a medida que la complejidad del modelo aumenta. Pero ¿cómo se mide dicha complejidad? En realidad, es bastante sencillo: se hace uso de los propios pesos de la red neuronal. A mayor distancia de estos pesos con respecto a cero, mayor será la complejidad del modelo.

La regularización L1 calcula el valor absoluto de los pesos, mientras que la L2 calcula el cuadrado de los pesos. La fórmula de la regularización L2 es la siguiente:

$$
L2(w) = \alpha*\sum_{i=1}^{n}(w_i)^2
$$

En esta fórmula, $w$ representa todos los pesos de la red neuronal y $\alpha$ es un parámetro de regularización con un valor muy pequeño, típicamente de 0,01 o 0,001, o incluso menor. La pérdida total del modelo, que se emplea para la retropropagación o *backpropagation* para calcular la actualización de los pesos de la red neuronal, se obtiene sumando las dos funciones de pérdida descritas anteriormente y el término de regularización L2 <cite><a href="/es/references#cite-l2" data-cite="L2">[Anuja Nagpal]</a></cite>.

El *overfitting* ocurre cuando el modelo se ajusta muy bien a los datos de entrenamiento, pero tiene un pobre rendimiento en la generalización para entradas nuevas o no vistas anteriormente. Dado que el *overfitting* indica que el modelo es demasiado complejo, la regularización puede ser un método efectivo para mitigar este problema.

Por lo tanto, la pérdida total del modelo se calcula de la siguiente manera:

$$
\mathcal{L} = \mathcal{L}_1 + \mathcal{L}_2 + L2
$$

### Evaluación

Tras la finalización del proceso de entrenamiento de la red neuronal, se vuelve imprescindible evaluar su rendimiento en comparación con el de los humanos y otros programas computacionales. No obstante, considerando que en el juego del ajedrez, los programas informáticos han superado con creces a los jugadores humanos durante muchos años, el benchmarking de nuestra red se realizará, por tanto, solo contra programas informáticos.

En esta línea, el equipo de AlphaZero optó por contrastar su desempeño con el programa que fue proclamado campeón del Top Chess Engine Championship (TCEC) en el año 2016. Dicho programa es conocido con el nombre de Stockfish, y se caracterizaba en aquel momento por poseer una arquitectura sustentada en la técnica de poda alfa-beta y una serie de heurísticas de gran complejidad.

En el enfrentamiento consistente en un total de 100 partidas, AlphaZero logró un impresionante registro de 28 victorias y 72 empates contra este formidable rival. Estos excelentes resultados provocaron una revolución sin precedentes en el campo de los programas de ajedrez, poniendo en evidencia el potencial de la inteligencia artificial y las redes neuronales en el dominio de este milenario juego de estrategia.

### Implicaciones

El cambio más notorio que se ha producido en el ámbito de la inteligencia artificial fue la transición desde el uso de heurísticas diseñadas y codificadas por los humanos hasta la adopción de heurísticas generadas a través de redes neuronales. Esta transformación marcó un punto de inflexión en cómo las máquinas aprenden, interpretan y toman decisiones basadas en los datos que procesan.

Este cambio, sin embargo, tuvo como consecuencia que los módulos que todavía utilizaban las heurísticas antiguas se encontraban en desventaja frente a aquellos que habían incorporado la nueva tecnología. Estos módulos más antiguos, que una vez dominaron sus respectivos campos, carecían de la capacidad para competir efectivamente con los módulos basados en redes neuronales, resultando en una disparidad considerable en términos de eficiencia y precisión.

No obstante, es importante destacar que muchos de estos sistemas basados en heurísticas tradicionales han podido adaptarse a esta nueva era de aprendizaje automático. Un ejemplo notable es el del programa de ajedrez Stockfish. Este motor de ajedrez, que una vez se basó en heurísticas diseñadas manualmente, ha logrado integrar con éxito una red neuronal en su arquitectura, lo que ha potenciado considerablemente su rendimiento. Esta adaptación no solo ha permitido a Stockfish mantenerse competitivo frente a sus contemporáneos basados en redes neuronales, sino que también ha demostrado la versatilidad y la capacidad de adaptación inherentes a estos sistemas. Veremos en más detalle como logró Stockfish integrar las redes neuronales en el próximo capítulo.
