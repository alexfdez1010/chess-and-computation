---
title: "Política"
description: "La política, en términos de aprendizaje automático, representa las decisiones tomadas por un agente en función de un estado dado."
chapter: "Aprendizaje profundo reforzado"
part: "book"
order: 14
bookChapter: "3"
bookChapterTitle: "Aprendizaje profundo reforzado"
sectionNumber: "3.2"
sectionTitle: "Política"
navDepth: 2
pairedSlug: "policy"
source: "es/policy.tex"
draft: false
---

La política, en términos de aprendizaje automático, representa las decisiones tomadas por un agente en función de un estado dado. Estas políticas pueden clasificarse de dos maneras principales: deterministas y no deterministas. La principal distinción entre ambas radica en su predictibilidad: una política determinista siempre resultará en la misma acción dada la misma situación o estado, mientras que una política no determinista puede conducir a diferentes acciones incluso para un mismo estado.

Además, las políticas también pueden clasificarse en función del número de acciones posibles. Cuando este número es finito, nos encontramos ante un espacio de acciones discreto. En este caso, se asigna un identificador único a cada acción, usualmente a través de un proceso de enumeración. Sin embargo, también puede ocurrir que el número de acciones posibles sea infinito, y en este caso, estaríamos hablando de un espacio de acciones continuo.

A lo largo de este texto, vamos a asumir que la política opera sobre un espacio de acciones discreto. El análisis y estudio de espacios de acciones continuos es un tema de gran profundidad y complejidad, y queda fuera del alcance de este libro. Además, no tiene ninguna relación con el ajedrez.

Las políticas deterministas se pueden representar mediante la siguiente función:

$$
f(\alpha) = \beta \\
\alpha \in E \\
\beta \in A
$$

donde:

- $\alpha$ representa el estado actual,
- $\beta$ es la acción a tomar,
- $E$ es el conjunto de todos los estados posibles,
- $A$ es el conjunto de todas las acciones posibles \\ 
  ($A=\{0,1,...,n-1\}$) y
- $n$ es el número total de acciones.

Dado que las acciones están enumeradas desde $0$ hasta $n-1$, cualquier número en ese rango podría ser retornado por la función. Si tenemos asociados los valores a las acciones para un estado en particular, podemos crear una política determinista sencilla: se seleccionará la acción con el valor más alto. A esta política se la llama "avariciosa" porque siempre elige la acción con el mayor valor. Esta política es óptima si los valores asociados a cada acción son los reales y no una aproximación. Sin embargo, como hemos visto, tener estos valores reales en la mayoría de los casos es inalcanzable.

La estructuración de las políticas no deterministas es un poco más compleja. En lugar de devolver un solo número, estas políticas devuelven un vector con $n$ elementos, donde $n$ es el número de acciones. Los elementos de este vector son probabilidades, de modo que el valor en la posición $i$ del vector representa la probabilidad de escoger la acción $i$. Al tratarse de probabilidades, la suma de todos los elementos del vector debe ser $1$. La función que representa estas políticas es la siguiente:

$$
f(\alpha) = \Delta \\
\alpha \in E \\
\Delta = \{\delta_0, ...,& \delta_{n-1}\}
$$

donde:

- $\alpha$ es el estado actual,
- $\Delta$ es la distribución de probabilidad de las acciones,
- $\delta_i$ es la probabilidad de que la acción $i$ sea seleccionada,
- $E$ es el conjunto de todos los estados posibles y
- $n$ es el número total de acciones.

Después de recibir la salida de esta función, se elige una acción de acuerdo con las probabilidades obtenidas. Esto permite al agente realizar una variedad de acciones en lugar de repetir siempre la misma, lo cual puede ser muy deseable cuando se enfrenta a adversarios humanos. Al igual que en el caso de las políticas deterministas, si disponemos de los valores asociados a las acciones, podemos transformarlos en una política no determinista utilizando la función Softmax (para más detalles, ver la sección de redes neuronales). Esta función, en términos generales, crea una distribución de probabilidad de tal manera que cuanto mayor sea el valor de una acción, mayor será su probabilidad de ser seleccionada.

