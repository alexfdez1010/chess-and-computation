---
title: "What is artificial intelligence?"
description: "To delve deeper into the field of artificial intelligence (AI), it is essential to clearly distinguish several related terms."
chapter: "Artificial Intelligence"
part: "book"
order: 4
bookChapter: "2"
bookChapterTitle: "Artificial Intelligence"
sectionNumber: "2.1"
sectionTitle: "What is artificial intelligence?"
navDepth: 2
pairedSlug: "ai-ml-dl"
source: "en/AI,ML,DL.tex"
draft: false
---

To delve deeper into the field of artificial intelligence (AI), it is essential to clearly distinguish several related terms. In essence, artificial intelligence refers to the set of algorithms, techniques, and methods that enable a machine to emulate intelligent behaviors that we traditionally consider human. In other words, AI provides a computational system with an appearance of intelligence similar to that of humans. This definition, intentionally broad, encompasses a spectrum of heterogeneous algorithms that can participate in a chess game or even compose a poem.

Focusing on the game of chess, the objective is to develop a computational system capable of playing in a manner similar to a human, or even surpassing them. This implies that the machine must be able to project multiple moves forward (something relatively simple for a machine), and also adopt a long-term strategic vision (something extremely complex for a computer system). Both aspects can be explored through pure algorithms or through the learning that computational systems can acquire through certain algorithms, a field called machine learning. This latter approach has demonstrated notable success.

### Machine Learning

Machine learning encompasses all algorithms that enable a computational system to learn from data. This perspective contrasts strongly with the traditional programming approach. In the classical model, the first step is to manually analyze the information and study the problem, generally performed by a programmer. Subsequently, the program is written based on the acquired knowledge and, once completed, its performance is evaluated and detected errors are corrected. This process is repeated as many times as necessary until the required performance is achieved.

However, in machine learning, although a similar process is followed, there is one essential difference: the entire process is carried out by the computational system without human intervention after its initialization. The program coding phase is replaced by the training of the machine learning algorithm. Computational systems are ideal for executing repetitive tasks, while humans eventually tire or become bored. For this reason, these learning algorithms far surpass a standard algorithm designed by a programmer.

The domain of machine learning is vast and is growing exponentially at present. Almost any program or application today uses machine learning to execute part of its functionalities. A simple way to classify these algorithms is based on the types of data they use. The main categories are: supervised, unsupervised, semi-supervised, and reinforcement learning.

#### Supervised Learning

In this type of learning, the provided data comes with a "label" or "solution". For example, if attempting to determine whether a photo belongs to a dog, the data will indicate that this particular photo is of a dog. The machine is trained with this data, attempts to predict whether a photo is of a dog and, in case of error, can learn from its mistakes and adjust to avoid them in the future. The ultimate goal is for the algorithm to be able to classify a new image that it has not seen before and for which it probably does not have the label.

This category can be subdivided into two subcategories: classification and regression. Classification corresponds to the previously mentioned case where the category of a data set (an image, a video, a text, etc.) must be predicted from among a set of predefined categories. In contrast, regression involves predicting a continuous value (infinite possible categories) for a given data set.

#### Unsupervised Learning

In unsupervised learning, the computational system's task is more challenging since it does not have labels for the data. That is, it is provided with an image of a dog, but the machine has no indication that it is a dog. The applications of this type of learning are related to data clustering, data dimensionality reduction (to highlight the most significant features), and anomaly detection in data (data that deviate from the common).

#### Semi-supervised Learning

As its name suggests, this type of learning combines aspects of supervised and unsupervised learning. Here, there is a set of labeled data, generally small, and another unlabeled set, usually larger. Algorithms are used that combine supervised and unsupervised learning techniques. A prominent example in this field is generative adversarial networks (GANs). These consist of two neural networks: one that generates realistic images of a certain category and another that must determine which images are real and which are generated. The second neural network indicates to the first where it has made mistakes, allowing the first to adjust its parameters autonomously. Training concludes when the discriminator neural network can no longer distinguish between real and generated images.

#### Reinforcement Learning

Reinforcement learning is positioned at an intermediate position between supervised and unsupervised learning, although it follows a totally different philosophy. In this model, learning is conceived as a game where the system must make a series of decisions that result in a determined reward. This reward provides feedback on whether the actions taken were correct or not. Because the reward is affected by all previous actions, it cannot be modeled as supervised learning. At the same time, it cannot be considered unsupervised learning either since there is feedback.

The most perceptive readers will have noted that this type of learning is especially suitable for games like chess, and indeed it is. The combination of reinforcement and deep learning has proven to be very effective in this field. We will not delve deeper into this topic here, as it will be addressed in greater detail in the next chapter.

### Deep Learning

Deep learning corresponds to machine learning algorithms that make use of neural networks with multiple layers. A neural network is composed of a multitude of elements called neurons or perceptrons. These perceptrons have a simple structure, based on matrix multiplication and addition followed by a non-linear function. Their success lies in the fact that, by combining many of these perceptrons, practically any imaginable function can be approximated.

Although neural networks may seem like a recent development, in reality their origin dates back to the last century. If they have existed for so long, why have they not started to be actively used until recent years? The main reason is that until recently it was practically impossible to effectively train and adjust neural networks with many layers. However, thanks to recent advances in hardware and in the backpropagation process, these networks have achieved great success in numerous fields. Again, this field will be addressed in greater detail in the next chapter.
