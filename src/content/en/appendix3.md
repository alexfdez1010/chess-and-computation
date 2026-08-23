---
title: "Chess Notation"
description: "In this appendix, we will delve into algebraic chess notation, which is the most widely used today. We will opt for its abbreviated version, where only the destination square of the piece is specified."
chapter: "Chess Notation"
part: "appendix"
order: 25
bookChapter: "C"
bookChapterTitle: "Chess Notation"
sectionNumber: "C"
sectionTitle: "Chess Notation"
navDepth: 1
pairedSlug: "appendix3"
source: "en/appendix3.tex"
draft: false
---

In this appendix, we will delve into algebraic chess notation, which is the most widely used today. We will opt for its abbreviated version, where only the destination square of the piece is specified, unlike the extended version that also includes the origin square. The logic of this notation is very straightforward: each move is recorded by indicating the type of piece, followed by the designation of the column (using a lowercase letter) and a number to specify the row where this new piece will be placed. Sometimes, the letter indicating the type of piece is not required, since, in the case of pawns, it is omitted, which implies that if the type of piece is not specified, it is assumed to be a pawn.

However, this notation can present certain complications. For example, it may occur that two pieces of the same type can move to the same square, and with the information originally provided by this notation, it would not be possible to discern which of these pieces is moving. To resolve this problem, the original row or column is included between the letter indicating the type of piece and the column letter (in very exceptional cases it may be necessary to specify both, the column and the row, to avoid any ambiguity), in order to indicate which specific piece is moving.

Columns are designated with letters from 'a' to 'h' from left to right, while rows are numbered from 1 to 8 from bottom to top.

The representation of each piece through a letter varies depending on the language. In this text, the Spanish designations will be used. Since the English designations are the most widely used, their equivalents are also shown. Below is a table with the designations for each type of piece in both languages.

| Piece | Letters in Spanish | Letters in English |
| --- | --- | --- |
| King | R | K |
| Queen | D | Q |
| Rook | T | R |
| Bishop | A | B |
| Knight | C | N |

*Designations in Spanish and English for each type of chess piece*

The pattern followed in Spanish is really simple, only the first letter of the piece's name is taken. In English, a similar pattern is followed, using the corresponding English names (*King*, *Queen*, *Rook*, *Bishop* and *Knight*, in the order they appear in the table). However, it is observed that *King* and *Knight* begin with the same letter, so for the knight the second letter is used.

Finally, it should be noted that when a piece is captured, "x" is added to indicate it, just as "#" is added to indicate checkmate. However, these symbols, although useful for quickly identifying these situations in the game, do not provide additional information to the move itself, since these circumstances can be deduced from the original position and the move made. For this reason, these indicators are sometimes omitted.

## Examples

Having introduced the theoretical principles, it is essential to illustrate with examples to achieve a clearer understanding of algebraic notation.

<figure id="fig-posicion-inicial-del-ajedrez">
  <div class="chessboard" data-fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" data-size="8" data-chess-options="&quot;setfen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1, largeboard&quot;" role="img" aria-label="Initial position of a chess game" data-rendered="source" data-board-asset="board-8x8-41f3370b0b4360a0.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-41f3370b0b4360a0.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Initial position of a chess game</figcaption>
</figure>

