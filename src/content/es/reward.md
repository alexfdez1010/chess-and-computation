---
title: "Recompensa"
description: "La recompensa es un elemento clave en el aprendizaje reforzado, ya que proporciona a la inteligencia artificial (IA) retroalimentación respecto a su rendimiento, señalándole si su actuación es correcta o si."
chapter: "Aprendizaje profundo reforzado"
part: "book"
order: 13
bookChapter: "3"
bookChapterTitle: "Aprendizaje profundo reforzado"
sectionNumber: "3.1"
sectionTitle: "Recompensa"
navDepth: 2
pairedSlug: "reward"
source: "es/reward.tex"
draft: false
---

La recompensa es un elemento clave en el aprendizaje reforzado, ya que proporciona a la inteligencia artificial (IA) retroalimentación respecto a su rendimiento, señalándole si su actuación es correcta o si, por el contrario, deja mucho que desear. Cabe recordar que las recompensas se obtienen solo en los estados terminales, como sería el final de una partida de ajedrez. No obstante, la cantidad de estados no terminales suele ser mucho mayor, lo que obliga a evaluar correctamente el valor del estado actual.

Un método para llevar a cabo esta evaluación implica valorar los estados terminales a los que podría llegar la IA mediante la poda alfa-beta, presentada en el capítulo anterior. Sin embargo, debido a la inmensidad del árbol de búsqueda, esta estrategia no es factible. En el capítulo anterior también se discutió una solución a este problema: el uso de una heurística. En este contexto, se aplicará un procedimiento análogo, en el que la heurística se calculará a partir de la recompensa. A este valor se le denominará "recompensa esperada".

El cálculo directo de la recompensa esperada es inviable por el motivo previamente mencionado. No obstante, es posible obtener aproximaciones. Estas se calcularán a través de la simulación de numerosos episodios, un término genérico utilizado en el aprendizaje reforzado para referirse a todas las partidas del juego, como serían las partidas en el ajedrez. La estimación inicial se mejora a medida que se realizan más episodios, afinando la estimación de la recompensa esperada.

Para determinar la recompensa esperada, es necesario sumar todas las recompensas obtenidas en los estados posteriores hasta la conclusión del episodio. En el caso del ajedrez, este proceso se simplifica ya que la recompensa es cero en todos los estados no terminales. Además, se puede aplicar un "descuento" a la recompensa, lo que significa que cuanto más tiempo se tarde en obtener una recompensa, menor será su valor. Así, una recompensa de 1 obtenida en el estado actual tendrá más valor en la recompensa esperada que una recompensa de 1 obtenida tres estados después.

