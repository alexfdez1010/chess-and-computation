---
title: "Heurísticas"
description: "Una heurística es un método estratégico o una regla general que empleamos para simplificar la toma de decisiones o la resolución de problemas complejos."
chapter: "Inteligencia artificial"
part: "book"
order: 7
bookChapter: "2"
bookChapterTitle: "Inteligencia artificial"
sectionNumber: "2.4"
sectionTitle: "Heurísticas"
navDepth: 2
pairedSlug: "heuristics"
source: "es/heuristics.tex"
draft: false
---

Una heurística es un método estratégico o una regla general que empleamos para simplificar la toma de decisiones o la resolución de problemas complejos. Este concepto puede visualizarse como poseer una brújula mientras se navega por un bosque denso, en vez de un mapa detallado: aunque no asegura que encontraremos el camino más directo a nuestro destino, nos ayuda a evitar perdernos en el laberinto de la incertidumbre.

Las heurísticas nos facilitan la capacidad de tomar decisiones y actuar de manera rápida sin requerir un análisis profundo en cada opción que se nos presenta. En muchas situaciones, estas estrategias mentales resultan ser extremadamente útiles y eficientes. Sin embargo, es importante tener en cuenta que también pueden conducirnos a errores o sesgos cognitivos, dado que se fundamentan en simplificaciones de la realidad, no en su análisis detallado.

Un ejemplo claro de heurística es la regla "si todos los demás están haciendo algo, probablemente sea la mejor opción". Aunque en ciertos casos esta heurística puede resultar eficaz (por ejemplo, elegir un restaurante concurrido en lugar de uno vacío), no siempre asegura la elección óptima (como seguir una moda dañina o perjudicial simplemente porque es popular).

En contextos como el juego del ajedrez, las heurísticas se manifiestan como funciones que toman un estado (posición) como entrada y devuelven un valor numérico que refleja la "bondad" de ese estado. Es crucial comprender que las heurísticas son aproximaciones, ya que la calidad de un estado solo se puede determinar plenamente mediante el desarrollo del árbol de juego que se origina a partir de ese estado. Con las heurísticas, buscamos evitar precisamente ese despliegue completo. Podemos definir esta noción de manera más formal como sigue:

$$
f(\Theta) = \delta_\Theta
$$

| $\Theta$: Estado |
| --- |
| $\delta_\Theta$: Valor de la heurística asociado al estado $\Theta$ |
| $f(\Theta)$: Función heurística |

### Aplicación de las heurísticas al ajedrez

Tras haber establecido una definición abstracta de lo que constituye una heurística, procedamos a explorar cómo se aplica esta en el contexto del ajedrez. Una de las heurísticas más comúnmente utilizadas en ajedrez implica calcular la diferencia en "peones" entre los dos jugadores. Para ello, se asigna a cada pieza (con la excepción del rey) un valor basado en su relevancia estratégica en el juego. Luego, se calcula el valor total de las piezas para cada jugador y se resta el valor total de las piezas del jugador con las piezas negras del valor total de las piezas del jugador con las piezas blancas. En este sentido, si el resultado de esta heurística es positivo, las blancas están en una posición ventajosa; si es 0, la posición está equilibrada; y si es negativo, las negras tienen la superioridad.

