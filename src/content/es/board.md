---
title: "Representación del tablero"
description: "Tras explorar los mecanismos de búsqueda en juegos de inteligencia artificial, es crucial examinar otro componente esencial: la representación del tablero de juego."
chapter: "Inteligencia artificial"
part: "book"
order: 10
bookChapter: "2"
bookChapterTitle: "Inteligencia artificial"
sectionNumber: "2.7"
sectionTitle: "Representación del tablero"
navDepth: 2
pairedSlug: "board"
source: "es/board.tex"
draft: false
---

Tras explorar los mecanismos de búsqueda en juegos de inteligencia artificial, es crucial examinar otro componente esencial: la representación del tablero de juego. Este elemento cumple con dos funciones primordiales en el contexto de la búsqueda. La primera de ellas es la generación de todas las jugadas posibles a partir de la posición actual en el juego. En segundo lugar, se encarga de las transiciones de una jugada a la siguiente, es decir, provee la nueva posición en el tablero basada en la jugada y el estado previo del mismo. Ambas funciones son invocadas repetidamente en el árbol de juego. Dada la relevancia de estas operaciones y el hecho de que la calidad de una jugada depende tanto de la profundidad de expansión del árbol como del tiempo que esto conlleva, es esencial que ambas funciones sean implementadas de la manera más eficiente posible.

Para una implementación eficaz de estas funciones, es imperativo considerar cómo se representa el tablero de juego en la memoria de la computadora. Existen diversos métodos para ello, cada uno con sus propios beneficios y limitaciones. Podemos agrupar estos métodos en tres categorías generales: los métodos centrados en las piezas, los métodos centrados en el tablero y los métodos híbridos <cite><a href="/es/references#cite-chessprogrammingboardrepresentation" data-cite="chessprogrammingBoardRepresentation">[chessprogrammingBoardRepresentation]</a></cite>. La nomenclatura de estas categorías es bastante descriptiva.

Los métodos centrados en las piezas se enfocan en representar las piezas de manera directa, manteniendo listas u otras estructuras de datos con la información asociada a cada pieza y su posición en el tablero. Por otra parte, los métodos centrados en el tablero se centran en examinar cada casilla del tablero de manera individual para determinar si contiene una pieza y, en caso afirmativo, qué tipo de pieza es. Finalmente, los métodos híbridos son aquellos que combinan aspectos de ambos enfoques.

Aparte de la información del propio tablero o las piezas, es necesario almacenar información adicional, como la posibilidad de realizar enroques, el número de veces que la posición actual se ha repetido, la cantidad de movimientos sin capturas ni avances de peón, entre otros. Este tipo de información es relativamente sencilla de representar, por lo que no se hará mucho hincapié en ella, centrándonos más en la información del tablero y las piezas.

Antes de discutir las técnicas principales, es necesario establecer la diferencia entre las jugadas pseudolegales y las jugadas legales. Las jugadas legales son todas aquellas que se pueden realizar en una posición de acuerdo con las reglas del ajedrez. Las jugadas pseudolegales, por otro lado, incluyen las jugadas legales y aquellas que no se pueden realizar porque dejarían al rey bajo ataque y, por tanto, serían ilegales según las reglas del ajedrez. Es importante considerar estos grupos por separado debido a que las jugadas pseudolegales son más fáciles de calcular en comparación con las jugadas legales. Comprobar si el rey está en jaque después de un movimiento implica un coste computacional adicional significativo. Para solucionar este problema, se pueden generar los movimientos uno por uno, verificando si el rey queda en jaque antes de realizar cada movimiento. Otra opción es permitir el movimiento pseudolegal y, si el rival tiene la oportunidad de capturar al rey en su turno, se invalida ese movimiento.

A continuación, comenzaremos con un resumen breve de las principales técnicas de representación del tablero y después profundizaremos en las más relevantes:

