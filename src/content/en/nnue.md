---
title: "Stockfish strikes back"
description: "The Stockfish development team, far from sitting idly by after its defeat against AlphaZero, decided to adopt a strategy that recalls the old saying: \"If you can't beat your enemy, join him\"."
chapter: "State of the Art"
part: "book"
order: 20
bookChapter: "4"
bookChapterTitle: "State of the Art"
sectionNumber: "4.1"
sectionTitle: "Stockfish strikes back"
navDepth: 2
pairedSlug: "nnue"
source: "en/nnue.tex"
draft: false
---

The Stockfish development team, far from sitting idly by after its defeat against AlphaZero, decided to adopt a strategy that recalls the old saying: "If you can't beat your enemy, join him". Thus, they opted to incorporate neural networks into Stockfish's structure. Their main objective was to maintain the original architecture of the program, but replace the heuristic developed by programmers with one based on a neural network. This modification would allow Stockfish to evaluate game positions with much greater accuracy, especially "quiet" positions.

However, this new strategy presented a significant challenge. By implementing neural networks in the heuristic, the computational cost of its calculation would be considerably increased, which would reduce the search speed. Heuristics based on neural networks, with their large number of layers, have a much higher computational cost than the heuristics used by traditional chess modules. For this reason, AlphaZero opted to use a Monte Carlo tree search instead of alpha-beta pruning.

To the fortune of Stockfish's developers, the solution to this problem emerged from an unexpected place: the world of Shogi. Shogi, a strategy game very popular in Japan and with many similarities to chess, allowing the transfer of many concepts between both games. In this context, a new neural network architecture called NNUE (from its English acronym, "Efficiently Updateable Neural Networks") emerged <cite><a href="/en/references#cite-nasu2018efficiently" data-cite="nasu2018efficiently">[Nasu, 2018]</a></cite>. This architecture sought to create a neural network that could be calculated very quickly, which offered a significant boost for Stockfish's development.

The NNUE-type neural network was designed with the primary purpose of maximizing its calculation speed. The premise is simple: the greater the calculation speed, the greater the number of nodes that can be explored and, therefore, the better the move that will be found. NNUEs are characterized by having a very small number of layers (it is uncommon to find more than five) and by using perceptron layers.

To adapt the representation of a chess position to a perceptron layer, it is necessary to adopt a completely novel approach. This is where the format known as HalfKP comes into play, an innovative and efficient representation that allows transforming chess positions into a format suitable for use with neural networks based on perceptrons.

The term HalfKP derives from Half-King-Piece, a name that clearly reflects its operating mechanism. The fundamental concept behind HalfKP is to establish a relationship between the position of the kings on both sides and the arrangement of the other pieces on the chess board.

Specifically, HalfKP uses a binary representation (only takes value 0 or 1) to indicate the presence of a certain type of piece in a specific position, conditioned by the position where your king is located. For example, if your king is located on square e1 and a knight on your side is on square b1, then the entry corresponding to these coordinates in the binary representation will have a value of 1. This procedure is applied analogously for the opposite side.

The binary representation consists of a total of $64 \times 64 \times 8 \times 2 = 81920$ entries. The first factor of 64 corresponds to the 64 possible squares for the king, the second 64 refers to the different locations where any other piece could be found, the 8 refers to the different types of possible pieces excluding kings (that is, pawn, rook, knight, bishop, queen and their black counterparts), and finally, the 2 indicates that this process is carried out for the kings of both sides.

In contrast, the output of this system is much simpler and consists of a single numerical value that represents the evaluation of the position in terms of centipawns, where 1 pawn equals 100 centipawns. This is one of the most commonly used units of measurement to evaluate position in a chess game.