En el caso del tablero de juego 2D descrito en la sección anterior, hay cuatro acciones posibles (arriba, derecha, abajo e izquierda). Enumeramos estas acciones de la siguiente manera para poder implementar las políticas:

$$
&0: \textrm{Arriba} \\
&1: \textrm{Derecha} \\
&2: \textrm{Abajo} \\
&3: \textrm{Izquierda} \\
$$

Dadas las recompensas esperadas (valores) mostradas en la Figura [referencia](#fig-recompensas-esperadas-para-calcular-la-politica-en-el-grid-de-2-dimensiones), podemos mostrar cómo seleccionaría las acciones una política determinista y una no determinista.

<figure id="fig-recompensas-esperadas-para-calcular-la-politica-en-el-grid-de-2-dimensiones">
  <img src="/assets/book/reward/values2.png" alt="Ilustración" loading="lazy" />
  <figcaption>Ilustración</figcaption>
</figure>

La pieza de juego está ubicada en la casilla inicial (esquina superior izquierda) y puede realizar las cuatro acciones. Dado que las casillas sin ningún valor tendrían un valor de $0$, la política determinista devolvería el valor 2, correspondiente a moverse hacia abajo. Este movimiento llevaría al estado con mayor valor. Siguiendo este procedimiento, la política determinista continuaría seleccionando el valor 2 hasta llegar a la esquina inferior izquierda. A partir de ese punto, sólo devolvería el valor 1, correspondiente al movimiento a la derecha, hasta llegar a la casilla final.

En el caso de la política no determinista, la selección de acciones sería algo más complicada ya que requiere el uso de la función Softmax. Al aplicar esta función a la casilla inicial, se obtendrían los siguientes resultados:

$$
\{0.2347 \ 0,2347 \ 0,2959 \ 0,2347\}
$$

La acción de moverse a la derecha tiene la mayor probabilidad de ser elegida, pero las otras opciones no están muy lejos. Esto es razonable dado que la diferencia de 0.24 a 0 es minúscula. A las políticas no deterministas se les suele añadir un parámetro llamado "temperatura", que permite controlar si se dan más probabilidades a las acciones con mayores valores o si todas las acciones tienen una probabilidad similar.

En la política existe un dilema muy importante conocido como el "dilema de exploración-explotación". Este dilema surge cuando el agente debe decidir entre explorar nuevas acciones (exploración) o intentar mejorar las acciones conocidas con variaciones mínimas (explotación). Si el agente se dedica a explorar todo el tiempo, las estimaciones pueden no ser realistas. Por otro lado, si se centra únicamente en la explotación, puede no encontrar la mejor solución, ya que puede que esté en caminos no explorados.

Para equilibrar este dilema, se suele utilizar un parámetro conocido como $\epsilon$ (épsilon). Este parámetro indica la probabilidad de elegir una acción de manera aleatoria. Por ejemplo, si $\epsilon$ es 0.05, entonces en el 5% de las situaciones se elegirá la acción al azar. Al principio, el valor de $\epsilon$ será muy cercano a 1, pero disminuirá progresivamente a medida que se realicen más episodios hasta que su valor sea insignificante o directamente 0.

De esta manera, se fomenta la exploración al principio del entrenamiento del agente y, a medida que avanza, se centra más en mejorar las estimaciones para las acciones conocidas. En el caso de las políticas no deterministas, se puede prescindir de $\epsilon$ y configurar la política de tal manera que se interese por las acciones no tomadas al principio. Sin embargo, en las políticas deterministas es prácticamente obligatorio usar este parámetro para lograr un buen rendimiento en el aprendizaje de la política.

Finalmente, en la política existe una división entre si usar la política aprendida para el entrenamiento (*on-policy*) o bien se usa una política diferente que la usada en el entrenamiento (*off-policy*).La principal diferencia es que en las políticas *on-policy*, la política que se va mejorando progresivamente se utiliza en el propio entrenamiento.

Además de la política, también puede ser útil conocer el comportamiento del entorno. Para ello, se busca obtener un "modelo" del entorno. Este modelo permite saber cómo reaccionará el entorno a las diferentes acciones.