A continuación se presenta un ejemplo para solidificar estos conceptos. La Figura [referencia](#fig-juego-de-grid-de-2-dimensiones) muestra el juego en cuestión.

<figure id="fig-juego-de-grid-de-2-dimensiones">
  <img src="/assets/book/reward/game.png" alt="Juego de Grid de 2 dimensiones" loading="lazy" />
  <figcaption>Juego de <em>Grid</em> de 2 dimensiones</figcaption>
</figure>

El objetivo del juego es guiar la ficha negra hasta la casilla gris oscuro. Al llegar a la casilla gris oscuro, se obtiene una recompensa de 1. La ficha puede moverse arriba, abajo, a la derecha o a la izquierda. Si estos movimientos conducen a una posición fuera del tablero, el episodio finaliza con una recompensa de -0,5. Por tanto, la ficha debe alcanzar la casilla gris oscuro a través de un camino específico. Como la ficha no conoce este camino, el agente tendrá que descubrirlo a partir de las recompensas obtenidas. Una vez que un episodio termina, la ficha negra retorna a la posición inicial.

Inicialmente, se realiza un recorrido por el juego. El recorrido seguido se muestra en la Figura [referencia](#fig-primer-recorrido-en-el-grid-de-2-dimensiones).

<figure id="fig-primer-recorrido-en-el-grid-de-2-dimensiones">
  <img src="/assets/book/reward/path1.png" alt="Primer recorrido en el Grid de 2 dimensiones" loading="lazy" />
  <figcaption>Primer recorrido en el <em>Grid</em> de 2 dimensiones</figcaption>
</figure>

Con este recorrido, se logra finalizar el juego de manera exitosa. Por tanto, todos los estados recibirán una recompensa positiva. En este caso, se usará un factor de descuento $\gamma$ de 0,99, lo que significa que la recompensa esperada del estado siguiente se reducirá en un 0,99.

Con este factor de descuento, se puede calcular de manera sencilla la recompensa esperada para todos los estados por los que ha pasado el agente. La Figura [referencia](#fig-recompensas-esperadas-despues-del-primer-recorrido-en-el-grid-de-2-dimensiones) muestra el resultado de estos cálculos.

<figure id="fig-recompensas-esperadas-despues-del-primer-recorrido-en-el-grid-de-2-dimensiones">
  <img src="/assets/book/reward/values1.png" alt="Recompensas esperadas después del primer recorrido en el Grid de 2 dimensiones" loading="lazy" />
  <figcaption>Recompensas esperadas después del primer recorrido en el <em>Grid</em> de 2 dimensiones</figcaption>
</figure>

Se empieza con el estado terminal, que tiene una recompensa de 1. Se procede al penúltimo estado, multiplicando la recompensa del estado final por 0,99 y añadiendo la recompensa de este nuevo estado (en este caso 0). De esta forma, se obtiene la recompensa esperada de este estado. Este proceso se repite hasta llegar al estado inicial, que tiene una recompensa de 0,94 (todos los valores están redondeados a dos decimales).

Se realiza otro recorrido por el *Grid*, pero en esta ocasión no será tan exitoso y la ficha se saldrá del camino. El camino seguido se muestra en la Figura [referencia](#fig-segundo-recorrido-en-el-grid-de-2-dimensiones).

<figure id="fig-segundo-recorrido-en-el-grid-de-2-dimensiones">
  <img src="/assets/book/reward/path2.png" alt="Segundo recorrido en el Grid de 2 dimensiones" loading="lazy" />
  <figcaption>Segundo recorrido en el <em>Grid</em> de 2 dimensiones</figcaption>
</figure>

Ahora es el momento de actualizar las casillas por las que ha pasado la ficha. Su nuevo valor se calculará como la media de las recompensas esperadas del primer y segundo recorrido para las casillas que se incluyen en ambos caminos. La Figura [referencia](#fig-recompensas-esperadas-despues-del-segundo-recorrido-en-el-grid-de-2-dimensiones) muestra el resultado final de estos cálculos.

<figure id="fig-recompensas-esperadas-despues-del-segundo-recorrido-en-el-grid-de-2-dimensiones">
  <img src="/assets/book/reward/values2.png" alt="Recompensas esperadas después del segundo recorrido en el Grid de 2 dimensiones" loading="lazy" />
  <figcaption>Recompensas esperadas después del segundo recorrido en el <em>Grid</em> de 2 dimensiones</figcaption>
</figure>

Se comienza de nuevo por el estado terminal (la casilla con valor -0,5 que es donde la ficha se ha desviado del camino) y se procesa cada estado, calculando su nuevo valor tal y como se ha explicado anteriormente. Este proceso puede repetirse tantas veces como sea necesario. Aunque cuanto más se repite, más precisos serán los valores de cada estado, hay que tener en cuenta que esto conlleva un costo computacional.

El juego presentado anteriormente es totalmente determinista (se sabe a qué estado se pasará con cada acción), pero en algunos casos, una acción determinada podría conducir a diferentes estados según una distribución de probabilidad. El problema con este tipo de juegos es que el proceso que se ha seguido anteriormente ya no sería válido. Sin embargo, se puede solucionar de manera sencilla asignando los valores a la acción tomada en un estado específico, es decir, el valor se conoce a partir del estado y la acción tomada en ese estado.

Otro aspecto a considerar es determinar qué recorrido realizar. En el caso anterior, el recorrido ha sido aleatorio. Esta sería una política aleatoria. La política define qué acción tomar dada un estado en particular. Este tema se tratará en la próxima sección.