Below is an example of how the input works given its complexity. Given the board shown in Figure [reference](#fig-tablero-de-ejemplo-para-halfkp).

<figure id="fig-tablero-de-ejemplo-para-halfkp">
  <div class="chessboard" data-fen="b2r3r/k4p1p/p2q1np1/NppP4/3p1Q2/P4PPB/1PP4P/1K1RR3 w - - 1 24" data-size="8" data-chess-options="&quot;setfen=b2r3r/k4p1p/p2q1np1/NppP4/3p1Q2/P4PPB/1PP4P/1K1RR3 w - - 1 24, largeboard&quot;" role="img" aria-label="Example board for HalfKP" data-rendered="source" data-board-asset="board-8x8-0e3dab4ed34f10af.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-0e3dab4ed34f10af.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Example board for HalfKP</figcaption>
</figure>

We will have marked with 1 the following entries:

- Own king b1 and own pawn a3
- Own king b1 and own pawn b2
- Own king b1 and own pawn c2
- Own king b1 and own pawn d5
- Own king b1 and own pawn f3
- Own king b1 and own pawn g3
- Own king b1 and own pawn h2
- Own king b1 and opponent pawn a6
- Own king b1 and opponent pawn b5
- Own king b1 and opponent pawn c5
- Own king b1 and opponent pawn d4
- Own king b1 and opponent pawn f7
- Own king b1 and opponent pawn g6
- Own king b1 and opponent pawn h7
- Own king b1 and own knight a5
- Own king b1 and opponent knight f6
- Own king b1 and own bishop h3
- Own king b1 and opponent bishop a8
- Own king b1 and own rook d1
- Own king b1 and own rook e1
- Own king b1 and opponent rook d8
- Own king b1 and opponent rook h8
- Own king b1 and own queen f4
- Own king b1 and opponent queen d6

For the opposing monarch, we would use a similar designation. We should only replace the phrase "Own king b1" with "Opponent king a7", inverting the terms 'own' and 'opponent' in the pieces on the list. Those squares that do not appear in any of the lists will remain at zero. Regarding input values, it is important to note that certain entries will never be able to have a value of 1. For example, in a situation where 'own king e1' and 'piece e1' are simultaneously present. Despite this, to facilitate processing, these positions are usually maintained.

It is notable that this representation contains some redundancy, that is, it includes additional information. This characteristic is evident in the repetition of piece placement for each king. However, such redundancy offers certain advantages, especially in the context of neural networks, which are able to optimize their results in this circumstance. Another benefit of this representation lies in its ease of performing updates. If a piece is moved, it is only necessary to assign two of the entries to 1 and another two to 0. In contrast, if one of the kings is moved, a greater number of modifications will be required. Fortunately, in chess, king moves are infrequent, except in the final stages of the game.

Furthermore, this representation provides an advantage due to its simplicity in "reflecting" the position on the board. If we want to exchange white pieces for black pieces in a given position, we only need to exchange the section corresponding to our king with that of the opposing king. By keeping this representation always oriented towards the player who has the turn, it allows quick adaptation to different game configurations.

To train this type of neural network, a combination of supervised and reinforced learning is used. In supervised learning, high-quality games involving the strongest grandmasters and games between modules are used, especially from the *open source* version of AlphaZero, Leela Chess Zero. After completing this supervised learning stage, it is combined with reinforcement learning, in which games are played against itself, following the approach used by AlphaZero.

As for the neural network, it has a first layer of 256 perceptrons, each of which can receive a total of 40960 inputs. The 256 values generated by this layer are transferred to a second layer consisting of 32 perceptrons. The results of this second layer are processed in a third layer also of 32 perceptrons. Finally, these consolidate their results into a single output, which has been previously discussed <cite><a href="/en/references#cite-klein2022neural" data-cite="klein2022neural">[Klein, 2022]</a></cite>.

In the first layer, 40960 inputs are handled, but wasn't it mentioned that there are 81920 inputs in total? Indeed, that is correct, but the input is divided between the own king section and the opposing king section. Each of these sections is processed independently by the same perceptrons and transferred to the second layer, resulting in a total of 512 inputs instead of the initially expected 256 due to the 256 perceptrons in the first layer.

One way to conceptualize this process is to think that the neural network is evaluating the arrangement of pieces in relation to each king, trying to determine which of the two sides has a more favorable situation.

The use of this neural network entails a series of advantages for its implementation in the field of computing. These benefits include the ability to reuse calculations already made from other positions, which is achieved through minimal variations in the inputs. Furthermore, the structure of the network allows executing various calculations in parallel, that is, performing several operations simultaneously. This aspect facilitates a notable increase in processing speed, contributing to a more efficient and faster performance of the neural network in analyzing positions in the game of chess.

After the implementation of this improvement, Stockfish has managed to reaffirm its position among the best chess modules worldwide. However, the competition to determine the best chess program is an annual high-level event and the contest is fierce. Multiple different programs participate, but those that generally occupy the leading positions use approaches similar to that of Stockfish or that of AlphaZero/Leela Chess Zero. The continuous innovation and improvement in chess programming strategies ensure an exciting and uncertain competition, showing the great advancement in the intersection of artificial intelligence and the game of chess.
