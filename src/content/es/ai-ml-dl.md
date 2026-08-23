---
title: "¿Qué es la inteligencia artificial?"
description: "Para profundizar en el campo de la inteligencia artificial (IA), es imprescindible distinguir claramente varios términos relacionados."
chapter: "Inteligencia artificial"
part: "book"
order: 4
bookChapter: "2"
bookChapterTitle: "Inteligencia artificial"
sectionNumber: "2.1"
sectionTitle: "¿Qué es la inteligencia artificial?"
navDepth: 2
pairedSlug: "ai-ml-dl"
source: "es/AI,ML,DL.tex"
draft: false
---

Para profundizar en el campo de la inteligencia artificial (IA), es imprescindible distinguir claramente varios términos relacionados. En esencia, la inteligencia artificial se refiere al conjunto de algoritmos, técnicas y métodos que permiten a una máquina emular comportamientos inteligentes, que tradicionalmente consideramos humanos. En otras palabras, la IA dota a un sistema computacional de una apariencia de inteligencia similar a la humana. Esta definición, intencionalmente amplia, abarca un espectro de algoritmos heterogéneos, que pueden participar en una partida de ajedrez o, incluso, componer un poema.

Poniendo el foco en el juego del ajedrez, el objetivo es desarrollar un sistema computacional capaz de jugar de una forma similar a un humano, o incluso superarlo. Esto implica que la máquina debe ser capaz de proyectar múltiples jugadas hacia adelante (algo relativamente sencillo para una máquina), y también, adoptar una visión estratégica a largo plazo (algo sumamente complejo para un sistema informático). Se pueden explorar ambos aspectos mediante algoritmos puros o a través del aprendizaje que los sistemas computacionales pueden adquirir mediante ciertos algoritmos, un campo denominado aprendizaje automático o *machine learning*. Este último enfoque ha demostrado un notable éxito.

### Aprendizaje automático

El aprendizaje automático engloba todos los algoritmos que permiten a un sistema computacional aprender a partir de datos. Esta perspectiva contrasta fuertemente con el enfoque tradicional de programación. En el modelo clásico, el primer paso es analizar la información y estudiar el problema manualmente, generalmente realizado por un programador. Posteriormente, se escribe el programa basado en los conocimientos adquiridos y, una vez finalizado, se evalúa su rendimiento y se corrigen los errores detectados. Este proceso se repite tantas veces como sea necesario hasta alcanzar el rendimiento requerido.

Sin embargo, en el aprendizaje automático, aunque se sigue un proceso similar, hay una diferencia esencial: todo el proceso se lleva a cabo por el sistema computacional sin intervención humana después de su inicio. La fase de codificación del programa se reemplaza por el entrenamiento del algoritmo de aprendizaje automático. Los sistemas computacionales son ideales para ejecutar tareas repetitivas, mientras que los humanos eventualmente nos cansamos o nos aburrimos. Por esta razón, estos algoritmos de aprendizaje superan en gran medida a un algoritmo estándar diseñado por un programador.

El dominio del aprendizaje automático es vasto y está creciendo exponencialmente en la actualidad. Casi cualquier programa o aplicación hoy en día utiliza el aprendizaje automático para ejecutar parte de sus funcionalidades. Una forma sencilla de clasificar estos algoritmos es basándose en los tipos de datos que utilizan. Las principales categorías son: aprendizaje supervisado, no supervisado, semisupervisado y reforzado.

#### Aprendizaje supervisado

En este tipo de aprendizaje, los datos proporcionados vienen con un "etiquetado" o "solución". Por ejemplo, si se intenta determinar si una foto pertenece a un perro, en los datos vendrá indicado que esa foto concreta es de un perro. La máquina se entrena con estos datos, intenta predecir si una foto es de un perro y, en caso de error, puede aprender de sus errores y ajustarse para evitarlos en el futuro. La meta final es que el algoritmo sea capaz de clasificar una imagen nueva que no haya visto antes y de la que probablemente no tenga la etiqueta.

