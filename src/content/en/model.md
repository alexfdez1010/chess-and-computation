---
title: "Model"
description: "The main objective of our model is to deeply understand the underlying dynamics of a game. This implies knowing the transition probabilities to different states after the execution of a specific action."
chapter: "Deep Reinforcement Learning"
part: "book"
order: 15
bookChapter: "3"
bookChapterTitle: "Deep Reinforcement Learning"
sectionNumber: "3.3"
sectionTitle: "Model"
navDepth: 2
pairedSlug: "model"
source: "en/model.tex"
draft: false
---

The main objective of our model is to deeply understand the underlying dynamics of a game. This implies knowing the transition probabilities to different states after the execution of a specific action. Such understanding is particularly useful in the context of non-deterministic games, where the probabilities following an action cannot be known with certainty beforehand. However, how is this applicable in a game like chess that is inherently deterministic?

Surprisingly, chess can be approached from a non-deterministic point of view. First, it is essential to remember that chess is a bipartite game, that is, there is always an adversary facing us. This opponent will be subjected to various board positions in which the probabilities of making certain moves will not necessarily be equal. Therefore, our model will focus on anticipating and predicting the possible moves of the opponent.

In the context of chess, it is usually assumed that the rival will opt for the best possible move, following logic similar to the Minimax algorithm. This leads to a coincidence between the objective of the policy and the model, both pursue identifying the best possible move for each position. This implies that, in fact, only one of them needs to be trained, since the results can be applied to the other directly.

This is the reason why the use of a model can be extremely fruitful, without the need to perform complex calculations, since the necessary information can be obtained directly from the policy.

To further illustrate this concept, let us consider the example of a 2D *Grid*. Knowing the model of this game in its original form, that is, in a deterministic environment, would add no value, since we already know which state each action leads to. However, if we slightly modify the game's definition, incorporating a 10% probability that each action could result in an unforeseen state, the action definitions would change to:

$$
&0: \textrm{Up } 90\%, \textrm{ Right } 10\% \\
&1: \textrm{Right } 90\%, \textrm{ Down } 10\% \\
&2: \textrm{Down } 90\%, \textrm{ Left } 10\% \\
&3: \textrm{Left } 90\%, \textrm{ Up } 10\%
$$

These actions are similar to those presented in the previous section, with the additional nuance previously mentioned. Furthermore, these actions model real-life situations more accurately, for example, the task of guiding a robot through a path, where the robot's moving parts can introduce imprecisions or errors.

Our model, in this case, will seek to decipher these probability distributions associated with the game, since these are not known by the agent performing the actions.

Finally, having presented the three pillars of reinforcement learning (expected reward, policy, and model), we can classify the different reinforcement learning algorithms based on which objective(s) they focus on achieving.