- **Matriz 2D:** Este método centrado en el tablero emplea una matriz de $8 \times 8$ donde un valor 0 en una posición de la matriz indica que la casilla correspondiente está vacía. A cada tipo de pieza se le asigna un número; por ejemplo, a los peones se les asigna un 1, a los caballos un 2, etc. Si la pieza es blanca, se le asigna un valor positivo; si es negra, un valor negativo. Por ejemplo, si al alfil se le asigna el número 3, un alfil blanco sería 3 y un alfil negro -3.
- **Lista de piezas:** Esta técnica centrada en las piezas mantiene una lista de todas las piezas en juego. Cada entrada de la lista contiene el tipo de pieza, el color y la casilla en la que se encuentra. Por ejemplo, para un alfil blanco en la casilla a4, la lista almacenará una entrada con el alfil, el color blanco y la casilla a4.
- ***Bitboard*:** Esta es la representación más comúnmente utilizada y está centrada en el tablero. La idea principal es usar *bitsets* <span class="footnote" role="note">Un <em>bitset</em> es una estructura de datos simple que se utiliza para representar un conjunto de elementos, como números o valores booleanos. Funciona asignando un solo bit (0 o 1) a cada elemento en el conjunto, lo que permite verificar la pertenencia de un elemento en tiempo constante.</span> para representar matrices de $8 \times 8$. Dado que solo se pueden usar 0s y 1s, es necesario usar una matriz por cada tipo de pieza y color, lo que da un total de 12 matrices. Si la matriz de una pieza tiene un 1 en una determinada posición, esa casilla contendrá esa pieza; si, por el contrario, tiene un 0, no habrá una pieza de ese tipo en esa casilla. A pesar de que pueda parecer menos eficiente que la matriz de 2D, al tener que usar 12 matrices en lugar de una, este método tiene una serie de ventajas que se discutirán más adelante.
- **Vectores de ataque:** Este método, centrado en el tablero, representa los movimientos de las piezas como vectores. Cada pieza tiene asignados una serie de vectores según su movimiento. Por ejemplo, la dama combina los vectores de las torres y los alfiles. Gracias a los vectores, se pueden generar los movimientos. Cuando se generan movimientos, la pieza se desplaza usando el vector hasta encontrar un obstáculo, y se consideran como movimientos todas las casillas que haya pasado. Para el caballo, peón y rey, será necesario considerar sus peculiaridades en los movimientos.

De todas las técnicas descritas, solo abordaremos en profundidad la técnica *bitboard*. Esto se debe a que una de sus variantes, el *magic bitboard*, es una de las más utilizadas en la actualidad. Además de las mencionadas, existen muchas más representaciones que funcionan mejor o peor dependiendo de la estructura del propio módulo e incluso del lenguaje de programación utilizado para crear este.

El concepto *Bitboard* se apoya en el uso de los llamados *bitsets*. Un *bitset* es un conjunto de bits, cada bit puede tomar únicamente dos valores: 0 o 1. De esta forma, nos permite representar si una casilla está ocupada por un tipo de pieza (incluyendo el color) o no.

Uno de los atributos más relevantes de los *bitset* es su capacidad para ser representados mediante un número entero. Esto resulta particularmente útil en situaciones en las que necesitamos manipular o representar información en forma de bits.

Consideremos un *bitset* de cuatro bits como ejemplo. En este caso, el número 3 se representa como "0011". Por tanto, un *bitset* de cuatro posiciones puede representar cualquier número desde 0 hasta 15. Podemos convertir un *bitset* a su equivalente numérico mediante la fórmula:

$$
n = \sum_{i=0}^{k-1} b_i * 2^i
$$

En la fórmula, $n$ es el número en formato decimal, $k$ es el número de bits que tiene el *bitset*, y $b_i$ es el bit en la posición $i$ contando desde la derecha. Así, el primer bit sería el último, el segundo bit sería el penúltimo, y así sucesivamente. En consecuencia, un *bitset* de $k$ posiciones puede representar números desde $0$ hasta $2^k-1$. Esto implica que un *bitset* puede representar $2^k$ números en total, aunque al empezar en $0$ no llega a incluir el número $2^k$.

