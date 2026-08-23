---
title: "Game tree"
description: "Game trees represent a fundamental structure for the conceptualization of strategies in games such as chess. This strategic tool originated for the first time in the 19th century."
chapter: "Artificial Intelligence"
part: "book"
order: 6
bookChapter: "2"
bookChapterTitle: "Artificial Intelligence"
sectionNumber: "2.3"
sectionTitle: "Game tree"
navDepth: 2
pairedSlug: "game-tree"
source: "en/game-tree.tex"
draft: false
---

Game trees represent a fundamental structure for the conceptualization of strategies in games such as chess. This strategic tool originated for the first time in the 19th century, with Charles Babbage being attributed the first mathematical incursions in this field <cite><a href="/en/references#cite-monnens2013commenced" data-cite="monnens2013commenced">[Monnens, 2013]</a></cite>. However, it is to Von Neumann that credit is generally given for the creation of this concept <cite><a href="/en/references#cite-v1928theorie" data-cite="v1928theorie">[v. Neumann, 1928]</a></cite>. Nevertheless, the first rigorous analysis of competitive games using this method was developed by Emilie Borel <cite><a href="/en/references#cite-borel1921theorie" data-cite="borel1921theorie">[Borel, 1921]</a></cite>. In his work, Von Neumann demonstrated the minimax theorem (which will be explained in detail in the next section), suggesting that in theory, one could identify the best move in a chess position using this approach.

The main concept underlying the game tree is the exhaustive analysis of all possible moves from a given position, and in turn, all possible opponent responses in each of the possible resulting new positions. This iterative process is repeated until reaching a final state for each of the branches. Once this game tree is constructed, it is necessary to traverse it in a specific manner to determine the most optimal move in each of the positions; for this, the minimax algorithm will be employed.

Below, an illustrative example of a game tree is presented. This representation will be notably similar to that of a real chess game, which is no coincidence, since the game tree is, in essence, a simulation of a game that takes into consideration all possible moves.

<figure id="fig-ejemplo-de-arbol-de-juego">
  <div class="localized-diagram" data-diagram="game-tree" data-label="Game tree example" role="img" aria-label="Game tree example">Game tree example</div>
  <figcaption>Game tree example</figcaption>
</figure>

