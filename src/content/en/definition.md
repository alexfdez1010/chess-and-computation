---
title: "Formal definition of chess"
description: "The analysis of how artificial intelligence (AI) and its subfields approach the study of chess requires first the establishment of a defined objective."
chapter: "Artificial Intelligence"
part: "book"
order: 5
bookChapter: "2"
bookChapterTitle: "Artificial Intelligence"
sectionNumber: "2.2"
sectionTitle: "Formal definition of chess"
navDepth: 2
pairedSlug: "definition"
source: "en/definition.tex"
draft: false
---

The analysis of how artificial intelligence (AI) and its subfields approach the study of chess requires first the establishment of a defined objective. The pursued goal is the development of an AI that can compete efficiently in a complete chess game, either against a human opponent or against another AI.

At first glance, this may seem like a colossal challenge. However, it is greatly simplified if restricted to the objective of determining the best possible move in a specific position. This sub-objective, in reality, equates to the initial objective, given that if the AI manages to discern the best move in any concrete situation, optimally performing consecutive moves is a direct consequence.

The possibility of focusing solely on the current position to find the best move derives from the fact that, for this task, information about previous positions or events that occurred earlier in the game is not necessary. Although this observation may seem obvious, its relevance should not be underestimated, as it allows us to categorize chess as a Markov Decision Process (MDP).

But what is an MDP and how does it relate to Markov Chains? Before answering these questions, it is crucial to explain the concept of Markov Chains and their intrinsic connection with MDPs.

### Markov Chains

Markov Chains arise from the field of probability, which may be surprising when relating them to chess, a game in which chance has no place. The connecting link lies in the fact that, despite chess being a purely deterministic game (given a move, the resulting position can be predicted with absolute certainty), it can be modeled as a probabilistic phenomenon where the position that arises after a specific move has a 100% probability of occurring.

