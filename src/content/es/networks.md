---
title: "Redes neuronales"
description: "En los últimos años, las redes neuronales y el aprendizaje reforzado han sido los principales impulsores del increíble avance de la inteligencia artificial."
chapter: "Aprendizaje profundo reforzado"
part: "book"
order: 17
bookChapter: "3"
bookChapterTitle: "Aprendizaje profundo reforzado"
sectionNumber: "3.5"
sectionTitle: "Redes neuronales"
navDepth: 2
pairedSlug: "networks"
source: "es/networks.tex"
draft: false
---

En los últimos años, las redes neuronales y el aprendizaje reforzado han sido los principales impulsores del increíble avance de la inteligencia artificial. En teoría, las redes neuronales son capaces de aprender cualquier función dada una entrada y la salida esperada. Aunque en la práctica no es tan sencillo, siguen logrando resultados sorprendentes.

En general, las redes neuronales se dividen en capas. Cada capa aplica una función a la salida de la capa anterior. Al finalizar este proceso, se compara la salida de la última capa con la salida esperada. Esta comparación permite que la red neuronal determine qué aspectos de sus parámetros internos deben modificarse para mejorar en el futuro.

Existen capas simples, como los perceptrones, y capas más complejas, como las capas convolucionales o recursivas, entre otras. Además, al final de cada capa se aplica una función de activación, que agrega no linealidad a la salida. Esta función de activación suele ser una función no lineal sin parámetros ajustables. Se utiliza para modelar características no lineales del modelo, es decir, aquellas en las que un cambio en una característica no implica un cambio proporcional en la salida.

### Perceptrón