Observing Figure [reference](#fig-posicion-inicial-del-ajedrez), one can appreciate the arrangement of rows and columns on the board, as described in the introduction. The white pieces make a move, resulting in the position shown in Figure [reference](#fig-posicion-despues-de-cf3).

<figure id="fig-posicion-despues-de-cf3">
  <div class="chessboard" data-fen="rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 1 1" data-size="8" data-chess-options="&quot;setfen=rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 1 1, largeboard&quot;" role="img" aria-label="Position after Nf3" data-rendered="source" data-board-asset="board-8x8-3a516bc445886674.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-3a516bc445886674.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Position after Nf3</figcaption>
</figure>

This move is represented as Nf3 in algebraic notation, since the knight moves from square g1 to square f3. Since there is no other knight that can move to square f3, it is not necessary to provide additional information.

From this position, the black pieces make the move Nf6, leading us to the position shown in Figure [reference](#fig-posicion-despues-de-cf6).

<figure id="fig-posicion-despues-de-cf6">
  <div class="chessboard" data-fen="rnbqkb1r/pppppppp/5n2/8/8/5N2/PPPPPPPP/RNBQKB1R w KQkq - 2 2" data-size="8" data-chess-options="&quot;setfen=rnbqkb1r/pppppppp/5n2/8/8/5N2/PPPPPPPP/RNBQKB1R w KQkq - 2 2, largeboard&quot;" role="img" aria-label="Position after Nf6" data-rendered="source" data-board-asset="board-8x8-ad88b41e7bdebc78.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-ad88b41e7bdebc78.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Position after Nf6</figcaption>
</figure>

The white pieces continue with d4 and the black pieces respond with d5, resulting in the following position:

<figure id="fig-posicion-despues-de-d4-y-d5">
  <div class="chessboard" data-fen="rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 1 3" data-size="8" data-chess-options="&quot;setfen=rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 1 3, largeboard&quot;" role="img" aria-label="Position after d4 and d5" data-rendered="source" data-board-asset="board-8x8-e7f9acb3f48c37fc.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-e7f9acb3f48c37fc.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Position after d4 and d5</figcaption>
</figure>

Here a small problem arises: in the previous position, the white pieces wish to move the knight from b1 to d2, but the white knight on f3 can also move to that square. Therefore, it is necessary to add the column or row, so the move could be represented as Nbd2 or N1d2. Both options are valid, although Nbd2 is the most common choice.

<figure id="fig-posicion-despues-de-cbd2">
  <div class="chessboard" data-fen="rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPPNPPPP/R1BQKB1R b KQkq - 1 3" data-size="8" data-chess-options="&quot;setfen=rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPPNPPPP/R1BQKB1R b KQkq - 1 3, largeboard&quot;" role="img" aria-label="Position after Nbd2" data-rendered="source" data-board-asset="board-8x8-31a09bdf00814e81.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-31a09bdf00814e81.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Position after Nbd2</figcaption>
</figure>

In addition to the commonly seen moves, there are some special moves that deserve to be briefly mentioned. The first of these is called promotion, which occurs when a pawn reaches the last opposite row and is offered the opportunity to transform into another piece. The transformation options include bishop, knight, rook, or queen. Since the queen is the most powerful piece, it is usual for the pawn to transform into this piece, but depending on the circumstances, it could transform into another type of piece. To indicate this move, a lowercase letter is added at the end of the original move, indicating what piece it has transformed into.

Finally, there remains the special move known as castling, which allows moving the king and a rook simultaneously. There are two types of castling: short castling, where the king moves to column g and the rook to column f (using the rook closest to the king), and is marked in notation with "0-0". Long castling, on the other hand, involves using the rook farthest from the king, and the king moves to column c and the rook to column d. It is marked with "0-0-0". To perform castling, neither the king nor the rook with which it is performed must have moved previously. Below is an example of how castling is performed in Figure [reference](#fig-ejemplo-de-como-efectuar-el-enroque). As a curious fact, this position belongs to the Spanish opening, also known as the Ruy López opening. Ruy López is considered the first world chess champion and is native to Extremadura, Spain.

<figure id="fig-ejemplo-de-como-efectuar-el-enroque">
  <div class="chessboard" data-fen="r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 3 4" data-size="8" data-chess-options="&quot;setfen=r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 3 4&quot;" role="img" aria-label="Example of how to perform castling" data-rendered="source" data-board-asset="board-8x8-51279ab4b7f4a547.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-51279ab4b7f4a547.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <div class="chessboard" data-fen="r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 4 4" data-size="8" data-chess-options="&quot;setfen=r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 4 4&quot;" role="img" aria-label="Example of how to perform castling" data-rendered="source" data-board-asset="board-8x8-e824dae33bcd1b4e.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-e824dae33bcd1b4e.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Example of how to perform castling</figcaption>
</figure>

In the previous example, the white pieces have performed short castling, which would be denoted with the move "0-0". Castling is a very common move, as it allows putting the king to safety and at the same time allows the rook with which castling is performed to enter the game quickly.

Additionally, in recorded or broadcast games, each move is often recorded along with the move number, so a sequence of moves might look like this:

1. e4 e5
2. Nf3 Nc6
3. Bb5 a6
4. Ba4 Nf6
5. O-O Be7

This represents five moves (or ten plies) of the Spanish opening or Ruy López opening. As you can see, the moves of the white and black pieces are recorded together, with the move of the white pieces first.
