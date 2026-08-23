---
title: "Diagramas de flujo"
description: "En este libro se ha optado por la utilización de diagramas de flujo para ilustrar la lógica intrínseca de los algoritmos discutidos."
chapter: "Diagramas de flujo"
part: "appendix"
order: 23
bookChapter: "A"
bookChapterTitle: "Diagramas de flujo"
sectionNumber: "A"
sectionTitle: "Diagramas de flujo"
navDepth: 1
pairedSlug: "appendix1"
source: "es/appendix1.tex"
draft: false
---

En este libro se ha optado por la utilización de diagramas de flujo para ilustrar la lógica intrínseca de los algoritmos discutidos. La elección de esta herramienta de representación visual radica en su claridad y accesibilidad, lo cual facilita enormemente la comprensión del lector, incluso en ausencia de conocimientos previos de programación.

Para iniciar nuestro recorrido, es crucial conocer los elementos básicos o bloques que componen los diagramas de flujo. Estos se clasifican principalmente en cuatro tipos:

- Comienzo/Fin
- Entrada/Salida
- Bifurcación
- Proceso

El bloque "Comienzo/Fin" marca el inicio y el cierre del flujo del programa. Un diagrama de flujo puede tener múltiples bloques de "Fin", pero solo un bloque de "Comienzo". Ambos son representados por un rectángulo de bordes redondeados. La Figura [referencia](#fig-representacion-de-comienzo-y-fin-en-un-diagrama-de-flujo) ilustra estos bloques.

<figure id="fig-representacion-de-comienzo-y-fin-en-un-diagrama-de-flujo">
  <div class="localized-diagram flow-diagram mermaid-flowchart" data-diagram="flowchart" data-mermaid="flowchart LR
  start([&quot;Comienzo&quot;]):::terminal
  end([&quot;Fin&quot;]):::terminal
  classDef terminal fill:#46765f,color:#fff,stroke:#2f5d48,stroke-width:2px
  classDef io fill:#e8eee9,color:#171a17,stroke:#46765f,stroke-width:1.5px
  classDef decision fill:#f1eee2,color:#171a17,stroke:#46765f,stroke-width:2px
  classDef process fill:#f7f7f1,color:#171a17,stroke:#6f786f,stroke-width:1.5px" role="img" aria-label="Representación de comienzo y fin en un diagrama de flujo">Comienzo → Fin</div>
  <figcaption>Representación de comienzo y fin en un diagrama de flujo</figcaption>
</figure>

Los bloques de "Entrada/Salida" definen las entradas y salidas del algoritmo. A diferencia de los bloques de "Comienzo" y "Fin", estos pueden llevar un nombre descriptivo en lugar de un término genérico, proporcionando una visión más detallada de la funcionalidad del algoritmo. Estos bloques se representan a través de romboides, como se muestra en la Figura [referencia](#fig-representacion-de-entradas-y-salidas-en-un-diagrama-de-flujo).

<figure id="fig-representacion-de-entradas-y-salidas-en-un-diagrama-de-flujo">
  <div class="localized-diagram flow-diagram mermaid-flowchart" data-diagram="flowchart" data-mermaid="flowchart LR
  in[/&quot;Entrada&quot;/]:::io
  out[/&quot;Salida&quot;/]:::io
  classDef terminal fill:#46765f,color:#fff,stroke:#2f5d48,stroke-width:2px
  classDef io fill:#e8eee9,color:#171a17,stroke:#46765f,stroke-width:1.5px
  classDef decision fill:#f1eee2,color:#171a17,stroke:#46765f,stroke-width:2px
  classDef process fill:#f7f7f1,color:#171a17,stroke:#6f786f,stroke-width:1.5px" role="img" aria-label="Representación de entradas y salidas en un diagrama de flujo">Entrada → Salida</div>
  <figcaption>Representación de entradas y salidas en un diagrama de flujo</figcaption>
</figure>

El bloque "Bifurcación" brinda la posibilidad de ejecutar distintas acciones dependiendo del cumplimiento de una condición determinada. Esto amplía la expresividad de los algoritmos y permite incorporar lógica condicional. Se representan con un cuadrado rotado 45 grados. La Figura [referencia](#fig-representacion-de-bifurcaciones-en-un-diagrama-de-flujo) ilustra este bloque.

<figure id="fig-representacion-de-bifurcaciones-en-un-diagrama-de-flujo">
  <div class="localized-diagram flow-diagram mermaid-flowchart" data-diagram="flowchart" data-mermaid="flowchart LR
  branch{&quot;Bifurcación&quot;}:::decision
  classDef terminal fill:#46765f,color:#fff,stroke:#2f5d48,stroke-width:2px
  classDef io fill:#e8eee9,color:#171a17,stroke:#46765f,stroke-width:1.5px
  classDef decision fill:#f1eee2,color:#171a17,stroke:#46765f,stroke-width:2px
  classDef process fill:#f7f7f1,color:#171a17,stroke:#6f786f,stroke-width:1.5px" role="img" aria-label="Representación de bifurcaciones en un diagrama de flujo">Bifurcación</div>
  <figcaption>Representación de bifurcaciones en un diagrama de flujo</figcaption>
</figure>

Por último, los bloques de "Proceso" indican las acciones que se realizan en relación al algoritmo. Aunque su representación suele ser abstracta en la mayoría de los casos, estos bloques suelen incluir una descripción más detallada de la acción que se está llevando a cabo. Se representan mediante un rectángulo. La Figura [referencia](#fig-representacion-de-procesos-en-un-diagrama-de-flujo) muestra cómo se representa un bloque de proceso en un diagrama de flujo.

<figure id="fig-representacion-de-procesos-en-un-diagrama-de-flujo">
  <div class="localized-diagram flow-diagram mermaid-flowchart" data-diagram="flowchart" data-mermaid="flowchart LR
  branch[&quot;Proceso&quot;]:::process
  classDef terminal fill:#46765f,color:#fff,stroke:#2f5d48,stroke-width:2px
  classDef io fill:#e8eee9,color:#171a17,stroke:#46765f,stroke-width:1.5px
  classDef decision fill:#f1eee2,color:#171a17,stroke:#46765f,stroke-width:2px
  classDef process fill:#f7f7f1,color:#171a17,stroke:#6f786f,stroke-width:1.5px" role="img" aria-label="Representación de procesos en un diagrama de flujo">Proceso</div>
  <figcaption>Representación de procesos en un diagrama de flujo</figcaption>
</figure>

Además de los bloques mencionados, se utilizan flechas direccionales para establecer el orden de los bloques y las conexiones entre ellos. Estas flechas generalmente no contienen información adicional, a excepción de las bifurcaciones, donde cada flecha especifica la condición que conduce al bloque de destino. Estas flechas indican la secuencia y la dirección del flujo dentro del algoritmo.

A lo largo de este libro, se presentarán ejemplos de diagramas de flujo exhaustivamente explicados y detallados, lo que te permitirá comprender de manera efectiva la lógica de los algoritmos.