El elemento fundamental de las redes neuronales es el perceptrón. Se trata de un componente muy simple que recibe varias entradas y produce una salida. Sin embargo, cuando múltiples perceptrones actúan en conjunto, logran un rendimiento sorprendente. La Figura [referencia](#fig-perceptron-con-3-entradas) muestra un perceptrón simple con tres entradas.

<figure id="fig-perceptron-con-3-entradas">
  <img src="/assets/book/networks/perceptron.png" alt="Perceptrón con 3 entradas" loading="lazy" />
  <figcaption>Perceptrón con 3 entradas</figcaption>
</figure>

A partir de la imagen anterior, podemos establecer una definición matemática utilizando la siguiente función:

$$
f(x) = b + \sum_{i=0}^{2}x_iw_i
$$

Generalizando esta definición para $n$ entradas, obtendríamos lo siguiente:

$$
f(x) = b + \sum_{i=0}^{n-1}x_iw_i
$$

Aquí, $x_i$ representa las entradas que se multiplican por sus respectivos pesos $w_i$, y luego se les suma el valor $b$. Por lo tanto, los parámetros a aprender son $b$ y todos los pesos $w_i$. Normalmente, se utiliza una notación vectorial para expresar el perceptrón, donde tanto las entradas como los parámetros se representan como vectores. La notación utilizada para el perceptrón de la Figura [referencia](#fig-perceptron-con-3-entradas) sería la siguiente:

<figure id="fig-representacion-vectorial-del-perceptron-de-3-entradas">
  <div class="figure-equation" data-math="\begin{bmatrix}
                1 &amp; x_0 &amp; x_1 &amp; x_2 \\
            \end{bmatrix}" aria-label="bmatrix 1 &amp; x0 &amp; x1 &amp; x2 \\ bmatrix"></div>
  <div class="figure-equation" data-math="\begin{bmatrix}
                b \\
                w_0 \\
                w_1 \\
                w_2 \\
            \end{bmatrix}" aria-label="bmatrix b \\ w0 \\ w1 \\ w2 \\ bmatrix"></div>
  <figcaption>Representación vectorial del perceptrón de 3 entradas</figcaption>
</figure>

Esta representación presenta una peculiaridad. La primera entrada, con un valor de $1$, es fija y no se considera una entrada propiamente dicha. Se representa de esta manera para poder sumar directamente el producto de los dos vectores finales al valor de $b$. La generalización de esta definición para $n$ entradas es sencilla a partir de este ejemplo. Simplemente se deben agregar las entradas y parámetros a sus respectivos vectores, sin olvidar incluir $1$ y $b$ al inicio de los vectores.

Además, esta representación resulta muy útil cuando se tienen varios perceptrones en la misma capa, ya que al representar los parámetros de cada uno en un vector, se pueden combinar todos los vectores en una matriz. Por ejemplo, consideremos una capa con tres perceptrones y tres entradas. Podríamos representarlos de la siguiente manera utilizando matrices:

<figure id="fig-representacion-matricial-de-la-capa-de-perceptrones-de-3-entradas">
  <div class="figure-equation" data-math="\begin{bmatrix}
                1 &amp; x_0 &amp; x_1 &amp; x_2 \\
            \end{bmatrix}" aria-label="bmatrix 1 &amp; x0 &amp; x1 &amp; x2 \\ bmatrix"></div>
  <div class="figure-equation" data-math="\begin{bmatrix}
                b_0 &amp; b_1 &amp; b_2 \\
                w_{00} &amp; w_{01} &amp; w_{02} \\
                w_{10} &amp; w_{11} &amp; w_{12} \\
                w_{20} &amp; w_{21} &amp; w_{22} \\
            \end{bmatrix}" aria-label="bmatrix b0 &amp; b1 &amp; b2 \\ w00 &amp; w01 &amp; w02 \\ w10 &amp; w11 &amp; w12 \\ w20 &amp; w21 &amp; w22 \\ bmatrix"></div>
  <figcaption>Representación matricial de la capa de perceptrones de 3 entradas</figcaption>
</figure>

En la Figura [referencia](#fig-representacion-matricial-de-la-capa-de-perceptrones-de-3-entradas), el peso $w_{ij}$ se refiere al peso $i$ asociado al perceptrón $j$. Es importante destacar que la entrada se mantiene constante sin importar el número de perceptrones en la capa. Para obtener las salidas, solo es necesario realizar una multiplicación matricial, que consiste en multiplicar uno a uno cada elemento de los vectores de parámetros con el vector de entrada. La Figura [referencia](#fig-representacion-matricial-de-la-salida-de-la-capa-de-perceptrones-de-3-entradas) ilustra cómo sería la salida utilizando la misma representación.

<figure id="fig-representacion-matricial-de-la-salida-de-la-capa-de-perceptrones-de-3-entradas">
  <div class="figure-equation" data-math="\begin{bmatrix}
            1 &amp; x_0 &amp; x_1 &amp; x_2 \\
        \end{bmatrix}
        \times
        \begin{bmatrix}
            b_0 &amp; b_1 &amp; b_2 \\
            w_{00} &amp; w_{01} &amp; w_{02} \\
            w_{10} &amp; w_{11} &amp; w_{12} \\
            w_{20} &amp; w_{21} &amp; w_{22} \\
        \end{bmatrix}
        =
        \begin{bmatrix}
            y_0 &amp; y_1 &amp; y_2
        \end{bmatrix}
        \\" aria-label="bmatrix 1 &amp; x0 &amp; x1 &amp; x2 \\ bmatrix bmatrix b0 &amp; b1 &amp; b2 \\ w00 &amp; w01 &amp; w02 \\ w10 &amp; w11 &amp; w12 \\ w20 &amp; w21 &amp; w22 \\ bmatrix = bmatrix y0 &amp; y1 &amp; y2 bmatrix \\"></div>
  <figcaption>Representación matricial de la salida de la capa de perceptrones de 3 entradas</figcaption>
</figure>

La multiplicación de matrices se realiza en la práctica aplicando las fórmulas mostradas en la Figura [referencia](#fig-formula-directa-para-calcular-la-salida-de-capa-de-perceptrones-de-3-entradas). Estas fórmulas representan el proceso directo para calcular la salida de una capa de perceptrones de 3 entradas.

<figure id="fig-formula-directa-para-calcular-la-salida-de-capa-de-perceptrones-de-3-entradas">
  <div class="figure-equation" data-math="y_0 = b_0 + \sum_{i=0}^{2}x_{i0}w_{i0}" aria-label="y0 = b0 + i=0^2xi0wi0"></div>
  <div class="figure-equation" data-math="y_1 = b_1 + \sum_{i=0}^{2}x_{i1}w_{i1}" aria-label="y1 = b1 + i=0^2xi1wi1"></div>
  <div class="figure-equation" data-math="y_2 = b_2 + \sum_{i=0}^{2}x_{i2}w_{i2}" aria-label="y2 = b2 + i=0^2xi2wi2"></div>
  <figcaption>Fórmula directa para calcular la salida de capa de perceptrones de 3 entradas</figcaption>
</figure>

El proceso de aprendizaje de los perceptrones es bastante simple. Comparan la salida obtenida por el perceptrón con la salida esperada y utilizan la diferencia entre ambas para ajustar los pesos. Sin embargo, el principal problema de los perceptrones radica en su naturaleza totalmente lineal, lo cual se hace evidente al representarlos mediante vectores y matrices. Para superar esta limitación, se aplica una función de activación a la salida del perceptrón, lo que introduce no linealidad en el proceso.

Al tratar con imágenes, surgen nuevos desafíos. Las imágenes se representan mediante matrices, donde cada posición corresponde a un píxel y cada matriz indica la intensidad de un color u otros atributos relacionados con ese píxel. Sin embargo, los perceptrones no pueden procesar directamente estas matrices, ya que se requiere convertirlas en vectores. Sin embargo, esta conversión implica la pérdida de información sobre la disposición espacial de los píxeles y su relación entre sí. Elementos que estaban contiguos en la matriz pueden estar muy separados en el vector resultante. Esta información espacial es crucial para el procesamiento de imágenes (y el ajedrez), por lo que se necesita un método alternativo.

Afortunadamente, existe un procedimiento altamente efectivo conocido como convolución, el cual aborda esta problemática. La convolución permite preservar la estructura espacial de las imágenes al procesarlas, lo que resulta fundamental para tareas como el reconocimiento de objetos y la extracción de características.

### Convolución

La convolución se asemeja al funcionamiento de un perceptrón, pero opera en regiones cuadradas (en ocasiones excepcionales se pueden usar secciones rectangulares) de una imagen. Para comprender mejor el funcionamiento de una capa de convolución, es útil utilizar un ejemplo. En la Figura [referencia](#fig-ejemplo-de-convolucion), se muestra la configuración inicial de la entrada y los parámetros de la convolución.

<figure id="fig-ejemplo-de-convolucion">
  <div class="figure-equation" data-math="\begin{bmatrix}
                0,24 &amp; 0,12 &amp; 0,09 \\
                0,13 &amp; 0,13 &amp; 0,21 \\
                0,05 &amp; 0,12 &amp; 0,24 \\
            \end{bmatrix}" aria-label="bmatrix 0,24 &amp; 0,12 &amp; 0,09 \\ 0,13 &amp; 0,13 &amp; 0,21 \\ 0,05 &amp; 0,12 &amp; 0,24 \\ bmatrix"></div>
  <div class="figure-equation" data-math="\begin{bmatrix}
                0,56 &amp; -0,54 \\
                0,07 &amp; 0,32 \\
            \end{bmatrix}" aria-label="bmatrix 0,56 &amp; -0,54 \\ 0,07 &amp; 0,32 \\ bmatrix"></div>
  <figcaption>Ejemplo de convolución</figcaption>
</figure>

En este ejemplo, utilizaremos un *stride* (desplazamiento) con un valor de 1 y un valor de $b=1$ (que se suma de manera similar a los perceptrones). Con la configuración actual, se realizarán un total de 4 convoluciones. En la Figura [referencia](#fig-convoluciones-realizadas-en-el-ejemplo), se muestra cómo se llevarían a cabo las convoluciones.

<figure id="fig-convoluciones-realizadas-en-el-ejemplo">
  <img src="/assets/book/networks/convolution1.png" alt="Convoluciones realizadas en el ejemplo" loading="lazy" />
  <img src="/assets/book/networks/convolution2.png" alt="Convoluciones realizadas en el ejemplo" loading="lazy" />
  <img src="/assets/book/networks/convolution3.png" alt="Convoluciones realizadas en el ejemplo" loading="lazy" />
  <img src="/assets/book/networks/convolution4.png" alt="Convoluciones realizadas en el ejemplo" loading="lazy" />
  <figcaption>Convoluciones realizadas en el ejemplo</figcaption>
</figure>

Dado que se realizarán cuatro convoluciones, la salida resultante será una matriz de tamaño $2 \times 2$. Para obtener el resultado de cada convolución, se multiplica la entrada (la región sombreada en cada convolución) por los parámetros correspondientes de la convolución. Luego se suman todos estos resultados y se le agrega $b$, lo cual será el valor de salida para esa convolución específica. La Figura [referencia](#fig-salida-de-la-convolucion-de-ejemplo) muestra la salida obtenida al aplicar la convolución.

<figure id="fig-salida-de-la-convolucion-de-ejemplo">
  <div class="figure-equation" data-math="\begin{bmatrix}
            1,12 &amp; 1,1 \\
            1,05 &amp; 1,05 \\
        \end{bmatrix}" aria-label="bmatrix 1,12 &amp; 1,1 \\ 1,05 &amp; 1,05 \\ bmatrix"></div>
  <figcaption>Salida de la convolución de ejemplo</figcaption>
</figure>

En el análisis detallado de la operación de convolución, observamos que el componente situado en el vértice superior izquierdo del resultado se determina a través de un cálculo específico: se realiza la suma de las multiplicaciones de cada elemento del kernel de convolución con el píxel correspondiente de la imagen de entrada. Para ejemplificar, consideremos los siguientes valores: $0.24, 0.12, 0.13, 0.13$, los cuales son multiplicados respectivamente por $0.56, -0.54, 0.07, 0.32$ para luego ser sumados entre sí y finalmente se añade una constante $1$, el término de sesgo denotado por $b=1$. De este modo, el valor calculado para el componente en la esquina superior izquierda es $1.12$.

Un parámetro importante en el proceso de convolución es el denominado *padding*. Este procedimiento implica el incremento del tamaño de las imágenes a través de la adición de ceros en los bordes de la misma. La utilidad de esta técnica radica en su capacidad de permitir realizar convoluciones de manera más eficaz y precisa en las regiones periféricas de las imágenes, en especial cerca de las esquinas.

En conjunción con las operaciones de convolución, se utiliza comúnmente una capa de *pooling* en las redes neuronales convolucionales. Esta capa desempeña un papel crucial en la disminución del tamaño de la salida conservando, al mismo tiempo, la información más significativa. A pesar de su semejanza con las convoluciones, al seleccionar bloques de la entrada, la capa de *pooling* se distingue por no poseer parámetros propios para aprender. Existen principalmente dos tipos de operaciones de *pooling*: el *max pooling*, que selecciona el valor máximo del bloque de entrada, y el *average pooling*, que calcula la media de todos los valores en dicho bloque. Ambos métodos de *pooling* consisten en convertir, en la práctica, un conjunto de píxeles (como los agrupados en cuadrados de 4, 9, 16, entre otros) en un solo píxel, logrando así una reducción en la complejidad.

### Funciones de activación

Las funciones de activación desempeñan un papel fundamental al ampliar las capacidades de las redes neuronales en diversos ámbitos, al proporcionarles características no lineales, las cuales son necesarias en la mayoría de los problemas. Estas funciones generalmente no requieren parámetros y tres de las más relevantes son ReLU, Sigmoid y Softmax.

ReLU (Rectified Linear Unit) es ampliamente utilizada en las capas intermedias de las redes neuronales, es decir, en todas las capas excepto la última. Su funcionamiento es bastante simple. Si la entrada es positiva, se mantiene sin cambios, pero si es negativa, se convierte en cero. Matemáticamente, se define de la siguiente manera:

$$
f(x) = 
    \begin{cases}
    x, \textrm{ si } x \ge 0 \\
    0, \textrm{ si } x < 0
    \end{cases}
$$

Es comúnmente reconocido que el uso de ReLU, posterior a las operaciones de convolución, proporciona buenos resultados. De manera predeterminada, esta capa se implementa en las etapas intermedias de la red neuronal (todas las capas excepto la última). Para la última capa, es preferible utilizar distintos tipos de funciones de activación que limiten el rango de los valores posibles a un subconjunto más reducido. Algunas de las más destacadas son las funciones Sigmoid, Softmax y la tangente hiperbólica. Esta última se analizará en detalle en el capítulo dedicado a AlphaZero. Estas funciones restringen los valores a estar entre 0 y 1 para Sigmoid y Softmax, y entre -1 y 1 para la tangente hiperbólica.

Las funciones Sigmoid y Softmax comparten un propósito común: transformar la salida en una distribución de probabilidad (Sigmoid también se puede utilizar para regresiones en el intervalo $(0,1)$). La diferencia radica en que la función Sigmoid se aplica sobre un solo perceptrón, mientras que la función Softmax puede aplicarse sobre dos o más perceptrones. Por ende, Sigmoid es útil para decisiones binarias (por ejemplo, determinar si un objeto pertenece o no a una categoría), mientras que Softmax puede generalizarse a tantas categorías como se desee. Por lo tanto, la elección entre ambas dependerá del número de categorías que se necesite clasificar.

La función Sigmoid se define matemáticamente de la siguiente forma:

$$
f(x) = \frac{1}{1 + e^{-x}}
$$

Indistintamente de qué tan grande o pequeño sea el valor de $x$, este nunca excederá los límites de 1 y 0 respectivamente. Si $x$ es igual a 0, el resultado será $1/2$, por lo que todos los valores positivos estarán en el intervalo $(\frac{1}{2}, 1)$ y los negativos en $(0, \frac{1}{2})$.

Por su parte, la función Softmax permite transformar un conjunto de valores en una distribución de probabilidad, de manera tal que los valores más altos posean mayor probabilidad de ocurrir que aquellos con valores más bajos. Esta transformación se realiza mediante el uso de la función exponencial. La definición matemática de Softmax es:

$$
f(x_i) = \frac{e^{x_i}}{\sum_{i=1}^{n}e^{x_i}}
$$

El denominador en esta fracción corresponde a la suma de todos los valores de entrada $x_i$, cada uno elevado a la potencia de $e$, mientras que el numerador corresponde al valor $x_i$ individual, también elevado a $e$.

Para ilustrar el funcionamiento de la función Softmax, consideremos el siguiente vector:

$$
\begin{bmatrix}
    1 & 4 & 3 & 1
    \end{bmatrix}
$$

Primero, se calcula el denominador común a los cuatro elementos, que resulta ser 80.12. Luego, se procesa cada elemento del vector individualmente, obteniendo los siguientes resultados:

$$
\begin{bmatrix}
0,034 & 0,681 & 0,251 & 0,034
\end{bmatrix}
$$

Como se puede observar, el elemento con valor 4 en el vector original es el que predomina con una probabilidad de 0,681 de ocurrir. También es importante notar que la suma de todos los elementos es 1, corroborando que la función Softmax ha convertido el vector original en una distribución de probabilidad. Softmax es frecuentemente utilizada en problemas de clasificación multiclase (más de dos clases) y en situaciones donde se necesita seleccionar una acción de manera no determinista.

### *Backpropagation*

*Backpropagation* es el algoritmo que facilita el cálculo de las actualizaciones requeridas para todos los parámetros de una red neuronal. Tal como se mencionó anteriormente, cuando se cuenta con una sola capa, el cálculo de las actualizaciones de los pesos es bastante sencillo. Sin embargo, cuando el número de capas incrementa, este proceso se vuelve más complejo. Afortunadamente, el algoritmo de *backpropagation* simplifica enormemente esta tarea mediante el uso de derivadas.

El funcionamiento de este algoritmo se basa en primer lugar en el cálculo secuencial de las capas de la red neuronal, almacenando información relevante como la salida de cada una de estas capas. Al llegar al final, se compara la salida obtenida de la red neuronal con la salida esperada, utilizando para ello una función de pérdida. Esta función generará un número que indicará cuán distantes están ambas salidas; a mayor número, peor será el rendimiento de la red neuronal.

El siguiente paso es la "propagación hacia atrás", que es la esencia del algoritmo. Partiendo de la pérdida, se recorre cada capa comenzando por la última, modificando los parámetros de la red neuronal. Dentro de este proceso existe un subalgoritmo llamado optimizador, cuyo objetivo es minimizar la función de pérdida.

La función de pérdida tiene dos parámetros: la salida esperada $y$ y la salida generada por la red neuronal $\hat{y}$. La definición matemática de la función de pérdida sería:

$$
f(\hat{y},y) = \alpha
$$

Donde $\alpha$ representa el valor correspondiente a la pérdida. Sin embargo, las entradas a la función de pérdida pueden ser heterogéneas, y pueden incluso ser de diferente tipo. Un escenario común es cuando la salida de la red neuronal es una distribución de probabilidad, mientras que la salida esperada es simplemente un número que indica la acción; en tal caso, se elegirá la probabilidad de ejecutar esa acción según la distribución de probabilidad.

La elección de la función de pérdida está estrechamente ligada al tipo de problema que se busca resolver. Así, si el problema es de clasificación, la función de pérdida será muy distinta a la que se usaría en un problema de regresión.

El optimizador busca minimizar la función de pérdida, actuando como una especie de "guía" para la red neuronal. El método habitual para conseguir esto es el descenso de gradiente, que tiene como objetivo encontrar los valores mínimos de una función, en este caso, la función de pérdida. El optimizador utiliza el descenso de gradiente junto con la modificación de otros parámetros, principalmente el coeficiente de aprendizaje (que indica cuánto se modifican los parámetros de la red neuronal) para optimizar el rendimiento de la red.

Entre los optimizadores disponibles para las redes neuronales, uno de los más utilizados es el SGD (Stochastic Gradient Descent). Este algoritmo implementa una versión del descenso de gradiente que introduce variaciones aleatorias con el propósito de evitar quedar atrapado en óptimos locales. Los óptimos locales son puntos en los que la función alcanza un valor mínimo en una región específica del espacio de búsqueda, pero que no necesariamente representan el valor mínimo global de la función. Estos óptimos locales pueden limitar la capacidad del optimizador para encontrar la solución más óptima, de ahí la importancia de tener estrategias para evitarlos.

El SGD resuelve este problema al introducir un elemento de aleatoriedad en el proceso de descenso del gradiente. En lugar de utilizar todo el conjunto de datos para calcular el gradiente en cada paso (como se hace en el descenso de gradiente estándar), el SGD selecciona un subconjunto aleatorio (o incluso un solo ejemplo) para hacer el cálculo. Esto introduce una variabilidad que puede ayudar a salir de los óptimos locales.

Otro optimizador destacable es Adam (Adaptive Moment Estimation), que es una extensión del SGD que introduce varias mejoras. La primera de estas mejoras es el uso de tasas de aprendizaje adaptativas, que significa que Adam ajusta la tasa de aprendizaje (el tamaño de los pasos que se dan en el descenso del gradiente) para cada parámetro individualmente en función de estimaciones del primer y segundo momento (es decir, la media y la varianza) de los gradientes.

Además, Adam también incluye un mecanismo conocido como "momento", que hace que el optimizador no solo tenga en cuenta el gradiente actual, sino también los gradientes de las iteraciones anteriores. Esto puede ayudar a acelerar la convergencia del algoritmo y también a superar los óptimos locales y las zonas planas de la función de pérdida.

Finalmente, Adam también introduce una corrección de sesgo para sus estimaciones del primer y segundo momento, lo que ayuda a obtener estimaciones más precisas al principio del entrenamiento.

Estas características hacen que Adam sea un optimizador muy eficaz y ampliamente utilizado en la formación de redes neuronales. Sin embargo, como cualquier método, no es una solución universal y puede no ser el mejor optimizador para todas las situaciones o para todos los tipos de redes neuronales. Por lo tanto, es recomendable experimentar con diferentes optimizadores y configuraciones para encontrar la opción más adecuada para cada problema específico.

Una vez analizados todos los componentes que constituyen el aprendizaje reforzado profundo, es posible adentrarse en el estudio de AlphaZero y su aplicación en el ámbito del ajedrez. AlphaZero representa la convergencia de diversos bloques previamente examinados, permitiendo comprender cómo se aplican estos conceptos en este juego milenario.