<figure id="fig-tableros-representados-en-el-ejemplo-de-arbol-de-juego">
  <div class="subfigure-grid" role="group" aria-label="Boards represented in the game tree example">
    <figure class="subfigure" id="p1" data-width="0.30\textwidth" style="--subfigure-width:30%">
      <div class="chessboard" data-fen="2r4k/6pp/7N/8/8/1Q6/8/6K1 w - - 0 1" data-size="8" data-chess-options="&quot;maxfield=h8, showmover=false, setfen=2r4k/6pp/7N/8/8/1Q6/8/6K1 w - - 0 1, tinyboard&quot;" role="img" aria-label="P1" data-rendered="source" data-board-asset="board-8x8-a64d3ffdc656e31c.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-a64d3ffdc656e31c.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
      <figcaption>P1</figcaption>
    </figure>
    <figure class="subfigure" id="p2" data-width="0.30\textwidth" style="--subfigure-width:30%">
      <div class="chessboard" data-fen="2r4k/6pp/7N/8/2Q5/8/8/6K1 b - - 1 1" data-size="8" data-chess-options="&quot;maxfield=h8, showmover=false, setfen=2r4k/6pp/7N/8/2Q5/8/8/6K1 b - - 1 1, tinyboard&quot;" role="img" aria-label="P2" data-rendered="source" data-board-asset="board-8x8-59bb58362208caff.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-59bb58362208caff.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
      <figcaption>P2</figcaption>
    </figure>
    <figure class="subfigure" id="p3" data-width="0.30\textwidth" style="--subfigure-width:30%">
      <div class="chessboard" data-fen="2r3Qk/6pp/7N/8/8/8/8/6K1 b - - 1 1" data-size="8" data-chess-options="&quot;maxfield=h8, showmover=false, setfen=2r3Qk/6pp/7N/8/8/8/8/6K1 b - - 1 1, tinyboard&quot;" role="img" aria-label="P3" data-rendered="source" data-board-asset="board-8x8-4c11d8f86a489def.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-4c11d8f86a489def.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
      <figcaption>P3</figcaption>
    </figure>
    <figure class="subfigure" id="p4" data-width="0.30\textwidth" style="--subfigure-width:30%">
      <div class="chessboard" data-fen="2r4k/6pp/7N/8/8/1Q6/6K1/8 b - - 1 1" data-size="8" data-chess-options="&quot;maxfield=h8, showmover=false, setfen=2r4k/6pp/7N/8/8/1Q6/6K1/8 b - - 1 1, tinyboard&quot;" role="img" aria-label="P4" data-rendered="source" data-board-asset="board-8x8-90bfd208b4afc26c.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-90bfd208b4afc26c.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
      <figcaption>P4</figcaption>
    </figure>
    <figure class="subfigure" id="p5" data-width="0.30\textwidth" style="--subfigure-width:30%">
      <div class="chessboard" data-fen="6rk/6pp/7N/8/8/8/8/6K1 w - - 0 2" data-size="8" data-chess-options="&quot;maxfield=h8, showmover=false, setfen=6rk/6pp/7N/8/8/8/8/6K1 w - - 0 2, tinyboard&quot;" role="img" aria-label="P5" data-rendered="source" data-board-asset="board-8x8-73aa28afeb9a718a.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-73aa28afeb9a718a.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
      <figcaption>P5</figcaption>
    </figure>
    <figure class="subfigure" id="p6" data-width="0.30\textwidth" style="--subfigure-width:30%">
      <div class="chessboard" data-fen="6rk/5Npp/8/8/8/8/8/6K1 b - - 1 2" data-size="8" data-chess-options="&quot;maxfield=h8, showmover=false, setfen=6rk/5Npp/8/8/8/8/8/6K1 b - - 1 2, tinyboard&quot;" role="img" aria-label="P6" data-rendered="source" data-board-asset="board-8x8-6db3ec7ce8181209.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-6db3ec7ce8181209.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
      <figcaption>P6</figcaption>
    </figure>
  </div>
  <figcaption>Boards represented in the game tree example</figcaption>
</figure>

In this scenario, only three potential White moves are considered, although in reality there are more options, such as Kf2, Qa2, Nf7, among others. Of the three White moves, only Qg8 is continued, while the other two moves allow various responses by Black. In contrast, faced with Qg8, Black must respond in a forced manner with Rxg8 (capturing the queen), and White will in turn respond with Nf7, which results in checkmate to the Black king (Black does not have a move that relieves the king from attack), granting victory to White.

The generation of this tree follows a procedure similar to the *Backtracking* presented in the first chapter. In each position, all possible resulting positions are enumerated and the same process continues recursively until reaching a final state. Due to the similarity with *Backtracking*, this method shares the problem of exponential growth of positions to review. In chess, this growth is particularly accentuated given the high number of possible moves from a given position. For example, in the initial position, White can execute 20 different moves and this figure can increase even more in the middlegame or opening. However, there are positions where only one move is possible (forced move). Due to these variations, calculating the complexity of the chess game tree is highly complex. Fortunately, the famous mathematician Shannon carried out this calculation for us, providing an estimate of the number of positions in the game tree (the Shannon number) and the number of different chess games, both intimately related.

According to Shannon, the number $10^{120}$ represents a lower bound for the number of distinct positions in chess (that is, the number of positions could be even greater, but not less than this limit). Regarding the lower bound of the number of chess games, it is estimated around $900^{40}$, assuming there are thirty possible moves for each position and that each turn involves one move per side, that is $30*30=900$, also assuming that the average duration of a game is 40 moves, obtaining the previous result <cite><a href="/en/references#cite-compplaychess-shannon" data-cite="compplaychess.shannon">[Claude E. Shannon, 1950]</a></cite>.

Taking into account the complexity of this problem, it is clear that it is infeasible to generate the complete game tree, so the use of estimates or heuristics is employed. These heuristics will indicate how favorable a state is, allowing only a reduced fraction of the game tree to be generated.

Furthermore, for the game tree to offer useful information, it is necessary to traverse it in a specific way. The algorithm that will be used for this purpose is minimax, along with its improved version with alpha-beta pruning. These concepts will be addressed in the following sections.
