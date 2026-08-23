---
title: "Heuristics"
description: "A heuristic is a strategic method or general rule that we employ to simplify decision-making or the resolution of complex problems."
chapter: "Artificial Intelligence"
part: "book"
order: 7
bookChapter: "2"
bookChapterTitle: "Artificial Intelligence"
sectionNumber: "2.4"
sectionTitle: "Heuristics"
navDepth: 2
pairedSlug: "heuristics"
source: "en/heuristics.tex"
draft: false
---

A heuristic is a strategic method or general rule that we employ to simplify decision-making or the resolution of complex problems. This concept can be visualized as possessing a compass while navigating through a dense forest, instead of a detailed map: although it does not ensure that we will find the most direct path to our destination, it helps us avoid getting lost in the labyrinth of uncertainty.

Heuristics facilitate our ability to make decisions and act quickly without requiring a deep analysis of every option presented to us. In many situations, these mental strategies prove to be extremely useful and efficient. However, it is important to keep in mind that they can also lead us to errors or cognitive biases, since they are based on simplifications of reality, not on its detailed analysis.

A clear example of a heuristic is the rule "if everyone else is doing something, it is probably the best option". Although in certain cases this heuristic can be effective (for example, choosing a crowded restaurant instead of an empty one), it does not always ensure the optimal choice (such as following a harmful or detrimental trend simply because it is popular).

In contexts such as the game of chess, heuristics manifest as functions that take a state (position) as input and return a numerical value that reflects the "goodness" of that state. It is crucial to understand that heuristics are approximations, since the quality of a state can only be fully determined through the development of the game tree that originates from that state. With heuristics, we seek to avoid precisely that complete development. We can define this notion more formally as follows:

$$
f(\Theta) = \delta_\Theta
$$

| $\Theta$: State |
| --- |
| $\delta_\Theta$: Heuristic value associated with state $\Theta$ |
| $f(\Theta)$: Heuristic function |

### Application of heuristics to chess

Having established an abstract definition of what constitutes a heuristic, let us proceed to explore how it is applied in the context of chess. One of the most commonly used heuristics in chess involves calculating the difference in "pawns" between the two players. To do this, each piece (with the exception of the king) is assigned a value based on its strategic relevance in the game. Then, the total value of the pieces for each player is calculated and the total value of the Black player's pieces is subtracted from the total value of the White player's pieces. In this sense, if the result of this heuristic is positive, White is in an advantageous position; if it is 0, the position is balanced; and if it is negative, Black has superiority.

Below, the [piece values table](#fig-valor-en-peones-asociados-a-cada-pieza) shows the value assigned to each piece. Of course, the value of a piece depends on its specific position on the board, but these estimates are usually good approximations in most situations.

<figure id="fig-valor-en-peones-asociados-a-cada-pieza">
  <div class="figure-table">
<table>
    <tr><th>Piece</th><th>Value (in pawns)</th></tr>
    <tr><td>Queen</td><td>9</td></tr>
    <tr><td>Rook</td><td>5</td></tr>
    <tr><td>Bishop</td><td>3</td></tr>
    <tr><td>Knight</td><td>3</td></tr>
    <tr><td>Pawn</td><td>1</td></tr>
  </table>
  </div>
  <figcaption>Value in pawns assigned to each piece in chess</figcaption>
</figure>

Following a scale based on pawns, these have a unit value of 1. The bishop and knight are assigned a value of 3, although some opinions hold that bishops may be slightly more valuable than knights, attributing them a value of 3.5 pawns. The rook is valued at 5 pawns, while the value of the queen depends on the presence on the board of the rooks corresponding to its own side. These valuations of the pieces are the result of empirical consensus of the chess community over the years and, in fact, it is one of the first things that beginners learn in this challenging game. It should be noted that the king is not included in this valuation due to its critical importance in the game: its capture ends the game and it is always present on the board.

Next, the application of this heuristic is illustrated with a specific position, shown in the [example heuristic position](#fig-posicion-de-ejemplo-para-calcular-la-heuristica).

<figure id="fig-posicion-de-ejemplo-para-calcular-la-heuristica">
  <div class="chessboard" data-fen="rnbqk1nr/ppp2ppp/8/4P3/1BP5/8/PP2KpPP/RN1Q1BNR b kq - 1 7" data-size="8" data-chess-options="&quot;maxfield=h8, setfen=rnbqk1nr/ppp2ppp/8/4P3/1BP5/8/PP2KpPP/RN1Q1BNR b kq - 1 7, largeboard&quot;" role="img" aria-label="Example position to calculate the heuristic" data-rendered="source" data-board-asset="board-8x8-8a233edf3b81d5da.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-8a233edf3b81d5da.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div>
  <figcaption>Example position to calculate the heuristic</figcaption>
</figure>

First, we calculate the sum of the piece values for each side. White possesses a queen, two rooks, two bishops, two knights and six pawns, giving a total value of $9*1+5*2+3*2+3*2+1*6=37$. On the other hand, Black has a queen, two rooks, one bishop, two knights and seven pawns, with a total value of $9*1+5*2+3*1+3*2+1*7=35$. Finally, we subtract the total value of Black pieces from the total value of White pieces, obtaining $37-35=2$, which indicates that, according to the heuristic, White would have an advantage equivalent to two pawns. But is this correct?

Surprisingly, reality contradicts the heuristic's prediction. Although White appears to have an advantage according to the heuristic, in reality they are in a losing position and it is Black who possesses a significant advantage after the brilliant move fxg1c.

Unfortunately, this primitive heuristic does not usually produce good results, as it is too materialistic, worrying more about the quantity of pieces each side has than about their placement on the board. This implies that it is not able to adequately evaluate most positions. However, this heuristic provides a solid foundation for the development of more sophisticated heuristics, which should incorporate more abstract concepts, such as the location of rooks on open files, bishops on open diagonals, etc. With the introduction of these more complex concepts, a much more accurate heuristic could be obtained.

Before the introduction of reinforcement learning, manually created heuristics used by the main chess engines (chess playing programs) had great complexity, which allowed them to adequately evaluate strategic positions.

Now, we might ask ourselves: Wouldn't it be preferable for the engines to develop their own heuristics from the experience of playing games? The answer is yes. And as mentioned in section 4.1, this would fall into the category of machine learning, where an algorithm learns based on its experience. However, the challenge lies in that the algorithm will not receive immediate feedback on whether the move it has just made is good or bad, but rather must wait until the end of the game. Furthermore, within the moves it has made there can be both very good and very bad ones, so to distinguish them it must play a large number of games and vary the moves to see which are most effective.

The type of machine learning that best adapts to this situation is reinforcement learning and, combined with deep neural networks (deep reinforcement learning), has allowed chess engines to reach previously unimaginable levels of play.
