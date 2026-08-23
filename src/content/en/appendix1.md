---
title: "Flowcharts"
description: "In this book, the use of flowcharts has been chosen to illustrate the intrinsic logic of the algorithms discussed. The choice of this visual representation tool lies in its clarity and accessibility."
chapter: "Flowcharts"
part: "appendix"
order: 23
bookChapter: "A"
bookChapterTitle: "Flowcharts"
sectionNumber: "A"
sectionTitle: "Flowcharts"
navDepth: 1
pairedSlug: "appendix1"
source: "en/appendix1.tex"
draft: false
---

In this book, the use of flowcharts has been chosen to illustrate the intrinsic logic of the algorithms discussed. The choice of this visual representation tool lies in its clarity and accessibility, which greatly facilitates the reader's understanding, even in the absence of prior programming knowledge.

To begin our journey, it is crucial to know the basic elements or blocks that make up flowcharts. These are mainly classified into four types:

- Start/End
- Input/Output
- Branch
- Process

The "Start/End" block marks the beginning and closure of the program flow. A flowchart can have multiple "End" blocks, but only one "Start" block. Both are represented by a rounded-edge rectangle. The [start/end block diagram](#fig-representacion-de-comienzo-y-fin-en-un-diagrama-de-flujo) illustrates these blocks.

<figure id="fig-representacion-de-comienzo-y-fin-en-un-diagrama-de-flujo">
  <div class="localized-diagram flow-diagram mermaid-flowchart" data-diagram="flowchart" data-node-count="2" data-mermaid="flowchart LR
  node_start([&quot;Start&quot;]):::terminal
  node_end([&quot;End&quot;]):::terminal
  node_start ~~~ node_end
  classDef terminal fill:#46765f,color:#fff,stroke:#2f5d48,stroke-width:2px
  classDef io fill:#e8eee9,color:#171a17,stroke:#46765f,stroke-width:1.5px
  classDef decision fill:#f1eee2,color:#171a17,stroke:#46765f,stroke-width:2px
  classDef process fill:#f7f7f1,color:#171a17,stroke:#6f786f,stroke-width:1.5px" role="img" aria-label="Representation of start and end in a flowchart">Start → End</div>
  <figcaption>Representation of start and end in a flowchart</figcaption>
</figure>

The "Input/Output" blocks define the inputs and outputs of the algorithm. Unlike the "Start" and "End" blocks, these can carry a descriptive name instead of a generic term, providing a more detailed view of the algorithm's functionality. These blocks are represented through rhomboids, as shown in the [input/output block diagram](#fig-representacion-de-entradas-y-salidas-en-un-diagrama-de-flujo).

<figure id="fig-representacion-de-entradas-y-salidas-en-un-diagrama-de-flujo">
  <div class="localized-diagram flow-diagram mermaid-flowchart" data-diagram="flowchart" data-node-count="2" data-mermaid="flowchart LR
  node_in[/&quot;Input&quot;/]:::io
  node_out[/&quot;Output&quot;/]:::io
  node_in ~~~ node_out
  classDef terminal fill:#46765f,color:#fff,stroke:#2f5d48,stroke-width:2px
  classDef io fill:#e8eee9,color:#171a17,stroke:#46765f,stroke-width:1.5px
  classDef decision fill:#f1eee2,color:#171a17,stroke:#46765f,stroke-width:2px
  classDef process fill:#f7f7f1,color:#171a17,stroke:#6f786f,stroke-width:1.5px" role="img" aria-label="Representation of inputs and outputs in a flowchart">Input → Output</div>
  <figcaption>Representation of inputs and outputs in a flowchart</figcaption>
</figure>

The "Branch" block provides the possibility of executing different actions depending on the fulfillment of a specific condition. This expands the expressiveness of algorithms and allows the incorporation of conditional logic. They are represented with a square rotated 45 degrees. The [branch block diagram](#fig-representacion-de-bifurcaciones-en-un-diagrama-de-flujo) illustrates this block.

<figure id="fig-representacion-de-bifurcaciones-en-un-diagrama-de-flujo">
  <div class="localized-diagram flow-diagram mermaid-flowchart" data-diagram="flowchart" data-node-count="1" data-mermaid="flowchart LR
  node_branch{&quot;Branch&quot;}:::decision
  classDef terminal fill:#46765f,color:#fff,stroke:#2f5d48,stroke-width:2px
  classDef io fill:#e8eee9,color:#171a17,stroke:#46765f,stroke-width:1.5px
  classDef decision fill:#f1eee2,color:#171a17,stroke:#46765f,stroke-width:2px
  classDef process fill:#f7f7f1,color:#171a17,stroke:#6f786f,stroke-width:1.5px" role="img" aria-label="Representation of branches in a flowchart">Branch</div>
  <figcaption>Representation of branches in a flowchart</figcaption>
</figure>

Finally, the "Process" blocks indicate the actions that are performed in relation to the algorithm. Although their representation is usually abstract in most cases, these blocks usually include a more detailed description of the action being carried out. They are represented by a rectangle. The [process block diagram](#fig-representacion-de-procesos-en-un-diagrama-de-flujo) shows how a process block is represented in a flowchart.

<figure id="fig-representacion-de-procesos-en-un-diagrama-de-flujo">
  <div class="localized-diagram flow-diagram mermaid-flowchart" data-diagram="flowchart" data-node-count="1" data-mermaid="flowchart LR
  node_branch[&quot;Process&quot;]:::process
  classDef terminal fill:#46765f,color:#fff,stroke:#2f5d48,stroke-width:2px
  classDef io fill:#e8eee9,color:#171a17,stroke:#46765f,stroke-width:1.5px
  classDef decision fill:#f1eee2,color:#171a17,stroke:#46765f,stroke-width:2px
  classDef process fill:#f7f7f1,color:#171a17,stroke:#6f786f,stroke-width:1.5px" role="img" aria-label="Representation of processes in a flowchart">Process</div>
  <figcaption>Representation of processes in a flowchart</figcaption>
</figure>

In addition to the mentioned blocks, directional arrows are used to establish the order of blocks and the connections between them. These arrows generally do not contain additional information, with the exception of branches, where each arrow specifies the condition that leads to the destination block. These arrows indicate the sequence and direction of flow within the algorithm.

Throughout this book, examples of thoroughly explained and detailed flowcharts will be presented, which will allow you to effectively understand the logic of the algorithms.