In this context, Markov Chains represent stochastic processes in which the probability of one or more events occurring depends solely on the current state of the process. The [Markov chain example](#fig-ejemplo-de-una-cadena-de-markov) provides a visual example of a Markov Chain.

<figure id="fig-ejemplo-de-una-cadena-de-markov">
  <img src="/assets/book/definition/chain.png" alt="Example of a Markov Chain" loading="lazy" />
  <figcaption>Example of a Markov Chain</figcaption>
</figure>

In the cited example, the arrows symbolize transitions and the associated numbers represent the probability of that transition occurring. The circles, on the other hand, indicate the states. For example, from state 2, there is a 70% probability of transitioning to state 3 and a 30% probability of remaining in state 1. It is also possible for a state to transition to itself, as can be observed in state 1, which has a 50% probability of remaining unchanged.

To make our definition resemble a chess game, let us first consider that the current state represents the arrangement of pieces on the board. However, in a Markov chain, we do not find an equivalent to moves or movements. This is because Markov Chains do not consider interaction in their process. To incorporate such interaction, we need to expand the capabilities of Markov Chains to the Markov Decision Process.

Furthermore, it is essential to take into account that chess is a game of "perfect information". What does this mean? That both the player of the white pieces and the player of the black pieces are aware of the location of all the pieces, whose turn it is, and all information pertinent to the current state of the game.

### Markov Decision Process

A Markov Decision Process is composed of four elements:

- States (S)
- Actions (A)
- Transition function (F)
- Rewards (R)

$$
\text{MDP} = \{E, A, F, R \}
$$

The States ($E$) comprise all the possibilities in which the process can find itself. Some states are initial (the process can begin in them) and others are final (the process ends upon reaching these). When a final state is reached, it is said that an "episode" has concluded and it returns to one of the initial states to begin another "episode".

The Actions ($A$) encompass all the actions that an agent can perform, that is, the entity that interacts with the process. Usually, depending on the current state, only a subset of actions from the total set can be executed.

The Transition function ($F$) takes as parameters the current state and an action, and returns a new state. In other words, it determines the subsequent state based on the current state of the process and the action chosen by the agent.

The Rewards ($R$) assign a reward value (which can be negative) to the agent, depending on the state reached. This serves to guide the agent toward the most beneficial states.

### Chess as a Markov Decision Process

Now then, to define chess as a Markov Decision Process, it is necessary to describe each of these elements in the context of the game.

States: Similarly to Markov Chains, a state in chess includes the arrangement of pieces on the board, the player's turn, the possibility of castling or en passant capture, among other relevant factors. The initial states are those that are not final, that is, any arrangement of pieces that does not result in a victory or a draw. The final states include all situations in which a player has won or a draw condition has been met. Following the analogy with the "episodes" mentioned earlier, each chess game would be an episode.

Actions: In chess, with two players, there are two agents that can perform an action (a move) on their turn. The possible actions of each agent vary enormously depending on the player (the whites will have different moves available than the blacks).

Transition function: This function takes as input the current position and the desired move of the player whose turn it is (white or black), and returns the new board arrangement as a result of that move. This function is deterministic in chess, that is, a specific move will always result in a single board arrangement.

Rewards: The assignment of rewards is at the discretion of the system designer, but must follow certain principles. All non-final states must have a neutral reward of 0, since it cannot be determined if that arrangement favors any of the players. Final states must be classified according to whether they result in a victory for one of the players or a draw. The reward assignment must follow the following criterion:

$$
R_\textit{win} > R_\textit{draw} > R_\textit{lose}
$$

Where $R_\textit{win}$, $R_\textit{draw}$, and $R_\textit{lose}$ represent the rewards for winning, drawing, and losing, respectively. Following this convention, the reward for winning must be greater than that for drawing, and the reward for drawing must be greater than that for losing. Often, values of +1 for winning, 0 for drawing, and -1 for losing are assigned, although these values may vary according to the preferences of the system designer.

The possibility of modifying the reward granted for each move in a game, which by default is assumed to be zero, provides the opportunity to adjust the course of the game according to our needs or preferences. By assigning a negative reward to each move, we are in fact incentivizing a faster game, seeking to finish the game in the fewest number of moves possible. Conversely, a positive reward per move would encourage a game of longer duration. In summary, the adjustment of rewards allows a certain flexibility to calibrate the agent's behavior according to the specific objectives we wish to achieve.

Let us consider the game of chess, in which we implement a Markov Decision Process (MDP). The game procedure involves a cyclical sequence of steps that are executed in each turn, until reaching a terminal state, that is, until the game concludes.

The sequence of steps is presented as follows:

1. The agent receives a state and a reward from the environment. In this context, the agent is responsible for making the moves in the game. In chess, for example, where the players of the white and black pieces take turns to move, there would be a different agent for each color. The environment has the responsibility of providing the agents with information about the current state of the game, including the position of the pieces and whether the game has ended. In addition, it uses the transition function to determine what the next state will be. If the game has ended, the process concludes and each agent is awarded their final reward.
2. After receiving information about the current position, the agent decides the action (move) it will take in that position and communicates it to the environment.
3. After receiving the agent's move, the environment applies the transition function to determine the next position. Once this step is completed, it returns to the first step, and the agent corresponding to the color whose turn it is takes control.

This process is repeated until a terminal state is reached, which in chess generally means checkmate, a draw, or the resignation of one of the players. The [chess Markov decision process example](#fig-ejemplo-del-ajedrez-como-proceso-de-decision-de-markov) shows an example of this entire process.

<figure id="fig-ejemplo-del-ajedrez-como-proceso-de-decision-de-markov">
  <div class="localized-diagram mdp-chess-flow" role="group" aria-label="Example of chess as a Markov Decision Process">
    <strong class="mdp-agent"><span>Agent</span><small>Decision policy π(a|s)</small></strong>
    <div class="mdp-exchange" aria-label="Exchange between the agent and environment">
      <span class="mdp-message mdp-message-state"><i aria-hidden="true">↑</i><b>1</b><span>State s<sub>t</sub> + reward r<sub>t</sub> = 0</span></span>
      <span class="mdp-message mdp-message-action"><b>2</b><span>Action a<sub>t</sub> = ...d5</span><i aria-hidden="true">↓</i></span>
    </div>
    <section class="mdp-environment" aria-label="Environment and transition function">
      <header><span>Environment</span><strong>3 · Transition function T(s<sub>t</sub>, a<sub>t</sub>)</strong></header>
    <div class="mdp-state mdp-state-before"><div class="chessboard" data-fen="rnbqkb1r/pppppppp/5n2/8/3P4/5N2/PPP1PPPP/RNBQKB1R b KQkq - 2 2" data-size="8" data-chess-options="&quot;setfen=rnbqkb1r/pppppppp/5n2/8/3P4/5N2/PPP1PPPP/RNBQKB1R b KQkq - 2 2, largeboard&quot;" role="img" aria-label="Position before ...d5" data-rendered="source" data-board-asset="board-8x8-83f553f9ecb1316f.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-83f553f9ecb1316f.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div></div>
    <div class="mdp-state mdp-state-after"><div class="chessboard" data-fen="rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 0 3" data-size="8" data-chess-options="&quot;setfen=rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 0 3, largeboard&quot;" role="img" aria-label="Position after ...d5" data-rendered="source" data-board-asset="board-8x8-45f7874441012b4c.svg"><img class="source-chessboard" src="/assets/boards/board-8x8-45f7874441012b4c.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0;border-radius:0" onerror="this.parentElement.removeAttribute('data-rendered');this.remove()" /></div></div>
    </section>
  </div>
  <figcaption>Example of chess as a Markov Decision Process</figcaption>
</figure>

After this formalization of chess, one might ask, what needs to be programmed to play chess? Recalling the initial objective of this section, it is clear that we must program the agent. Programming the process is relatively simple compared to creating an agent capable of playing chess competently. To allow the agent to discover the best move in a given position, we can use a tree search technique (in which the AI simulates a series of future moves for both itself and its opponent) or try to estimate the quality of the different states (decide who has the advantage in each state, or if there is a balance). In general, a combination of these two approaches gives the best results.
