---
title: "Chess"
description: "\" However, this simplistic definition fails to encompass the complexity that chess entails. Chess can be considered a sport, a science, and an art, all at the same time."
chapter: "Chess"
part: "appendix"
order: 24
bookChapter: "B"
bookChapterTitle: "Chess"
sectionNumber: "B"
sectionTitle: "Chess"
navDepth: 1
pairedSlug: "appendix2"
source: "en/appendix2.tex"
draft: false
---

The Royal Spanish Academy (RAE) defines chess as follows:

> "Board game between two people that is played on a checkerboard on which the 16 pieces of each player are arranged, unequal in importance and value, which move and capture those of the opponent according to certain rules."

However, this simplistic definition fails to encompass the complexity that chess entails. Chess can be considered a sport, a science, and an art, all at the same time. It is considered a sport due to the considerable physical and mental effort it requires. In fact, playing a chess game for four hours (or even more) can be more exhausting than practicing many other sports. Additionally, chess falls within science thanks to the application of the scientific method in its study, which has allowed extensive development and a fruitful relationship with computing. Finally, chess can also be considered an art, as it provides chess players with aesthetic enjoyment through patterns, positions, and exceptional moves.

Historically, chess has enjoyed some popularity in intellectual circles, which has contributed to its reputation for erudition. However, today it has managed to reach a much wider audience thanks to the promotion of fast modalities as *eSport* and the great popularity of the series *The Queen's Gambit*. These factors have greatly expanded its base of followers and enthusiasts.

That said, it is important to establish the rules of this fascinating and seemingly inexhaustible game.

## Basic rules

Chess, like any other game, has a set of rules and a specific objective that players must achieve. The objective is common to both opponents and consists of achieving checkmate of the rival king. Checkmate occurs when a player's king is threatened by one of the opponent's pieces in such a way that it cannot escape this threat or move to an unthreatened square. From this objective, three possible results can be defined in a game: black wins if it manages to checkmate the white king, white wins if its pieces manage to checkmate the opposing king, and finally, a draw or stalemate occurs if checkmate is not possible or any of the following conditions are met:

- Both parties agree to a draw.
- A stalemate occurs where one of the sides cannot make any move.
- 50 moves have been made without capturing any piece or moving any pawn.
- The same position is repeated on the board three times.

The game is played in turns alternating between players, starting with white. On each turn, a player can move one of their pieces, which may result in capturing an opponent's piece. Depending on the piece, different possible moves are available. The true complexity of chess lies in achieving proper coordination between pieces, taking into account the specific movements of each of them.

## Pieces

### King

The most important piece in chess is the king, since if it receives checkmate (that is, it is threatened by an enemy piece and cannot make any legal move to escape the threat), the game is automatically lost. Generally, at the beginning and middle of the game, the king must be kept in a safe position. However, the king usually plays a very relevant role in the endgame.

On the board, at the beginning of the game, the king is located in the center of the first row from each player's perspective.

<figure id="fig-movimientos-del-rey">
  <div class="chessboard" data-fen="start" data-size="8" data-pieces="Ke5" data-arrows="e5-e4, e5-f4, e5-f5, e5-f6, e5-e6, e5-d6, e5-d5, e5-d4" data-chess-options="&quot;maxfield=h8, showmover=false, pgfstyle=straightmove, markmoves={e5-e4, e5-f4, e5-f5, e5-f6, e5-e6, e5-d6, e5-d5, e5-d4}, arrow=to, setpieces={Ke5}, largeboard&quot;" role="img" aria-label="Possible king moves" data-rendered="source" data-board-asset="board-8x8-1064e8662e374566.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-1064e8662e374566.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Possible king moves</figcaption>
</figure>

