---
title: "Poda alfa-beta"
description: "La poda alfa-beta es una técnica eficiente que reduce drásticamente la cantidad de estados que se visitan en el árbol de juego del algoritmo minimax."
chapter: "Inteligencia artificial"
part: "book"
order: 9
bookChapter: "2"
bookChapterTitle: "Inteligencia artificial"
sectionNumber: "2.6"
sectionTitle: "Poda alfa-beta"
navDepth: 2
pairedSlug: "alpha-beta"
source: "es/alpha-beta.tex"
draft: false
---

La poda alfa-beta es una técnica eficiente que reduce drásticamente la cantidad de estados que se visitan en el árbol de juego del algoritmo minimax. Su objetivo principal es evitar explorar ramas del árbol de juego que no conducirán a resultados mejores que los ya encontrados. Esta estrategia se divide en dos variantes: la poda alfa, aplicada en los niveles de maximización, y la poda beta, utilizada en los niveles de minimización.

Para implementar la poda alfa-beta, se emplean dos valores: alfa ($\alpha$) y beta ($\beta$). El valor de alfa representa el mejor resultado obtenido hasta el momento durante la fase de maximización, mientras que el valor de beta cumplirá la misma función en la fase de minimización.

Los valores alfa y beta se transmiten de los padres a los hijos en el árbol de juego, pero no en la dirección opuesta. Además, los valores alfa y beta también pueden ser heredados entre hermanos.

En el contexto de la poda alfa-beta, se considera que un estado es el padre de otro estado si el primero se encuentra en el nivel inmediatamente superior al segundo y existe un enlace que los conecta. De manera inversa, se dice que un estado es el hijo de otro estado si el hijo está en el nivel inmediatamente inferior al padre y hay un enlace entre ellos. El concepto de hermano está estrechamente relacionado con estas dos relaciones. Se dice que un nodo (estado) es el hermano de otro estado si comparten el mismo padre. En los árboles por definición un nodo solo puede tener un padre.

Al calcular el valor de alfa se utiliza la siguiente fórmula:

$$
\alpha := \max(\alpha, \beta_{\text{hijo}})
$$

Esta fórmula se ejecuta una vez por cada hijo de un estado de maximización. Cada vez que se ejecuta, el valor de alfa se actualiza. Inicialmente, se establece $\alpha = -\infty$, lo que significa que cualquier número será mayor que este valor. Sin embargo, es importante destacar que el valor inicial de alfa puede ser obtenido a partir de los hermanos y el padre, lo cual se explicará detalladamente en un ejemplo posterior. Por lo tanto, no siempre será igual a $-\infty$.

Por otro lado, la fórmula para calcular el valor de beta es similar, pero en este caso se toma el mínimo y se utilizan los valores de alfa de los hijos:

$$
\beta := \min(\beta, \alpha_{\text{hijo}})
$$

Al igual que con alfa, esta fórmula se ejecuta la misma cantidad de veces que hijos tenga un estado de minimización. Si un estado de minimización no ha heredado el valor de su padre o de alguno de sus hermanos, se establece $\beta = +\infty$. Esto asegura que cualquier valor de alfa que se encuentre en los hijos será menor que el valor de beta.

En resumen, estas fórmulas permiten actualizar y mantener los valores de alfa y beta durante el proceso de búsqueda en el árbol de juego. La fórmula de alfa utiliza el máximo entre el valor actual de alfa y los valores de beta de los hijos, mientras que la fórmula de beta utiliza el mínimo entre el valor actual de beta y los valores de alfa de los hijos. Estas actualizaciones son esenciales para llevar a cabo las podas alfa-beta y optimizar la búsqueda del algoritmo minimax en el árbol de juego.

El proceso de poda ocurre de esta manera: si en algún punto mientras se explora el árbol, el valor de alfa es mayor o igual que beta, entonces sabemos que las próximas ramas o nodos que se iban a explorar en ese camino no van a cambiar el resultado, ya que alfa representa la mejor jugada que el jugador maximizador ya tiene garantizada, y beta representa la mejor jugada que el jugador minimizador ya tiene garantizada. Como resultado, no tiene sentido seguir explorando ese camino y es "podado".

