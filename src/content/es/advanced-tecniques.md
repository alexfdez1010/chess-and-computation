---
title: "Técnicas avanzadas en el árbol del juego"
description: "En esta sección, nos enfocaremos en las diferentes técnicas empleadas para optimizar la búsqueda en la poda alfa-beta, una estrategia esencial para la eficiencia en juegos de IA."
chapter: "Inteligencia artificial"
part: "book"
order: 11
bookChapter: "2"
bookChapterTitle: "Inteligencia artificial"
sectionNumber: "2.8"
sectionTitle: "Técnicas avanzadas en el árbol del juego"
navDepth: 2
pairedSlug: "advanced-tecniques"
source: "es/advanced-tecniques.tex"
draft: false
---

En esta sección, nos enfocaremos en las diferentes técnicas empleadas para optimizar la búsqueda en la poda alfa-beta, una estrategia esencial para la eficiencia en juegos de IA. Estas técnicas están diseñadas para reducir el tamaño del árbol de juego explorado, permitiendo una exploración más precisa y efectiva de los nodos relevantes para el problema en cuestión. Aunque existe una multitud de técnicas disponibles, este libro se centrará solo en las más significativas y eficaces. Sin embargo, es importante tener en cuenta que estas técnicas requieren ciertos recursos computacionales, lo que implica que es crucial ponderar el beneficio obtenido frente al coste computacional asociado.

El primer aspecto crucial que consideraremos es el orden en que se exploran las jugadas. Uno de los órdenes de exploración más comunes se detalla a continuación:

- Capturas o promociones
- Movimientos hacia delante
- Movimientos laterales
- Movimientos hacia atrás

La lógica general detrás de este orden de exploración es dar prioridad a aquellos movimientos que pueden resultar en cambios significativos en la posición en el tablero. En consecuencia, las capturas y promociones, que alteran el número de piezas en el tablero, se consideran primero. Una vez que estos movimientos se han examinado, se analizan los "movimientos hacia adelante", que son aquellos que avanzan las piezas hacia el territorio enemigo. Estos movimientos suelen ser preferibles a los que mantienen a las piezas en la misma fila o que retroceden hacia su propio campo. Esta lógica se aplica igualmente a los movimientos laterales y hacia atrás. Además, si ya hemos explorado parcialmente una posición (hasta una cierta profundidad, pero planeamos explorar más allá de esta posteriormente), se pueden aplicar técnicas más avanzadas para seleccionar cuál de estas opciones continuará en la búsqueda.

El siguiente problema es determinar hasta qué profundidad se debe realizar la búsqueda. Una opción podría ser establecer una profundidad fija para terminar la búsqueda. Sin embargo, este enfoque tiene una desventaja importante: ¿qué sucede si justo después de esa profundidad se realiza una jugada que cambia la posición, típicamente una captura o promoción? Para abordar este problema, se debe utilizar una técnica llamada *quiescence search*, que se centra en detener la exploración de una posición cuando esta es "tranquila". Una posición se considera tranquila generalmente cuando no es posible realizar ninguna captura o promoción. Salvo en casos excepcionales, es prudente terminar la búsqueda en una de estas posiciones tranquilas y continuar en las que sean más inestables.

Otra técnica sencilla pero muy efectiva para reducir el número de jugadas a explorar es la poda del movimiento nulo (*null move pruning*). El concepto es simple: se realiza una jugada "nula", en la que se cede el turno sin realizar ninguna acción. Aunque esta estrategia no se puede implementar en una partida de ajedrez real, se ha demostrado que es muy efectiva en la optimización de la exploración. Si la jugada anterior a la jugada nula no ha alterado la valoración de la posición, se puede inferir que esa jugada no es relevante y, por lo tanto, se puede descartar.

Otra técnica importante es la utilización de la tabla de transposiciones. Esta se orienta a evitar calcular múltiples veces la misma posición. En ajedrez, se puede llegar a la misma posición con diferentes órdenes de jugadas, lo que podría implicar calcular varias veces la misma posición. La tabla de transposición se encargará de almacenar las posiciones visitadas y devolverá el valor de ese estado si se vuelve a pasar por esa posición. Para facilitar la comparación y búsqueda de posiciones, se utiliza un proceso conocido como *hashing*, que convierte cada posición en un número con una probabilidad muy baja de repetición.

Además, los programas de ajedrez se benefician de ayuda adicional para las primeras jugadas de las partidas y para los finales de estas. Para el inicio de las partidas (aperturas), cuentan con los libros de aperturas que incluyen las jugadas para las posiciones que se dan en las primeras jugadas habitualmente. Estas jugadas, obtenidas de partidas de ajedrez jugadas por humanos, son especialmente útiles para los ordenadores en las posiciones iniciales complejas donde el desarrollo del árbol de juego puede suponer un coste elevado. En lo que respecta a los finales de las partidas, se utilizan las tablas Syzygy. Estas tablas contienen la solución del ajedrez (saber desde cualquier posición cuál es el resultado inevitable) para 7 piezas en el tablero o menos. Esto significa que, con estas tablas, si la posición tiene menos de 7 piezas, el ordenador puede consultarlas para saber cuál es el mejor movimiento sin necesidad de realizar una búsqueda.

Un reto significativo de la técnica de búsqueda es el denominado "efecto horizonte". Este se produce cuando es inevitable un resultado en una posición, pero debido a la limitación de la profundidad es imposible llegar a esa conclusión desarrollando un árbol de juego no completo. En los casos más sencillos, donde las jugadas que llevan a la conclusión son capturas, se puede evitar este problema utilizando la técnica de *quiescence search*, pero en casos más complejos, como fortalezas (a pesar de encontrarse con ventaja material no es posible progresar) o series de jugadas más complejas, este efecto puede ser un problema.

Además, los programas de ajedrez pueden tener dificultades para evaluar estratégicamente una posición, ya que muchas jugadas en avance hacen que el tamaño del árbol de juego sea inabarcable. Las técnicas como el movimiento nulo pueden aliviar en cierta medida este problema, pero no lo eliminan por completo.

En el siguiente capítulo, analizaremos el uso del aprendizaje reforzado, una técnica que puede mejorar el rendimiento de la IA frente a estos problemas anteriores.
