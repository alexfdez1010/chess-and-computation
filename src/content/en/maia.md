---
title: "Imitating human decision-making"
description: "Throughout this text we have delved into a multitude of strategies aimed at achieving a singular objective: developing superlative skills in the game of chess."
chapter: "State of the Art"
part: "book"
order: 21
bookChapter: "4"
bookChapterTitle: "State of the Art"
sectionNumber: "4.2"
sectionTitle: "Imitating human decision-making"
navDepth: 2
pairedSlug: "maia"
source: "en/maia.tex"
draft: false
---

Throughout this text we have delved into a multitude of strategies aimed at achieving a singular objective: developing superlative skills in the game of chess. Although the goal of achieving perfection in this strategy game is still far from being achieved, and is not expected to be achieved in the near future, there are other fascinating objectives that deserve attention. One of these outstanding purposes is that of "imitating" human behavior. Now, what exactly does this imitation of human behavior consist of?

The imitation of human behavior in this context translates into the ability to play chess in a way similar to how a person would. The crucial aspect to understand here is that contemporary chess programs do not reflect a style of play that significantly resembles that of a human being. This occurs because the method of determining moves is completely different.

Throughout this text we have detailed how computers use a combination of exploration in the game tree and the use of heuristics to make decisions. In contrast, we humans use the same components, but in a completely different way. A human does not have the ability to explore more than 100 positions in their mind, even the most gifted individuals, while a computer can explore millions of positions in a matter of seconds. However, the quality of the human heuristic, that is, the ability to evaluate a position and discern which moves are most likely to occur, is notably superior. AlphaZero, on the other hand, represents a middle ground where it manages to have a more advanced heuristic, but its ability to search among nodes is lower compared to traditional chess programs.