La comprensión de la poda alfa-beta puede resultar desafiante sin ejemplos prácticos. Por lo tanto, a continuación se presentan tanto un ejemplo genérico como un ejemplo específico relacionado con el ajedrez, con el objetivo de facilitar la comprensión del algoritmo.

### Ejemplo genérico

El siguiente ejemplo aporta una extensión al presentado en el capítulo previo, con una sutil pero importante variante. En esta ocasión, cada nodo albergará no solo su valor propio, sino también un valor denominado $\alpha$ o $\beta$, de acuerdo con la alternancia correspondiente entre niveles: los niveles pares llevarán el valor $\beta$ y los impares el valor $\alpha$. La numeración de los niveles comienza desde cero.

Este esquema conlleva una particularidad: no será factible explorar el árbol nivel por nivel como se hizo en los ejemplos anteriores, pues necesitaremos hacer referencia a los valores $\alpha$ y $\beta$ de los nodos hermanos.

Sin más preámbulos, se presenta el ejemplo concreto en la siguiente figura, a la que haremos referencia como el [árbol de juego genérico con poda alfa-beta](#fig-arbol-de-juego-generico-con-poda-alfa-beta):

<figure id="fig-arbol-de-juego-generico-con-poda-alfa-beta">
  <img src="/assets/book/alpha-beta/initial.png" alt="Árbol de juego genérico con poda alfa-beta" loading="lazy" />
  <figcaption>Árbol de juego genérico con poda alfa-beta</figcaption>
</figure>

Iniciaremos nuestra exploración desde el extremo izquierdo del árbol. De haber optado por comenzar desde la derecha, hubiéramos obtenido un árbol ligeramente diferente, pero la evaluación en el nodo final hubiera permanecido invariable. Por tanto, ambas estrategias son válidas. Asimismo, si alteramos el orden de visita entre los nodos hermanos, el resultado final se mantiene, aunque el número de nodos a procesar puede variar. Lamentablemente, la determinación del orden óptimo para ordenar los nodos —de modo que minimice la cantidad de procesamiento— es imposible sin desarrollar el árbol en su totalidad. Tras la primera fase de resolución, obtendremos el árbol que se muestra en la [primera fase de resolución alfa-beta](#fig-primera-fase-de-resolucion-de-arbol-de-juego-generico-con-poda-alfa-beta).

<figure id="fig-primera-fase-de-resolucion-de-arbol-de-juego-generico-con-poda-alfa-beta">
  <img src="/assets/book/alpha-beta/phase1.png" alt="Primera fase de resolución de árbol de juego genérico con poda alfa-beta" loading="lazy" />
  <figcaption>Primera fase de resolución de árbol de juego genérico con poda alfa-beta</figcaption>
</figure>

El nodo procesado, que es el primer elemento del nivel 2, tiene asignado un valor heurístico de 5. Este valor se obtiene al ser el máximo entre 1 y 5. Además, como el nodo es de maximización y es el primer nodo procesado en ese nivel, se le asigna un valor de beta de $+\infty$ (infinito positivo). A continuación, al explorar el nodo hermano de este, se obtiene el árbol representado en la [segunda fase de resolución alfa-beta](#fig-segunda-fase-de-resolucion-de-arbol-de-juego-generico-con-poda-alfa-beta), correspondiente a la segunda fase de resolución del árbol de juego genérico con poda alfa-beta.

<figure id="fig-segunda-fase-de-resolucion-de-arbol-de-juego-generico-con-poda-alfa-beta">
  <img src="/assets/book/alpha-beta/phase2.png" alt="Segunda fase de resolución de árbol de juego genérico con poda alfa-beta" loading="lazy" />
  <figcaption>Segunda fase de resolución de árbol de juego genérico con poda alfa-beta</figcaption>
</figure>

En este caso, lamentablemente, no se ha obtenido una ventaja significativa, ya que se ha tenido que procesar el mismo número de nodos que si se hubiera utilizado el algoritmo minimax. Esto suele ser común al principio del árbol.

La beta del hermano del nodo procesado en el primer paso tiene un valor de 5, ya que se ha actualizado según la fórmula y ha tomado el valor de 5 de su hermano. A continuación, se asciende un nivel y se llega al nodo padre de estos, el cual tiene un valor de 2. El valor de $\alpha$ de este nodo es menos infinito, dado que es el primer nodo procesado de entre sus hermanos.

En la siguiente fase, se procede a procesar el segundo hijo del nodo inicial, como se muestra en la [tercera fase de resolución alfa-beta](#fig-tercera-fase-de-resolucion-de-arbol-de-juego-generico-con-poda-alfa-beta).

<figure id="fig-tercera-fase-de-resolucion-de-arbol-de-juego-generico-con-poda-alfa-beta">
  <img src="/assets/book/alpha-beta/phase3.png" alt="Tercera fase de resolución de árbol de juego genérico con poda alfa-beta" loading="lazy" />
  <figcaption>Tercera fase de resolución de árbol de juego genérico con poda alfa-beta</figcaption>
</figure>

En la etapa inicial, se procede a procesar el hijo izquierdo del segundo hijo del nodo inicial. Este nodo obtiene un valor de 1. Dado que la $\alpha$ actual es 2, se activa la poda alfa, lo que implica que no será necesario procesar ningún otro hijo de este nodo. Por esta razón, no es procesado y muestra con un corte esa parte del árbol.

La lógica detrás de esta poda es que no se puede obtener un valor mejor que 1 en este nodo, ya que al ser un nodo de minimización, siempre se elegirá el valor 1 o uno menor en otro hijo. Además, dado que el valor de $\alpha$ es 2 y este es mayor que 1, no se incrementa.

En la última etapa, se procede a procesar el hijo más a la derecha del nodo inicial, lo que resulta en los resultados mostrados en la [fase final de resolución alfa-beta](#fig-ultima-fase-de-resolucion-de-arbol-de-juego-generico-para-mostrar-la-poda-alfa-beta).

<figure id="fig-ultima-fase-de-resolucion-de-arbol-de-juego-generico-para-mostrar-la-poda-alfa-beta">
  <img src="/assets/book/alpha-beta/phase4.png" alt="Última fase de resolución de árbol de juego genérico para mostrar la poda alfa-beta" loading="lazy" />
  <figcaption>Última fase de resolución de árbol de juego genérico para mostrar la poda alfa-beta</figcaption>
</figure>

En el primer hijo del nodo procesado, se asigna un valor de beta de 3 a su hermano. Al explorar los hijos de ese hermano y obtener los valores de 0 y 1, se continúa evaluando los otros hijos solo si ninguno de ellos es mayor que 3. En este caso, como el valor máximo obtenido es 1 en el nodo central del nodo procesado, se actualiza el valor de beta a 1.

Al subir al siguiente nivel, se recibe el valor de 1 desde ese nodo, y al ser el valor de alfa 2 proveniente de su hermano, se realiza una poda alfa y no es necesario continuar evaluando los otros hijos.

Finalmente, se obtiene el valor del nodo inicial, que es el máximo entre los valores de sus hijos, lo que resulta en un valor de 2. El valor de beta es $+\infty$ ya que no tiene ningún hermano ni padre que establezca un valor límite.

### Ejemplo aplicado al ajedrez

En el caso del ajedrez, el funcionamiento del algoritmo alfa-beta es exactamente igual al ejemplo genérico anteriormente presentado. Por lo tanto, en esta sección nos centraremos en las implicaciones y la importancia del orden en el que se visitan los nodos.

El [ejemplo de poda alfa-beta aplicado al ajedrez](#fig-ejemplo-de-poda-alfa-beta-aplicado-al-ajedrez) muestra el ejemplo específico que se va a tratar, el cual es el mismo que se presentó en la [cuarta fase de Minimax](/es/min-max#fig-cuarta-fase-del-ejemplo-de-minimax-aplicado-al-ajedrez) en la sección anterior, relacionada con el algoritmo minimax.

<figure id="fig-ejemplo-de-poda-alfa-beta-aplicado-al-ajedrez">
  <img src="/assets/book/min-max/example5.png" alt="Ejemplo de poda alfa-beta aplicado al ajedrez" loading="lazy" />
  <figcaption>Ejemplo de poda alfa-beta aplicado al ajedrez</figcaption>
</figure>

Al crear los órdenes para recorrer los árboles, es importante recordar dos reglas básicas:

- Un nodo solo puede ser procesado si se han procesado previamente sus hijos.
- Si se sigue un recorrido de izquierda a derecha, se procesan primero los nodos situados más a la izquierda que aún no han sido procesados, y viceversa.

A continuación, se utilizará el recorrido habitual comenzando desde la izquierda y avanzando hacia la derecha. Por lo tanto, el orden de procesamiento será el siguiente:

$$
\textit{P10} \rightarrow \textit{P11} \rightarrow \textit{P05} \rightarrow \textit{P12} \rightarrow \textit{P06} \rightarrow \textit{P02}
$$

$$
\textit{P07} \rightarrow \textit{P03} \rightarrow \textit{P08} \rightarrow \textit{P09} \rightarrow \textit{P04} \rightarrow \textit{P01}
$$

El [árbol alfa-beta de izquierda a derecha](#fig-ejemplo-de-poda-alfa-beta-aplicado-al-ajedrez-usando-orden-izquierda-derecha) muestra el árbol usando el recorrido de izquierda-derecha descrito anteriormente.

<figure id="fig-ejemplo-de-poda-alfa-beta-aplicado-al-ajedrez-usando-orden-izquierda-derecha">
  <img src="/assets/book/min-max/example5.png" alt="Ejemplo de poda alfa beta aplicado al ajedrez usando orden izquierda-derecha" loading="lazy" />
  <figcaption>Ejemplo de poda alfa beta aplicado al ajedrez usando orden izquierda-derecha</figcaption>
</figure>

Como se puede observar, en este orden de recorrido no se descarta ningún nodo. Esto indica que no se obtendría ninguna mejora al utilizar el complejo algoritmo de poda alfa-beta en lugar del sencillo algoritmo minimax.

En el siguiente caso, se cambiará el orden y se seguirá un recorrido de derecha a izquierda sobre el mismo árbol. Por lo tanto, el nuevo orden de procesamiento será el siguiente:

$$
\textit{P09} \rightarrow \textit{P08} \rightarrow \textit{P04} \rightarrow \textit{P07} \rightarrow \textit{P03} \rightarrow \textit{P12}
$$

$$
\textit{P06} \rightarrow \textit{P11} \rightarrow \textit{P10} \rightarrow \textit{P05} \rightarrow \textit{P02} \rightarrow \textit{P01}
$$

<figure id="fig-ejemplo-de-poda-alfa-beta-aplicado-al-ajedrez-usando-orden-derecha-izquierda">
  <div class="localized-diagram" data-diagram="alpha-beta" data-label="Ejemplo de poda alfa beta aplicado al ajedrez usando orden derecha-izquierda" role="img" aria-label="Ejemplo de poda alfa beta aplicado al ajedrez usando orden derecha-izquierda">Ejemplo de poda alfa beta aplicado al ajedrez usando orden derecha-izquierda</div>
  <figcaption>Ejemplo de poda alfa beta aplicado al ajedrez usando orden derecha-izquierda</figcaption>
</figure>

Con el cambio de orden, se ha logrado una mejora sustancial. Ahora, no es necesario visitar tres de los nodos del árbol original (P05, P10 y P11). Esto se debe a que cuando el nodo P02 recibe el valor del nodo P06, que es 0.20, tiene un valor de alfa más alto, lo que activa la poda alfa y no es necesario generar más nodos hijos para el nodo P02.

Como conclusión de ambos ejemplos, se puede afirmar que la poda alfa-beta puede reducir significativamente el número de nodos que se deben procesar. En el último ejemplo, se eliminan 3 nodos de un total de 12, lo que representa un 25% de los nodos eliminados. Cuanto más grande sea el árbol, mayor será el porcentaje de nodos que se pueden eliminar utilizando este procedimiento, llegando a niveles superiores al 50% de eliminación en algunos casos.

Otra conclusión importante es la relevancia del orden en el que se procesan los nodos. Para seleccionar este orden, también se pueden utilizar heurísticas, procesando primero aquellos nodos cuya heurística tenga un valor mayor. Esto puede ayudar a mejorar aún más la eficiencia de la poda alfa-beta al reducir la cantidad de nodos a considerar en cada nivel del árbol.
