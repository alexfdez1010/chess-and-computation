---
title: "Standards"
description: "In this short chapter we will address some of the fundamental standards implemented in chess computer programs. But first, we must ask ourselves: what is a standard?"
chapter: "Standards"
part: "book"
order: 22
bookChapter: "5"
bookChapterTitle: "Standards"
sectionNumber: "5.0"
sectionTitle: "Standards"
navDepth: 1
pairedSlug: "standards"
source: "en/standards.tex"
draft: false
---

In this short chapter we will address some of the fundamental standards implemented in chess computer programs. But first, we must ask ourselves: what is a standard?

A standard is a technical specification, or a set of guidelines and rules designed to ensure interoperability and compatibility between different systems, devices, or applications. In the specific context of computer science, standards ensure that programs developed by various organizations and people can be compatible in numerous aspects, thus enhancing their functionalities and allowing fluid interaction between them.

The standards governing computer chess are multiple and varied. In this book, however, we will focus on three of the most important.

The first of these is FEN (Forsyth-Edwards Notation), a standard used to represent chess positions. The name of this standard comes from its creators, David Forsyth, who was the first to develop this system, and Steven Edwards, who led the specification of both the FEN standard and PGN (Portable Game Notation), which is the second standard we will analyze.

PGN is used to precisely describe a complete chess game, from its beginning to its conclusion. Since sometimes the initial position of a game does not start with the usual initial position, it is necessary to specify this position using FEN, so that these two standards complement each other and work together.

Finally, we will explore the last standard, known as UCI (Universal Chess Interface). This fulfills a dual function: on the one hand, it specifies how moves should be represented in chess so that they can be interpreted without difficulty by chess engines; on the other hand, it regulates communication between the graphical interfaces of chess programs and the respective engine, which is the program in charge of determining the moves. The conjunction of these specifications contributes to a more fluid and effective digital chess experience. This is materialized in the fact that we can use any engine in any interface.

## FEN

Forsyth-Edwards Notation (FEN) establishes a universal standard that can be interpreted by humans and computers in a simple and efficient manner. This standard is used to represent chess positions, its main purpose being to contain all relevant information of a position so that it can be reproduced exactly and without obstacles. Plain text format<span class="footnote" role="note">In the field of computer science, files can be categorized into two types: plain text and binary. While plain text is readable by both humans and computers, binary is interpretable only by machines. Although binary files consume less memory than their plain text equivalent, the latter is preferred for its simplicity and universality.</span> is used in FEN notation, which facilitates its interpretation by humans and its processing by computers.

FEN notation is divided into six fields, each separated by spaces. Below, the content and interpretation of each of these fields are detailed:

1. **Piece placement:** Defines the arrangement of pieces on the board, row by row, starting from the upper left corner. Each piece is represented by its identifying letter in English (consult Table [reference](#tab-designaciones-en-espanol-e-ingles-para-cada-tipo-de-pieza-de-ajedrez) for exact piece correspondences). White pieces are denoted with uppercase letters and black pieces with lowercase letters. If there are empty spaces between pieces, a number is added representing the number of spaces. Rows are separated with '/'.
2. **Side:** Indicates the turn to play. 'w' is used to indicate that it is white's turn and 'b' for black.
3. **Castling:** Describes castling possibilities. A '-' is placed if there are no castling options for either side. Otherwise, a 'K' is added for kingside castling and a 'Q' for queenside castling. If the letter is uppercase, it corresponds to white; if lowercase, to black.
4. ***En passant*:** Indicates the possibility of making an en passant capture. A '-' is used if it is not possible; otherwise, the square through which the pawn passed after moving two spaces is indicated, that is, the square where the opposing pawn would end up if it made the en passant capture.
5. **Moves since last capture or pawn advance:** Provides the number of moves elapsed without captures or pawn movements, which is related to the 50-move rule. A "move" is considered complete when both players have made a move. Therefore, this rule would be activated when this counter reaches 100.
6. **Move counter:** Represents the total number of moves made since the beginning of the game.

To clarify these concepts, an example is proposed below. Figure [reference](#fig-tablero-de-ejemplo-para-fen) shows a chess position that we will represent using FEN notation.

<figure id="fig-tablero-de-ejemplo-para-fen">
  <div class="chessboard" data-fen="rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2" data-size="8" data-chess-options="&quot;setfen=rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2 largeboard&quot;" role="img" aria-label="Example board for FEN" data-rendered="source" data-board-asset="board-8x8-3afb5e96d80a3b70.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-3afb5e96d80a3b70.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Example board for FEN</figcaption>
</figure>

The arrangement of pieces would be expressed as follows (rows have been arranged separately for ease of understanding, but in reality they are separated with '/' as mentioned above):

```text
rnbqkbnr
pp1ppppp
8
2p5
4P3
8
PPPP1PPP
RNBQKBNR
```

The side's turn would correspond to white, so 'w' is written. Both sides have all castling options available, which is represented as 'KQkq'. There is no possibility of en passant capture, so '-' is placed. The last move was c5, which indicates that 0 moves have passed since the last "advance" move, and being on the second move of the game, it is indicated with a 2 in the last field.

The final FEN representation of the position is as follows (everything is written on the same line):

```text
rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR 
w KQkq - 0 2
```

FEN notation, although useful, has certain limitations. It does not specify if there have been consecutive repetitions of the same position (according to chess rules, three repetitions of the same position result in a draw). To remedy this drawback, Extended Position Description (EPD) has been developed, an extension of FEN that includes such information. Likewise, for Chess960 (a popular chess variant in which the initial arrangement of pieces on the first and last ranks is random), FEN presents some limitations regarding the representation of castling. For this case, there are two solutions: Shredder-FEN and X-FEN.

## PGN

PGN (Portable Game Notation), as established by Edwards <cite><a href="/en/references#cite-edwards1994portable" data-cite="edwards1994portable">[Edwards, 1994]</a></cite>, is the most widespread standard modality for representing chess games. Following the principles of FEN, a representation is sought that is easy to understand for people and, at the same time, efficient for processing by computational systems. This standard focuses on consolidating all relevant information of the game, which includes not only the game's moves, but also additional data, such as the identity of the players, the location of the game, among other details.

Regarding the representation of the game itself, a list of moves from the initial position to the final position of the game is used. The representation of moves is done using algebraic notation, which is described in detail in appendix 3.

In most cases, algebraic notation uses the English designations for pieces. The move number is also shown before each pair of moves. At the end of the game, the result is indicated: "1-0" for white's victory, "0-1" for black's victory, "1/2-1/2" for draws, and "*" if the game has not yet concluded. It is possible to add comments after each move, enclosing them in "{}". These comments can contain additional information about each move, such as the remaining time of each player, a resource used on platforms such as Lichess <cite><a href="/en/references#cite-lichess" data-cite="lichess">[lichess.org]</a></cite>.

Prior to the list of moves, additional information is incorporated into the game. This information can be heterogeneous, although computer programs usually require the inclusion of seven specific elements. These are:

- Event (*Event*): Designates the event in which the game took place.
- Site (*Site*): Refers to the place where the game was played, including the city, region, and country. In the event that the game was played on an *online* platform, it is indicated correspondingly.
- Date (*Date*): Date on which the game took place.
- Result (*Result*): Final result of the game.
- White (*White*): Identity of the player with the white pieces.
- Black (*Black*): Identity of the player with the black pieces.

In addition to these mandatory fields, other additional data can be included, such as ELO <span class="footnote" role="note">Official ranking system in chess</span>, the time allocated for each move, among others. In the event that the initial position is not standard, a FEN field must be added indicating this initial position.

Below is an example of a game using this format. This is a historic game that marked a milestone in the relationship between humans and machines in chess. This game corresponds to the sixth encounter between Deep Blue and then world champion Garry Kasparov, which concluded with a score of 3.5 to 2.5 in favor of Deep Blue.

```text
[Event "IBM Man-Machine"]
[Site "New York, NY USA"]
[Date "1997.05.11"]
[Round "6"]
[Result "1-0"]
[White "Deep Blue"]
[Black "Garry Kasparov"]

1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Nd7 5.Ng5 Ngf6 6.Bd3
e6 7.N1f3 h6 8.Nxe6 {The move surprised the 
spectators, as it was not believed possible that a 
machine could make a long-term sacrifice.} 
Qe7 9.O-O fxe6 10.Bg6+ Kd8 11.Bf4 b5 12.a4 Bb7 13.Re1 
Nd5 14.Bg3 Kc8 15.axb5 cxb5 16.Qd3 Bc6 17.Bf5 exf5 
18.Rxe7 Bxe7 19.c4 1-0
```

As can be observed, the game includes the seven mandatory fields and a comment on the most unexpected and important move of the game.

## UCI

The Universal Chess Interface (UCI) is a standard that facilitates two primary functions in the realm of digital chess. First, it allows moves to be represented in a way that is accessible to both computers and people. Secondly, UCI establishes the communication protocol between the graphical interface of chess software and the move processing engine. The adoption of this standard enables any graphical interface that implements it to be compatible with all engines that also make use of UCI, reflecting the efficiency and universality of the system.

The representation of moves in UCI is intuitive and direct, consisting of two consecutive coordinates that indicate the point of origin and destination of the moving piece. If the move involves a promotion, the letter identifying the new piece, in lowercase, is added to the coordinate sequence.

As an example, if we wish to make the move Nf3 from the initial position, in UCI format it would be represented as g1f3, indicating the knight's movement from position g1 to f3. The clarity of this representation lies in the fact that the move can be interpreted without prior knowledge of the board. If simply Nf3 is provided, we could not determine the piece's point of origin without analyzing the board. The move tells us that the knight is positioned at f3, but it could have started from d2, d4, g1, etc. The UCI format eliminates this ambiguity and simplifies move processing by directly specifying the point of origin and destination.

UCI's communication protocol, although its deepening is mainly oriented to developers, facilitates a "separation of responsibilities" between the graphical interface and the processing engine. The graphical interface is responsible for displaying the chessboard, the game (generally in PGN format), the opening book (which contains information about typical moves in the first moves of a game), the players' remaining time, among other details. The engine, on the other hand, is dedicated to generating moves in response to information received from the graphical interface about the current position, including the location of pieces, the possibility of castling, the remaining time, etc. Many of these engines allow configuring the ELO level they will "attempt" to play.

The added value of this protocol lies in the fact that, regardless of the internal structure of the graphical interface software and the engine, both can communicate effectively as long as they adhere to the same UCI interface. The engine can make use of technologies such as neural networks or more traditional approaches and will remain compatible as long as it adheres to the protocol.

In summary, the use of standards such as UCI in the world of digital chess provides a series of advantages, such as simplicity and clarity in the representation of moves, efficiency in their processing, and interoperability between different chess software. Furthermore, these standards promote fluid communication between the graphical interface and the processing engine, facilitating adaptation and compatibility with various technologies and methodologies. Ultimately, the adoption of these standards contributes to greater accessibility, comprehensibility, and enjoyment of chess.