Haciendo uso de este principio, consideremos la aplicación en el juego del ajedrez. Sabemos que un tablero de ajedrez tiene 64 casillas, por lo que requeriríamos un *bitset* de tamaño 64 para su representación. Afortunadamente, los ordenadores modernos están optimizados para trabajar de forma eficiente con enteros de 64 bits, ya que los soportan de manera nativa. Por lo tanto, con tan solo 12 enteros, ¡podríamos representar todos los posibles tableros de ajedrez! En términos de eficiencia en el uso de memoria (medida en términos de *bits* utilizados), esta no es necesariamente la mejor opción, pero el verdadero valor de este método reside en su capacidad para generar rápidamente los movimientos posibles desde una posición determinada mediante el uso de operaciones lógicas.

Los ordenadores realizan dos tipos de operaciones básicas: aritméticas y lógicas. Las operaciones aritméticas son operaciones estándar como suma, resta, multiplicación y división, mientras que las operaciones lógicas operan sobre el álgebra booleana. Este tipo de álgebra sólo contiene dos valores, 0 y 1, y constituye la base fundamental de la computación. Las operaciones aritméticas normalmente requieren un gran número de operaciones lógicas para su ejecución, por lo que las operaciones lógicas suelen ser más rápidas <span class="footnote" role="note">Esto se refiere a la electrónica digital</span>.

Las operaciones lógicas suelen realizarse sobre una o dos variables, aunque son fácilmente extensibles a un mayor número de variables. Para representar estas operaciones, se utilizan las llamadas puertas lógicas. Estas toman una o más variables como entrada y generan una única salida. Tanto las variables como la salida pueden tomar los valores 0 o 1.