[Table 1](#tab-comparacion-de-uso-de-busqueda-y-heuristicas-entre-humanos-y-programas-de-ordenador) provides a detailed comparison of the various ways in which chess can be approached, from both human and machine perspectives. The approaches shown in the table may vary depending on the time dedicated to analyzing a particular position.

<div id="tab-comparacion-de-uso-de-busqueda-y-heuristicas-entre-humanos-y-programas-de-ordenador"></div>

| Model | Nodes explored | Heuristic quality |
| --- | --- | --- |
| Humans | $<$100 | Very good |
| AlphaZero | $\approx$10000 | Good |
| Traditional programs | $>$1000000 | Poor |

*Comparison of search and heuristic use between humans and computer programs*

The notable discrepancy between the playing style of chess programs and human players makes it a considerable challenge for the former to accurately imitate the behavior of the latter. However, AlphaZero, with its innovative approach, has managed to exhibit a more "human" playing style compared to traditional programs.

A fundamental question at this point is: what distinguishes human play from that of computers? Among the most notable differences is the ability to evaluate strategic positions. These situations are characterized by not being a direct confrontation between competitors, but rather a subtle maneuver in which players relocate their pieces behind their defensive lines, seeking a strategic advantage that can lead them to victory at the moment of the decisive clash. In these circumstances, human players used to have superior performance to their silicon counterparts, at least until the appearance of AlphaZero.

Computers, on the other hand, excel in tactical positions, where a single move can be crucial for the outcome of the game. Thanks to their superior ability to extensively explore the game tree, they can more easily identify the key or critical moment.

The distinction between human play and that of computers is especially evident in purely strategic and tactical positions. In strategic ones, computers can sometimes appear erratic or without a clear direction. On the other hand, in tactical positions, they can make moves that initially may seem incomprehensible to a human, but after several moves, are revealed as the most optimal option.

To address the challenges that arose, a new model based on deep learning was developed, known as Maia. This model consists of two versions: The first, Maia <cite><a href="/en/references#cite-mcilroy2020aligning" data-cite="mcilroy2020aligning">[McIlroy-Young, 2020]</a></cite>, aims to imitate the strategies of players who are within a specified ELO range. In other words, it reproduces the average playing style of players within that range. The second version, Transfer Maia <cite><a href="/en/references#cite-mcilroy2022learning" data-cite="mcilroy2022learning">[McIlroy-Young, 2022]</a></cite>, takes the concept a step further, replicating the moves of specific players. This means that, thanks to Transfer Maia, you can have the opportunity to play against the playing styles of the best chess players from a hundred years ago.

Both versions of Maia use a neural network that is very similar to Leela Chess Zero, which is an open source version of Alphazero, although there are notable differences. The first is that the number of blocks in the feature extractor has been reduced. The study authors found that adding more blocks only marginally improves the network's performance <cite><a href="/en/references#cite-mcilroy2020aligning" data-cite="mcilroy2020aligning">[McIlroy-Young, 2020]</a></cite>. However, the most substantial change in the neural network lies in the modification of the objectives and the data used for training. As has been stated in this book, neural networks are capable of developing any algorithm as long as they are provided with the appropriate data. Therefore, the same neural network can be adapted to very different objectives simply by modifying the input data.

Previously, both AlphaZero and Leela Chess Zero required generating their own training data through playing games against themselves. Now, with Maia, the process is considerably simpler: we simply need to search for games from the ELO range or from the player of interest.

In terms of training, it is important to keep in mind that we have two outputs: value and policy, and that each position in the game will be our input <span class="footnote" role="note">Like AlphaZero, Maia also takes into account previous positions in the game in the input</span>. For the value, Maia uses a slight variation: the output corresponds to the probabilities of winning/drawing/losing from the current position for the average player or the specific player. This probability is compared with the actual result from the player's perspective, regardless of whether they play with white or black pieces. As for the policy, the neural network output is simply compared with the move that the player made in the game. The neural network output provides the probability of each possible legal move. To achieve this, a legal move mask is applied, which only allows considering these and discarding illegal moves. All games have been extracted from the *online* chess platform Lichess.

The Transfer Maia model implements a training strategy that resembles the conventional one, but with the peculiarity that it starts with the predefined weights of the model corresponding to the average player who has an ELO range closest to that of the player to be emulated. This process is known as *transfer learning*, a highly recurrent technique that allows reducing the training time of a neural network by taking advantage of the already calculated weights of another model.

The results obtained from these models are solid, although not extraordinary. To evaluate their performance, a metric known as precision is used, which compares the move most likely to be selected by the neural network with the move that was actually made in that position. According to this metric, Maia excels, obtaining better results compared to Stockfish and Leela Chess Zero. In concrete terms, the precision of Maia oriented to the average player ranges between 48% and 52%, depending on the ELO range. This means that, out of 100 positions, it gets approximately 50 right. Although this result surpasses previous models (with precision below 45%), the probability of success is comparable to getting heads when flipping a coin. As a general rule, precision tends to increase with ELO range. My hypothesis about this trend is based on the fact that playing styles at lower levels tend to be more variable, while at higher levels playing styles tend to be more uniform. The model oriented to specific players shows superior performance, with precision between 55% and 62.5%, which clearly indicates better odds than simply flipping a coin. Furthermore, according to the study authors, they are able to identify players with 95% accuracy using their respective model <cite><a href="/en/references#cite-mcilroy2022learning" data-cite="mcilroy2022learning">[McIlroy-Young, 2022]</a></cite>, which could have numerous applications in detecting cheating in *online* chess.

The explanation that the results of these models are not superior probably lies in the fact that the position on the board is not the only factor that determines a player's moves. There are other aspects that can influence. A determining factor is time. Chess players have limited time to make their moves, and if it runs out, they automatically lose the game. Therefore, the way of playing will vary significantly if you have a few seconds as opposed to having an hour on the clock. This factor is easily quantifiable in *online* chess and could represent a valuable improvement for Maia. Other variables that could have influence include the player's mood (decision-making can vary depending on whether the player is stressed, angry or in a normal state) and even the gaming environment (playing in person or *online*) <cite><a href="/en/references#cite-kunn2020cognitive" data-cite="kunn2020cognitive">[Künn, 2020]</a></cite>. These factors are very difficult to measure to be used by a neural network.

In summary, although the results of both Maia models are promising, the inherent complexity of the problem makes it difficult to obtain a superior solution, since many of the factors that influence human decision-making are difficult to measure. However, this field of research is extremely fascinating and its findings could have applications in other games, such as Go or Shogi.