A continuación, la [tabla de valores de las piezas](#fig-valor-en-peones-asociados-a-cada-pieza) muestra el valor asignado a cada pieza. Por supuesto, el valor de una pieza depende de su posición específica en el tablero, pero estas estimaciones suelen ser buenas aproximaciones en la mayoría de las situaciones.

<figure id="fig-valor-en-peones-asociados-a-cada-pieza">
  <div class="figure-table">
<table>
    <tr><th>Pieza</th><th>Valor (en peones)</th></tr>
    <tr><td>Dama</td><td>9</td></tr>
    <tr><td>Torre</td><td>5</td></tr>
    <tr><td>Alfil</td><td>3</td></tr>
    <tr><td>Caballo</td><td>3</td></tr>
    <tr><td>Peón</td><td>1</td></tr>
  </table>
  </div>
  <figcaption>Valor en peones asignado a cada pieza en el ajedrez</figcaption>
</figure>

Siguiendo una escala basada en peones, estos tienen un valor unitario de 1. El alfil y el caballo se les asigna un valor de 3, aunque algunas opiniones sostienen que los alfiles pueden ser ligeramente más valiosos que los caballos, atribuyéndoles un valor de 3,5 peones. La torre se valora en 5 peones, mientras que el valor de la dama depende de la presencia en el tablero de las torres correspondientes a su propio bando. Estas valoraciones de las piezas son el resultado de consensos empíricos de la comunidad ajedrecística a lo largo de los años y, de hecho, es una de las primeras cosas que aprenden los principiantes en este desafiante juego. Cabe destacar que el rey no se incluye en esta valoración debido a su importancia crítica en el juego: su captura termina la partida y siempre está presente en el tablero.

A continuación, se ilustra la aplicación de esta heurística con una posición específica, que se muestra en la [posición de ejemplo para calcular la heurística](#fig-posicion-de-ejemplo-para-calcular-la-heuristica).

<figure id="fig-posicion-de-ejemplo-para-calcular-la-heuristica">
  <div class="chessboard" data-fen="rnbqk1nr/ppp2ppp/8/4P3/1BP5/8/PP2KpPP/RN1Q1BNR b kq - 1 7" data-size="8" data-chess-options="&quot;maxfield=h8, setfen=rnbqk1nr/ppp2ppp/8/4P3/1BP5/8/PP2KpPP/RN1Q1BNR b kq - 1 7, largeboard&quot;" role="img" aria-label="Posición de ejemplo para calcular la heurística" data-rendered="source" data-board-asset="board-8x8-8a233edf3b81d5da.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-8a233edf3b81d5da.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Posición de ejemplo para calcular la heurística</figcaption>
</figure>

Primero, calculamos la suma de los valores de las piezas para cada bando. Las blancas poseen una dama, dos torres, dos alfiles, dos caballos y seis peones, dando un valor total de $9*1+5*2+3*2+3*2+1*6=37$. Por otro lado, las negras tienen una dama, dos torres, un alfil, dos caballos y siete peones, con un valor total de $9*1+5*2+3*1+3*2+1*7=35$. Finalmente, restamos el valor total de las piezas negras del valor total de las piezas blancas, obteniendo $37-35=2$, lo que indica que, según la heurística, las blancas tendrían una ventaja equivalente a dos peones. Pero ¿es esto correcto?

Sorprendentemente, la realidad contradice la predicción de la heurística. A pesar de que las blancas parecen tener una ventaja según la heurística, en realidad están en una posición perdedora y son las negras las que poseen una ventaja significativa después de la brillante jugada fxg1c.

Desafortunadamente, esta heurística primitiva no suele producir buenos resultados, ya que es demasiado materialista, preocupándose más por la cantidad de piezas que cada bando tiene que por su colocación en el tablero. Esto implica que no es capaz de evaluar adecuadamente la mayoría de las posiciones. Sin embargo, esta heurística proporciona una base sólida para el desarrollo de heurísticas más sofisticadas, que deberían incorporar conceptos más abstractos, como la ubicación de las torres en columnas abiertas, los alfiles en diagonales abiertas, etc. Con la introducción de estos conceptos más complejos, se podría obtener una heurística mucho más precisa.

Antes de la introducción del aprendizaje reforzado, las heurísticas creadas manualmente usadas por los principales módulos de ajedrez (programas de juego de ajedrez) tenían una gran complejidad, lo que les permitía evaluar adecuadamente posiciones estratégicas.

Ahora, podríamos preguntarnos: ¿No sería preferible que los módulos desarrollaran sus propias heurísticas a partir de la experiencia de jugar partidas? La respuesta es sí. Y tal como se mencionó en la sección 4.1, esto entraría en la categoría de aprendizaje automático, donde un algoritmo aprende basándose en su experiencia. Sin embargo, el desafío radica en que el algoritmo no recibirá una retroalimentación inmediata sobre si el movimiento que acaba de realizar es bueno o malo, sino que deberá esperar hasta el final de la partida. Además, dentro de las jugadas que haya realizado pueden haber tanto muy buenas como muy malas, por lo que para distinguirlas deberá jugar una gran cantidad de partidas e ir variando las jugadas para ver cuáles son las más efectivas.

El tipo de aprendizaje automático que mejor se adapta a esta situación es el aprendizaje reforzado y, combinado con redes neuronales profundas (aprendizaje reforzado profundo), ha permitido que los módulos de ajedrez alcancen niveles de juego anteriormente inimaginables.