As can be seen on the board, the king can move to all adjacent squares, either in horizontal, vertical, or diagonal direction, but can only move one step at a time. In addition, the king has a special move called castling, which allows moving the king and a rook simultaneously in the same move, providing the king with a safer location. In Appendix 3, an example of how this special move is performed is shown in the [castling example](/en/appendix3#fig-ejemplo-de-como-efectuar-el-enroque).

### Queen

After the king, the queen is considered the most important piece in chess, since its movements combine those of a rook and a bishop. This versatility of movement gives it great power on the board. At the beginning of the game, the queen is located on the square immediately to the right of the king from each player's perspective.

<figure id="fig-movimientos-de-la-dama">
  <div class="chessboard" data-fen="start" data-size="8" data-pieces="Qe5" data-arrows="e5-e1, e5-h2, e5-h5, e5-h8, e5-e8, e5-b8, e5-a5, e5-a1" data-chess-options="&quot;maxfield=h8, showmover=false, pgfstyle=straightmove, markmoves={e5-e1, e5-h2, e5-h5, e5-h8, e5-e8, e5-b8, e5-a5, e5-a1}, arrow=to, setpieces={Qe5}, largeboard&quot;" role="img" aria-label="Possible queen moves" data-rendered="source" data-board-asset="board-8x8-f3dfe44520cd1d06.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-f3dfe44520cd1d06.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Possible queen moves</figcaption>
</figure>

The queen can move to any square along the row, column, or diagonal where it is located. As can be seen in the [queen moves diagram](#fig-movimientos-de-la-dama), the queen can move in all directions at any distance, as long as there is no piece blocking its path. The premature loss of the queen can lead to an almost inevitable defeat, due to its ability to control large areas of the board and participate in numerous combinations and attacks.

### Rook

Each player has two rooks, located in the corners of their respective side of the board. Rooks have the ability to move to any square along the row and column where they are located.

<figure id="fig-movimientos-de-la-torre">
  <div class="chessboard" data-fen="start" data-size="8" data-pieces="Re5" data-arrows="e5-e1, e5-h5, e5-e8, e5-a5" data-chess-options="&quot;maxfield=h8, showmover=false, pgfstyle=straightmove, markmoves={e5-e1, e5-h5, e5-e8, e5-a5}, arrow=to, setpieces={Re5}, largeboard&quot;" role="img" aria-label="Possible rook moves" data-rendered="source" data-board-asset="board-8x8-0b6584bbc22babcf.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-0b6584bbc22babcf.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Possible rook moves</figcaption>
</figure>

As can be seen in the [rook moves diagram](#fig-movimientos-de-la-torre), rooks can move along rows and columns in all directions. They can move from one end of the board to the other, which gives them great strategic and tactical capability, especially in the middle and endgame. Rooks are valuable pieces in chess, as they can control entire columns and rows, participate in combined attacks, and protect the king in defensive positions. Their mobility and versatility make them key pieces for planning strategies and achieving objectives in the game.

### Bishop

Each player has two bishops, one located to the left of the queen and the other to the right of the king.

<figure id="fig-movimientos-del-alfil">
  <div class="chessboard" data-fen="start" data-size="8" data-pieces="Be5" data-arrows="e5-h2, e5-h8, e5-b8, e5-a1" data-chess-options="&quot;maxfield=h8, showmover=false, pgfstyle=straightmove, markmoves={e5-h2, e5-h8, e5-b8, e5-a1}, arrow=to, setpieces={Be5}, largeboard&quot;" role="img" aria-label="Possible bishop moves" data-rendered="source" data-board-asset="board-8x8-8457a1e95d38f64d.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-8457a1e95d38f64d.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Possible bishop moves</figcaption>
</figure>

Like rooks, bishops are valuable pieces in chess due to their unique movement ability along diagonals. As shown in the [bishop moves diagram](#fig-movimientos-del-alfil), bishops can move diagonally across the entire board. They can move from one end to the other in a single movement, taking advantage of their characteristic movement. This diagonal movement ability gives them great strategic and tactical utility, as they can control squares of different colors and participate in combined attacks. Bishops are key pieces in the opening and middle game, where their mobility can influence the development of the game and the occupation of strategic positions.

### Knight

The knight is one of the most unique pieces in chess, as it has an L-shaped movement and differs from the movement of other pieces. Furthermore, unlike other pieces, the knight has the ability to jump over other pieces in its trajectory.

<figure id="fig-movimientos-del-caballo">
  <div class="chessboard" data-fen="start" data-size="8" data-pieces="Ne5" data-arrows="e5-f3, e5-g4, e5-g6, e5-f7, e5-d7, e5-c6, e5-c4, e5-d3" data-chess-options="&quot;maxfield=h8, showmover=false, pgfstyle=straightmove, markmoves={e5-f3, e5-g4, e5-g6, e5-f7, e5-d7, e5-c6, e5-c4, e5-d3}, arrow=to, setpieces={Ne5}, largeboard&quot;" role="img" aria-label="Possible knight moves" data-rendered="source" data-board-asset="board-8x8-deaa7e349c3d4d50.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-deaa7e349c3d4d50.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Possible knight moves</figcaption>
</figure>

As shown in the [knight moves diagram](#fig-movimientos-del-caballo), the knight can move in an L-shaped movement, advancing two squares in one direction (horizontal or vertical) and then turning at a right angle to advance one additional square in a perpendicular direction. This peculiarity of movement allows the knight to jump over other pieces in its trajectory, which makes it an unpredictable and strategically interesting piece in the game. Each player has a pair of knights, which are positioned between the rooks and bishops in the initial board configuration. Knights are known for their ability to maneuver quickly across the board and can play an important role in creating threats, defense, and performing tactical combinations.

### Pawn

Despite being the piece of lowest value, the pawn has a rather peculiar movement in chess. On its first move, it has the option to advance two squares instead of one, which gives it certain tactical flexibility.

<figure id="fig-movimientos-del-peon">
  <div class="chessboard" data-fen="start" data-size="8" data-pieces="Pb2, pa3, pc3, Pf4, pg4" data-arrows="b2-b4, b2-a3, b2-c3, f2-f4, g4-f3, g4-g3" data-chess-options="&quot;maxfield=h8, showmover=false, pgfstyle=straightmove, markmoves={b2-b4, b2-a3, b2-c3, f2-f4, g4-f3, g4-g3}, arrow=to, setpieces={Pb2, pa3, pc3, Pf4, pg4}, largeboard&quot;" role="img" aria-label="Possible pawn moves" data-rendered="source" data-board-asset="board-8x8-532dce05dd636d02.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-532dce05dd636d02.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Possible pawn moves</figcaption>
</figure>

The pawn has a particularity in its movement and capture. As for its regular movement, the pawn can advance one square forward in its column, as shown in the [pawn moves diagram](#fig-movimientos-del-peon). Additionally, when in a capturing position, the pawn can only capture a piece on the two diagonal squares toward the other side of the board from where it is located.

The pawn also has a special move called "en passant capture". This move applies when an enemy pawn advances two squares from its initial position and is in a position adjacent to the rival pawn. In that case, the pawn can capture the enemy pawn as if it had only advanced one square.

It should be noted that the pawn cannot move backward. However, when a pawn reaches the opposite end of the board, promotion occurs. At this moment, the pawn can transform into any other piece, with the exception of the king, which gives the player the opportunity to improve their strategic position in the game.
