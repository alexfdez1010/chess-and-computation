---
title: "Deep Reinforcement Learning"
description: "In this section, we will explore the fascinating field of deep reinforcement learning, which has gained notoriety thanks to its application in a variety of complex tasks."
chapter: "Deep Reinforcement Learning"
part: "book"
order: 12
bookChapter: "3"
bookChapterTitle: "Deep Reinforcement Learning"
sectionNumber: "3.0"
sectionTitle: "Deep Reinforcement Learning"
navDepth: 1
pairedSlug: "rl-introduction"
source: "en/rl-introduction.tex"
draft: false
---

In this section, we will explore the fascinating field of deep reinforcement learning, which has gained notoriety thanks to its application in a variety of complex tasks, from autonomous vehicle driving to mastering strategy games such as chess. For a complete understanding, it is crucial to introduce a series of essential concepts that relate to each other in an integral way.

We will begin with the notion of "reward", a fundamental concept in reinforcement learning. In this context, the reward represents a *feedback* signal that the agent receives after performing an action in a given environment. The goal of an agent is to maximize the total sum of rewards over time, which is called the "cumulative reward".

From the idea of reward, we can define the "policy". In reinforcement learning, the policy refers to the strategy that the agent follows to select actions based on the state of the environment. Therefore, it can be understood as the behavior of the agent at a given moment.

Next, the "environment model" is described as the representation that the agent has of the environment. This model is used to predict how the environment will change based on the agent's actions. Reinforcement learning algorithms can be *model-free*, where the agent learns the optimal policy directly without a model of the environment, or *model-based*, where the agent learns a model of the environment and uses it for planning.

From these concepts, various reinforcement learning algorithms emerged, including REINFORCE, DQN (Deep Q-Learning), Actor-Critic and MCTS (Monte Carlo Tree Search) to name a few. Each of these algorithms presents its own advantages and disadvantages depending on the specific task and characteristics of the environment, but all of them play a role in the development of AlphaZero.

Next, we will examine the functioning of "neural networks", which are the building blocks of deep learning models. Neural networks are a series of algorithms that attempt to recognize underlying patterns through the simulation of the recognition process in the human brain.

Finally, with a solid understanding of these concepts, we can delve deeper into AlphaZero, an algorithm developed by DeepMind. AlphaZero represents the pinnacle of deep reinforcement learning, as it combines these concepts in a unique way to surpass the most advanced artificial intelligence systems in games such as chess, shogi and Go. The key to AlphaZero's success lies in its ability to teach itself to play these games at an expert level, simply by playing against itself and using reinforcement learning to continuously improve its game policy. This is achieved through the application of neural networks to learn the policy and value of each board position, which allows AlphaZero to plan sophisticated strategies and make optimal decisions in each move.