Esta categoría se puede subdividir en dos subcategorías: clasificación y regresión. La clasificación corresponde al caso mencionado anteriormente donde se debe predecir la categoría de un conjunto de datos (una imagen, un vídeo, un texto, etc.) entre un conjunto de categorías predefinidas. En contraposición, la regresión implica predecir un valor continuo (infinitas categorías posibles) para un conjunto de datos dado.

#### Aprendizaje no supervisado

En el aprendizaje no supervisado, la tarea del sistema computacional es más desafiante ya que no cuenta con etiquetas para los datos. Es decir, se le proporciona una imagen de un perro, pero la máquina no tiene ninguna indicación de que es un perro. Las aplicaciones de este tipo de aprendizaje están relacionadas con el agrupamiento de datos (*clustering*), la reducción de la dimensionalidad de los datos (para resaltar las características más significativas), y la detección de anomalías en los datos (datos que se desvían de lo común).

#### Aprendizaje semisupervisado

Como sugiere su nombre, este tipo de aprendizaje combina aspectos del aprendizaje supervisado y no supervisado. Aquí se dispone de un conjunto de datos etiquetados, generalmente pequeño, y otro conjunto sin etiquetas, usualmente más grande. Se utilizan algoritmos que combinan técnicas de aprendizaje supervisado y no supervisado. Un ejemplo destacado en este campo son las redes generativas adversarias (GANs). Estas consisten en dos redes neuronales: una que genera imágenes realistas de cierta categoría y otra que debe determinar qué imágenes son reales y cuáles son generadas. La segunda red neuronal indica a la primera en qué se ha equivocado, permitiendo que la primera ajuste sus parámetros de forma autónoma. El entrenamiento culmina cuando la red neuronal discriminadora ya no puede distinguir entre las imágenes reales y las generadas.

#### Aprendizaje reforzado

El aprendizaje reforzado se sitúa en una posición intermedia entre el aprendizaje supervisado y no supervisado, aunque sigue una filosofía totalmente diferente. En este modelo, se concibe el aprendizaje como un juego donde el sistema debe tomar una serie de decisiones que resultan en una recompensa determinada. Esta recompensa proporciona la retroalimentación sobre si las acciones tomadas fueron acertadas o no. Debido a que la recompensa se ve afectada por todas las acciones previas, no es posible modelarlo como aprendizaje supervisado. Al mismo tiempo, tampoco puede considerarse aprendizaje no supervisado dado que existe una retroalimentación.

Los lectores más perspicaces habrán notado que este tipo de aprendizaje es especialmente adecuado para juegos como el ajedrez, y efectivamente así es. La combinación de aprendizaje reforzado y profundo ha demostrado ser muy efectiva en este campo. No profundizaremos más en este tema aquí, ya que se tratará con mayor detalle en el próximo capítulo.

### Aprendizaje profundo

El aprendizaje profundo corresponde a los algoritmos de aprendizaje automático que hacen uso de redes neuronales con múltiples capas. Una red neuronal está compuesta por multitud de elementos llamados neuronas o perceptrones. Estos perceptrones tienen una estructura sencilla, basada en la multiplicación y suma de matrices seguida de una función no lineal. Su éxito radica en que, al combinar muchos de estos perceptrones, se pueden aproximar prácticamente cualquier función imaginable.

Aunque las redes neuronales puedan parecer un desarrollo reciente, en realidad su origen se remonta al siglo pasado. Si han existido durante tanto tiempo, ¿por qué no se han empezado a utilizar activamente hasta estos últimos años? La razón principal es que hasta hace poco era prácticamente imposible entrenar y ajustar efectivamente redes neuronales con muchas capas. Sin embargo, gracias a los avances recientes en hardware y en el proceso de retropropagación (*backpropagation*), estas redes han alcanzado un gran éxito en numerosos campos. De nuevo, se tratará este campo más detenidamente en el próximo capítulo.
