---
title: "Advanced techniques in the game tree"
description: "In this section, we will focus on the different techniques employed to optimize the search in alpha-beta pruning, an essential strategy for efficiency in AI games."
chapter: "Artificial Intelligence"
part: "book"
order: 11
bookChapter: "2"
bookChapterTitle: "Artificial Intelligence"
sectionNumber: "2.8"
sectionTitle: "Advanced techniques in the game tree"
navDepth: 2
pairedSlug: "advanced-tecniques"
source: "en/advanced-tecniques.tex"
draft: false
---

In this section, we will focus on the different techniques employed to optimize the search in alpha-beta pruning, an essential strategy for efficiency in AI games. These techniques are designed to reduce the size of the explored game tree, allowing a more precise and effective exploration of the nodes relevant to the problem at hand. Although there is a multitude of available techniques, this book will focus only on the most significant and effective ones. However, it is important to keep in mind that these techniques require certain computational resources, which implies that it is crucial to weigh the benefit obtained against the associated computational cost.

The first crucial aspect we will consider is the order in which moves are explored. One of the most common exploration orders is detailed below:

- Captures or promotions
- Forward movements
- Lateral movements
- Backward movements

The general logic behind this exploration order is to prioritize those movements that can result in significant changes in the board position. Consequently, captures and promotions, which alter the number of pieces on the board, are considered first. Once these moves have been examined, "forward movements" are analyzed, which are those that advance pieces toward enemy territory. These movements are usually preferable to those that keep pieces on the same rank or that retreat toward their own field. This logic applies equally to lateral and backward movements. Additionally, if we have already partially explored a position (up to a certain depth, but plan to explore beyond this subsequently), more advanced techniques can be applied to select which of these options will continue in the search.

The next problem is to determine to what depth the search should be performed. One option might be to establish a fixed depth to terminate the search. However, this approach has an important disadvantage: what happens if just after that depth a move is made that changes the position, typically a capture or promotion? To address this problem, a technique called *quiescence search* must be used, which focuses on stopping the exploration of a position when it is "quiet". A position is generally considered quiet when no capture or promotion is possible. Except in exceptional cases, it is prudent to terminate the search in one of these quiet positions and continue in those that are more unstable.

Another simple but very effective technique for reducing the number of moves to explore is null move pruning. The concept is simple: a "null" move is made, in which the turn is yielded without taking any action. Although this strategy cannot be implemented in a real chess game, it has proven to be very effective in optimizing exploration. If the move prior to the null move has not altered the valuation of the position, it can be inferred that that move is not relevant and, therefore, can be discarded.

Another important technique is the use of the transposition table. This is oriented toward avoiding calculating the same position multiple times. In chess, the same position can be reached with different move orders, which could imply calculating the same position several times. The transposition table will be responsible for storing the visited positions and will return the value of that state if that position is passed through again. To facilitate the comparison and search of positions, a process known as *hashing* is used, which converts each position into a number with a very low probability of repetition.

Additionally, chess programs benefit from additional help for the first moves of games and for the endgames. For the opening of games, they have opening books that include moves for positions that commonly occur in the first moves. These moves, obtained from chess games played by humans, are especially useful for computers in complex initial positions where the development of the game tree can involve a high cost. Regarding the endgames, Syzygy tablebases are used. These tables contain the solution to chess (knowing from any position what the inevitable result is) for 7 pieces on the board or fewer. This means that, with these tables, if the position has fewer than 7 pieces, the computer can consult them to know what the best move is without needing to perform a search.

A significant challenge of the search technique is the so-called "horizon effect". This occurs when a result in a position is inevitable, but due to the depth limitation it is impossible to reach that conclusion by developing an incomplete game tree. In the simplest cases, where the moves leading to the conclusion are captures, this problem can be avoided using the *quiescence search* technique, but in more complex cases, such as fortresses (despite having a material advantage it is not possible to make progress) or more complex move sequences, this effect can be a problem.

Furthermore, chess programs may have difficulty strategically evaluating a position, since many moves ahead make the size of the game tree unmanageable. Techniques such as null move can alleviate this problem to some extent, but do not eliminate it completely.

In the next chapter, we will analyze the use of reinforcement learning, a technique that can improve AI performance against these previous problems.
