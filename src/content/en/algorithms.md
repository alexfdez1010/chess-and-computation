---
title: "Reinforcement learning algorithms"
description: "The field of reinforcement learning has experienced remarkable effervescence in recent years, leading to the creation of considerable diversity in algorithms."
chapter: "Deep Reinforcement Learning"
part: "book"
order: 16
bookChapter: "3"
bookChapterTitle: "Deep Reinforcement Learning"
sectionNumber: "3.4"
sectionTitle: "Reinforcement learning algorithms"
navDepth: 2
pairedSlug: "algorithms"
source: "en/algorithms.tex"
draft: false
---

The field of reinforcement learning has experienced remarkable effervescence in recent years, leading to the creation of considerable diversity in algorithms. It is important to mention that discussing all these algorithms would exceed the purpose of this book. Therefore, the discussion will be limited to the most significant algorithms and those with special relevance in the context of chess.

Reinforcement learning algorithms can be classified into three main categories: policy-based (which focus on computing the policy), value-based (whose objective is to calculate the expected reward), and model-based (which seek to calculate the model). It should be noted that some algorithms can be classified into several categories, as their design involves the computation of several of these components.

We will proceed to detail the most relevant algorithms.

The REINFORCE algorithm seeks to generate a probability distribution for a specific state. That is, it attempts to formulate a non-deterministic policy, where actions with the best results have a higher probability of occurrence. This algorithm requires a neural network to generate this probability distribution based on the current state. Therefore, it is classified as a policy-based algorithm.<cite><a href="/en/references#cite-2deeprl2019" data-cite="2deeprl2019">[Graesser, 2019]</a></cite>

The DQN (Deep Q-Networks) algorithm seeks to calculate the expected reward based on a given state and the action to be performed in that state. It uses a deep neural network to fulfill this purpose. A distinctive feature of this algorithm is its *off-policy* nature, which means that its training does not depend on the policy followed. In theory, any policy could be used, although in practice, certain policies are more effective than others. Furthermore, if previous data on actions performed and rewards obtained are available, these can be leveraged by the algorithm. Once training is complete, actions are selected following the procedures discussed in the Policy section. This algorithm belongs to the value-based category.<cite><a href="/en/references#cite-4deeprl2019" data-cite="4deeprl2019">[Graesser, 2019]</a></cite>. However, it should be noted that it is suitable only for cases where the action space is discrete.

The Actor-Critic algorithm falls into both the value-based and policy-based categories. It consists of two main components: the actor, which learns the policy, and the critic, which learns the function that relates actions performed in a given state to their expected reward. In this way, the critic provides the actor with the necessary information to optimize the policy. Its most widely used variant is A2C (Advantage Actor-Critic), where an advantage function is learned that informs about the quality of an action compared to other possible actions. <cite><a href="/en/references#cite-6deeprl2019" data-cite="6deeprl2019">[Graesser, 2019]</a></cite>

The last algorithm to consider in this section has particular relevance for chess and belongs to the model-based category. Its conceptual design is similar to the Minimax algorithm, but it performs a more selective search. This algorithm simulates a predetermined number of games and uses the model to select the most likely moves in these simulations. This allows focusing the analysis on the most promising moves within a position and ignoring the others. Thanks to this feature, this algorithm is comparable to Minimax, but is significantly faster. Like Minimax, the nodes located in the first levels of the tree store the statistics of simulated games, and those with better statistics are used to select the most appropriate move <cite><a href="/en/references#cite-15gerrish2018smart" data-cite="15gerrish2018smart">[Gerrish, 2018]</a></cite>. In the AlphaZero section, additional details will be provided on how this algorithm is used in chess.
