---
title: "Modelo"
description: "El objetivo principal de nuestro modelo es comprender en profundidad las dinámicas subyacentes de un juego. Esto implica conocer las probabilidades de transición a diferentes estados luego de la ejecución de una acción."
chapter: "Aprendizaje profundo reforzado"
part: "book"
order: 15
bookChapter: "3"
bookChapterTitle: "Aprendizaje profundo reforzado"
sectionNumber: "3.3"
sectionTitle: "Modelo"
navDepth: 2
pairedSlug: "model"
source: "es/model.tex"
draft: false
---

El objetivo principal de nuestro modelo es comprender en profundidad las dinámicas subyacentes de un juego. Esto implica conocer las probabilidades de transición a diferentes estados luego de la ejecución de una acción específica. Tal entendimiento es particularmente útil en el contexto de los juegos no deterministas, donde las probabilidades posteriores a una acción no pueden ser previamente conocidas con certeza. No obstante, ¿cómo es esto aplicable en un juego como el ajedrez que es inherentemente determinista?

Sorprendentemente, se puede abordar el ajedrez desde un punto de vista no determinista. Primero, es fundamental recordar que el ajedrez es un juego bipartito, es decir, siempre existe un adversario que nos enfrenta. Este oponente será sometido a diversas posiciones de tablero en las cuales las probabilidades de realizar determinadas jugadas no serán necesariamente iguales. Por ende, nuestro modelo se enfocará en anticipar y predecir las posibles jugadas del contrincante.

En el contexto del ajedrez, se suele asumir que el rival optará por la mejor jugada posible, siguiendo una lógica similar al algoritmo Minimax. Esto conduce a una coincidencia entre el objetivo de la política y del modelo, ambos persiguen identificar el mejor movimiento posible para cada posición. Esto implica que, de hecho, solo es necesario entrenar uno de ellos, ya que los resultados podrán ser aplicados al otro de manera directa.

Esta es la razón por la cual el uso de un modelo puede ser extremadamente fructífero, sin la necesidad de realizar cálculos complejos, ya que la información necesaria se puede obtener directamente de la política.

Para ilustrar aún más este concepto, consideremos el ejemplo de un *Grid* 2D. Conocer el modelo de este juego en su forma original, es decir, en un entorno determinista, no añadiría valor, ya que ya sabemos a qué estado lleva cada acción. Sin embargo, si modificamos ligeramente la definición del juego, incorporando una probabilidad del 10% de que cada acción pueda resultar en un estado no previsto, las definiciones de las acciones cambiarían a:

$$
&0: \textrm{Arriba } 90\%, \textrm{ Derecha } 10\% \\
&1: \textrm{Derecha } 90\%, \textrm{ Abajo } 10\% \\
&2: \textrm{Abajo } 90\%, \textrm{ Izquierda } 10\% \\
&3: \textrm{Izquierda } 90\%, \textrm{ Arriba } 10\%
$$

Estas acciones son similares a las presentadas en la sección anterior, con el matiz adicional previamente mencionado. Además, dichas acciones modelan de forma más precisa situaciones de la vida real, por ejemplo, la tarea de guiar a un robot a través de un camino, donde las partes móviles del robot pueden introducir imprecisiones o errores.

Nuestro modelo, en este caso, buscará descifrar estas distribuciones de probabilidad asociadas al juego, ya que éstas no son conocidas por el agente que realiza las acciones.

Finalmente, habiendo expuesto los tres pilares del aprendizaje por refuerzo (recompensa esperada, política y modelo), podemos clasificar los diferentes algoritmos de aprendizaje reforzado en función de qué objetivo(s) se enfocan en lograr.