Las principales puertas lógicas para una variable son las que se muestran en la Tabla [referencia](#tab-puertas-logicas-de-una-variable).

| Valores | NOT | Identidad |
| --- | --- | --- |
| 0 | 1 | 0 |
| 1 | 0 | 1 |

*Puertas lógicas de una variable*

La puerta lógica NOT invierte el valor de la entrada. Si la entrada es 0, la salida será 1 y viceversa. Por otro lado, la puerta de identidad simplemente deja el valor de entrada sin cambios.

A continuación, consideremos las puertas lógicas de dos variables, que son algo más complejas pero pueden ser extendidas a más de dos variables. La Tabla [referencia](#tab-puertas-logicas-de-dos-variables) muestra las principales puertas lógicas de dos variables.

| Valores | OR | AND | XOR |
| --- | --- | --- | --- |
| 00 | 0 | 0 | 0 |
| 01 | 1 | 0 | 1 |
| 10 | 1 | 0 | 1 |
| 11 | 1 | 1 | 0 |

*Puertas lógicas de dos variables*

La puerta lógica OR produce una salida de 1 siempre que al menos una de las entradas sea 1. Este comportamiento se mantiene si se extiende a más de dos variables: la salida será 1 si al menos una de todas las variables es 1.

La puerta lógica AND produce una salida de 1 únicamente cuando todas las entradas son 1. Esta lógica también se aplica cuando hay más de dos entradas.

Para concluir nuestra exploración de las puertas lógicas, la puerta XOR representa un caso de uso peculiar. Se puede concebir como una versión más "estricta" de la puerta OR. Similarmente, la puerta XOR opera al igual que una puerta OR, con una excepción significativa: en el caso de que todas las entradas sean 1, la salida será 0.

Cuando expandimos esta puerta a más de dos entradas, se pueden seguir dos métodos: devolverá 1 si el número de entradas que son 1 es impar, y resultará verdadera si y solo si hay exactamente una entrada que es 1. Sin embargo, es importante destacar que ninguno de estos enfoques se considera universalmente aplicable. Desde una perspectiva electrónica, una puerta XOR con más de dos variables no se implementa generalmente.

Existen varias otras puertas lógicas además de las ya mencionadas. Estas pueden derivarse mediante la combinación de las puertas previamente descritas. Las puertas NAND y NOR merecen una mención especial. Son el resultado de la combinación de las puertas OR y AND con una puerta NOT, respectivamente. En otras palabras, toman el valor de las puertas OR y AND y luego lo invierten. La importancia de estas puertas radica en su consideración como "universales". Esto significa que, utilizando exclusivamente puertas NAND o NOR, podemos recrear todas las demás puertas lógicas, incluso aquellas con una sola entrada. Estas operaciones desempeñan un papel fundamental para lograr que los *bitboards* sean eficientes.

Para ilustrar estos conceptos, mostraremos un ejemplo de cómo se convierte un tablero de ajedrez en su representación de *bitboard*.

<figure id="fig-tablero-de-ejemplo-para-bitboard">
  <div class="chessboard" data-fen="rnb1kb1r/1p3ppp/p2ppn2/6B1/3NPP2/q1N5/P1PQ2PP/1R2KB1R w Kkq - 2 10" data-size="8" data-chess-options="&quot;setfen=rnb1kb1r/1p3ppp/p2ppn2/6B1/3NPP2/q1N5/P1PQ2PP/1R2KB1R w Kkq - 2 10, largeboard&quot;" role="img" aria-label="Tablero de ejemplo para bitboard" data-rendered="source" data-board-asset="board-8x8-a65b4234ff50f8c1.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-a65b4234ff50f8c1.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Tablero de ejemplo para bitboard</figcaption>
</figure>

En esta representación, los bits se originan en la esquina inferior derecha, lo que implica que el bit 0 (ubicado al final) corresponde a la casilla h1. Los bits se asignan por columnas, y una vez que se han asignado todos los bits de una columna, se procede a la próxima fila comenzando por la columna inicial. Por lo tanto, el bit 1 corresponde a g1, el bit 2 a f1 y el bit 8 a h2, y así sucesivamente.

Para empezar, representaremos los peones blancos. Cada 8 bits se separarán en líneas diferentes para simplificar la lectura. La representación resultante sería la siguiente:

```text
00000000
00000000
00000000
00000000
00001100
00000000
10100011
00000000
```

Las filas 4 y 2, donde se encuentran los peones blancos, son las únicas que contienen unos. A continuación, mostramos otro ejemplo con las torres negras.

```text
10000001
00000000
00000000
00000000
00000000
00000000
00000000
00000000
```

Las torres negras se mantienen en sus posiciones iniciales. Este mismo procedimiento se utilizaría para representar el resto de las piezas.

Para generar los movimientos, se emplea una técnica altamente eficiente conocida como *magic bitboards*. Esta técnica se utiliza para calcular los movimientos de los alfiles y las torres, y por ende, los de la dama. Los caballos, el rey y los peones son más sencillos de calcular, por lo que no es necesario usar esta técnica con ellos. Esto se debe a que los movimientos de estas piezas no están "obstruidos" por otras piezas.

La técnica *magic bitboards* consiste en multiplicar el tablero actual, representado por su *bitset*, por ciertos "números mágicos". Para cada posición de un alfil o una torre, y una disposición de piezas que pueden bloquear su trayectoria, existe un número mágico que, multiplicado por el *bitset* que contiene todas las piezas del tablero (este se calcula haciendo una OR entre todos los *bitsets*), nos proporciona todos los movimientos posibles del alfil o la torre en un nuevo *bitset*. Calcular estos números mágicos implica un alto coste computacional, pero solo es necesario hacerlo una vez y sirve para cualquier posición. Este es el motivo por el que esta técnica ofrece un rendimiento tan notable.

Para resumir, existen una multitud de técnicas que permiten representar tableros de ajedrez, focalizándose principalmente en la generación de movimientos y en las transiciones entre distintos estados del juego. Una de las técnicas más destacadas y ampliamente empleadas es la de los *magic bitboards*. Este método es conocido por su excepcional eficiencia en términos de rendimiento y velocidad.

Además de los *magic bitboards*, existen otras representaciones del tablero que son más adecuadas para ciertas aplicaciones específicas. Por ejemplo, el método de *one-hot encoding*, que comparte similitudes con la representación *bitboard*, y la representación HalfKP, son ambos muy utilizados en contextos de redes neuronales debido a sus propiedades particulares.

Por otro lado, la notación FEN (Forsyth-Edwards Notation) es muy utilizada para almacenar y recuperar posiciones de tablero de ajedrez, dada su capacidad de representar de manera concisa el estado completo de un juego.

Es importante señalar que todas estas técnicas serán expuestas con mayor detalle en capítulos posteriores de este libro, brindando al lector una comprensión más profunda de sus características y aplicaciones en diferentes contextos.
