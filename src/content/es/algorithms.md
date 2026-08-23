---
title: "Algoritmos de aprendizaje reforzado"
description: "El campo del aprendizaje reforzado ha experimentado una notable efervescencia en los últimos años, que ha conducido a la creación de una diversidad considerable de algoritmos."
chapter: "Aprendizaje profundo reforzado"
part: "book"
order: 16
bookChapter: "3"
bookChapterTitle: "Aprendizaje profundo reforzado"
sectionNumber: "3.4"
sectionTitle: "Algoritmos de aprendizaje reforzado"
navDepth: 2
pairedSlug: "algorithms"
source: "es/algorithms.tex"
draft: false
---

El campo del aprendizaje reforzado ha experimentado una notable efervescencia en los últimos años, que ha conducido a la creación de una diversidad considerable de algoritmos. Es importante mencionar que discutir todos estos algoritmos excedería el propósito de este libro. Por lo tanto, la discusión se limitará a los algoritmos más significativos y a aquellos que poseen una relevancia especial en el contexto del ajedrez.

Los algoritmos de aprendizaje reforzado se pueden clasificar en tres categorías principales: basados en la política (que se enfocan en el cálculo de la política), basados en los valores (cuyo objetivo es calcular la recompensa esperada) y basados en el modelo (que buscan calcular el modelo). Cabe señalar que algunos algoritmos pueden clasificarse en varias categorías, ya que su diseño implica el cálculo de varios de estos componentes.

Pasaremos a detallar los algoritmos más relevantes.

El algoritmo REINFORCE busca generar una distribución de probabilidades para un estado específico. Es decir, intenta formular una política no determinista, donde las acciones con los mejores resultados tienen una mayor probabilidad de ocurrencia. Este algoritmo requiere una red neuronal para generar esta distribución de probabilidad basada en el estado actual. Por lo tanto, se clasifica como un algoritmo basado en la política.<cite><a href="/es/references#cite-2deeprl2019" data-cite="2deeprl2019">[Graesser, 2019]</a></cite>

El algoritmo DQN (Deep Q-Networks) busca calcular la recompensa esperada en función de un estado dado y la acción a realizar en ese estado. Utiliza una red neuronal profunda para cumplir este propósito. Una característica distintiva de este algoritmo es su naturaleza *off-policy*, lo que significa que su entrenamiento no depende de la política seguida. En teoría, se podría utilizar cualquier política, aunque en la práctica, ciertas políticas son más efectivas que otras. Además, si se dispone de datos previos sobre las acciones realizadas y las recompensas obtenidas, estos pueden ser aprovechados por el algoritmo. Una vez concluido el entrenamiento, las acciones son seleccionadas siguiendo los procedimientos discutidos en la sección de Política. Este algoritmo pertenece a la categoría de los basados en el valor.<cite><a href="/es/references#cite-4deeprl2019" data-cite="4deeprl2019">[Graesser, 2019]</a></cite>. Sin embargo, cabe señalar que es adecuado únicamente para los casos en los que el espacio de acciones es discreto.

El algoritmo Actor-Crítico se sitúa en las categorías de basados tanto en el valor como en la política. Consta de dos componentes principales: el actor, que aprende la política, y el crítico, que aprende la función que relaciona las acciones realizadas en un estado dado con su recompensa esperada. De esta forma, el crítico proporciona al actor la información necesaria para optimizar la política. Su variante más utilizada es A2C (Advantage Actor-Critic), donde se aprende una función de ventaja que informa sobre la calidad de una acción en comparación con otras acciones posibles. <cite><a href="/es/references#cite-6deeprl2019" data-cite="6deeprl2019">[Graesser, 2019]</a></cite>

El último algoritmo a considerar en esta sección tiene una relevancia particular para el ajedrez y pertenece a la categoría de los basados en el modelo. Su diseño conceptual es similar al algoritmo Minimax, pero realiza una búsqueda más selectiva. Este algoritmo simula un número determinado de partidas y utiliza el modelo para seleccionar las jugadas más probables en estas simulaciones. Esto permite enfocar el análisis en las jugadas más prometedoras dentro de una posición e ignorar las demás. Gracias a esta característica, este algoritmo es comparable a Minimax, pero es significativamente más rápido. Al igual que Minimax, los nodos ubicados en los primeros niveles del árbol almacenan las estadísticas de las partidas simuladas, y aquellas con mejores estadísticas son utilizadas para seleccionar el movimiento más adecuado <cite><a href="/es/references#cite-15gerrish2018smart" data-cite="15gerrish2018smart">[Gerrish, 2018]</a></cite>. En la sección AlphaZero, se proporcionarán detalles adicionales sobre cómo este algoritmo se utiliza en el ajedrez.
