---
layout: post
comments: true
title:  "Prioritized Experience Replay"
excerpt: "Consider a rank-based prioritized binary heap with sampling in 
constant time O(1)"
date:   2017-10-09
mathjax: true
---

# Prioritized Experience Replay

Review and ideas for the paper [**Prioritized Experience Replay**](https://arxiv.org/abs/1511.05952), by Google DeepMind.

## Introduction

One reason of the great success in Reinforcement Learning (RL) was the introduction of experience replay. This smooths the training distribution uniformly over past behavior of the RL agent. Unfortunately this implies transitions get replayed regardless of their significance in the frequency of being experienced.

This paper attacks this issue by prioritizing experience and sample due to a underlying distribution. Assuming the TD-error gives a measure for how "uncertain" a transition is, our first choice for prioritizing would be according to the transitions TD-error.

For prioritized experience replay there are different approaches.

## Greedy Prioritization

The oracle based approach always samples the experience with maximal TD-Error. This sounds easy in theory. However in practice this results in expensive sorting and updating of the underlying experience. To achieve this it is plausible to introduce a binary heap structure with sorting complexity of $\mathcal{O}(\log{n})$ and sampling of the maximum value with complexity $\mathcal{O}(1)$. 

## Binary Heap

Lets take a look at the concept of a Binary Heap. A heap makes use of a tree structure that isn't fully sorted but satisfies the heap property such that every node is smaller then its parent

![Heap Property](https://raw.githubusercontent.com/neurocats/neurocats.github.io/master/assets/prioexprepl/heap1.png)

When inserting an item it gets inserted into the last position. 

![Percolate Up 1](https://raw.githubusercontent.com/neurocats/neurocats.github.io/master/assets/prioexprepl/heap2.png) 

Then incrementally the heap will satisfy the heap property by percolating the item up as long as the heap property is not satisfied.

![Percolate Up 2](https://raw.githubusercontent.com/neurocats/neurocats.github.io/master/assets/prioexprepl/heap3.png) 

When inserting a node into a sorted heap structure the heap remains sorted after percolating up the inserted node.

![Percolate Up 3](https://raw.githubusercontent.com/neurocats/neurocats.github.io/master/assets/prioexprepl/heap4.png) 

As you can see the maximal value of the heap is always the upper item. Thats why we only need $\mathcal{O}(1)$ to sample the maximal value.

Please be aware that satisfying the heap property doesn't result in a fully sorted priority queue. When updating the value of a node it suffice to percolate (up or down) the updated node to maintain the heap property. That way we can ensure drawing the maximal value in constant time while updating the structure in $\mathcal{O}(\log{n})$.

The appendix of this post includes a manual for a concrete python inplementation of a binary heap, integrated with build-in methods to handle the heap as native as a list.

## Disadvantages of Greedy Prioritization

Greedy Prioritization faces the problems that

- only replayed elements are getting updated. This means elements with small transition on the first run may never be visited.
- It is sensitive to noise spikes and
- prone to overfitting for slowly shrinking error. High initial transitions are replayed more frequently.

To overcome these issues we need to find something in the middle of uniform and greedy sampling.

## Stochastic Prioritization

Stochastic Prioritization is trying to solve that problem with a monotonic probability of being drawn with guaranteeing non-zero probabilities. 

For that consider a Memory with size $N$ and replay probability of element $i$ as $P(i)=\dfrac{p_{i}^{\alpha}}{\sum_{k=0}^N p_{k}^{\alpha}}$

If $\alpha=0$ we get the uniform case.

At that point we can further differentiate between stochastic prioritization approaches. Namely the proportional and the rank-based approach.

### Proportional Stochastic Prioritization

We will sample experience proportional to its TD-error $\delta_{i}$. With that we satisfy a monotonic prioritization. To get non-zero probabilities we will add a small constant $\epsilon > 0$ to get $p_{i}=\begin{Vmatrix}\delta_{i}\end{Vmatrix}+\epsilon$.

This again seems very easy in theory, but brings more problems in practice. The complexity for sampling from such a distribution cannot depend on N. Thats why DeepMind implemented a "Sum-Tree" data structure which save the transition priorities and the sum over all underlying priority of its children. Leaving the parent node with the sum over all priorities. This gives an efficient way of calculating cumulative sums of priorities, allowing $\mathcal{O}(\log{n})$ updates and sampling.

### Rank-based Stochastic Prioritization

The experience should be drawn prioritized after the index $i$ with probability, e.g. $p_{i}=\frac{1}{rank(i)}$ where $rank(i)$ is the rank of transition $i$ sorted according to $\begin{Vmatrix}\delta_{i}\end{Vmatrix}$. This is likely to be more robust compensating outliners.

### Comparison of Prioritized Experience Replay Methods

DeepMind compared the approaches (uniformly, greedy, proportional, rank-based) in a toyproblem called "Blind-Cliffwalk".

![Blind Cliffwalk](https://raw.githubusercontent.com/neurocats/neurocats.github.io/master/assets/prioexprepl/compare.png)

They achieved similar results for the Atari games. The greedy priorization techniques are rather easy to implement. That is the reason why I concentrate on the rank-based approach, guaranteeing better computation time with no significant loss in effectiveness to the proportional approach.

To draw a transition from a rank based distribution I constructed an example with sampling complexity $\mathcal{O}(1)$ avoiding calculating the cumulative sum of the priorities while sampling.

### Concrete example - Geometric Series

For that we want to define a convex cumulative distribution function (CDF) $\Phi$ with $\Phi(0)=1$ and $\Phi(N)=0$.

My obvious choice was considering the geometric series, because of the explicit nature of calculating cumulative sums. On top we get another hyperparameter q taking the distribution:

$P(i)=1-\frac{q^{i}}{\sum_{j=1}^{N}q^{j}}$ with $0\<\<q<1$.

![Convex CDF](https://raw.githubusercontent.com/neurocats/neurocats.github.io/master/assets/prioexprepl/geomser.gif)

Remember the common procedure of drawing a random variable of a given distribution:

```
cum=0, rand=uniform
for m in memory:
    cum+=m.p
    if rand > cum:
        return m
```

That results in expense of $\mathcal{O}(N)$ depending on memory size. Not to mention the cost it needs to calculate the fractions for $p_{i}$.

For the specific rank based distribution I suggested earlier I want to introduce a sampling method with constant time $\mathcal{O}(1)$.

Define $S(n):=\sum_{i=1}^{n}q^i=\frac{1-q^{n+1}}{1-q}$  

The Algorithm above formulates the recursive search after 
$\text{max}\begin{Bmatrix}n \in \mathbb{N} \mid \sum_{i=1}^{n}P(i) \leq \text{rand}\end{Bmatrix}$. 
This can be equally converted to the problem: 
$d(m)=\text{max}\begin{Bmatrix} n \in \mathbb{N} \mid S(n) \leq \text{rand} \cdot S(N)\end{Bmatrix}
=
\text{max}\begin{Bmatrix} n \in \mathbb{N} \mid S(n) \leq m \end{Bmatrix}$ 
where
$m:=\text{rand} \cdot S(N)$ and $\text{rand}$ uniform in $\[0,1\]$

So let's first transform the equation and then complete with floor function due to facing natural numbers for a real function.

$S(n) \leq m 
\Leftrightarrow 
\frac{1-q^{n+1}}{1-q} \leq \text{rand}\cdot\frac{1-q^{N+1}}{1-q}
\Leftrightarrow
\frac{1-q^{n+1}}{1-q^{N+1}} \leq \text{rand}$

Define $C:=\frac{1}{1-q^{N+1}}$. With that we get:

$C \cdot (1-q^{n+1}) \leq \text{rand}
\Leftrightarrow
1-\frac{\text{rand}}{C} \leq q^{n+1}$

So applying logarithm we reveal $n \in \mathbb{N}$

$\log(1-\frac{\text{rand}}{C}) \leq (n+1) \cdot \log{q}
\Leftrightarrow
n \leq \log_{q}(1-\frac{\text{rand}}{C})-1$

Notice that $\log(q)<0$ for $q \in \[0,1)$.

With that we figured out that

$n = \lfloor \log_{q}(1-\frac{\text{rand}}{C})-1 \rfloor$

With that in mind the CDF looks like:

$\Phi(x)=\lfloor \log_{q}(q^{N+1} + x \cdot (1 - q^{N+1}) )-1 \rf$

### Practical issues

Unfortunately maintaining the heap property exceeds computation time of 
learning that's why the heap is sorted infrequently. DeepMind suggests 
sorting after 1 million iterations. This makes sense for huge models and 
learning time. It is also possible to adapt this frequency due to the 
applied problem. For our implementation of the binary heap has an efficient 
way of sorting (heapify) an possibly unsorted tree with worst case 
complexity of $\mathcal{O}(N \log(N))$.

#### Heapify

I mentioned in the beginning, that percolating in a sorted heap maintains heap property. However our considered heap is possibly unsorted. 

Lets proceed with induction.

A node with no children is sorted. Percolating down that key maintains the 
current order. That is our induction basis.

Our induction step is percolating down a sorted subtree maintains heap 
property.

That is why we heapify the subtree to percolate down afterwards. Please have
 a look at the code. It is independent on the heap size and amount of 
 children for each node. 

```
def heapify(key):
    children = keys of the children
    for every child in children:
        if child exists
            heapify(child)
    percolate down key
```

## Appendix: Manual Binary Heap

We wanted to have a Binary Heap most similar to a list. Many build-in 
functions for a easy exchange from list to heap. Our heap currently holds 
indices as content. However the content can be any abstract object that can 
be evaluated.

I will print out the following after each command.

```python
print(h, h.getvalue())
```

Let's dive into basic usage

```python
h = BinaryHeap()
h.append(0)
h.append(1)
h + [1, 7, 3, 5, 4, 6, 9, 7, 8, 2, 5, 3]
```
| h                                                    | h.getvalue()                               |
|------------------------------------------------------|--------------------------------------------|
| heap([])                                             | []                                         |
| heap([0])                                            | [0]                                        |
| heap([1, 0])                                         | [1, 0]                                     |
| heap([8, 10, 5, 7, 3, 12, 6, 0, 4, 1, 9, 2, 11, 13]) | [9, 8, 5, 6, 7, 5, 4, 0, 3, 1, 7, 1, 2, 3] |

![Instant Heap](https://raw.githubusercontent.com/neurocats/neurocats.github.io/master/assets/prioexprepl/instantheap.png)

Apply heap without instant percolation

```python
h = BinaryHeap(instant=False)
h.append(0)
h.append(1)
h + [1, 7, 3, 5, 4, 6, 9, 7, 8, 2, 5, 3]
h.sort()
```
| h | h.getvalue() |
| -----| ---- |
|heap([]) |[]|
|heap([0]) |[0]|
|heap([0, 1])| [0, 1]|
|heap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])| [0, 1, 1, 7, 3, 5, 4, 6, 9, 7, 8, 2, 5, 3]|
|heap([8, 10, 5, 3, 9, 12, 6, 7, 1, 0, 4, 11, 2, 13]) |[9, 8, 5, 7, 7, 5, 4, 6, 1, 0, 3, 2, 1, 3]|

![Sorted Heap](https://raw.githubusercontent.com/neurocats/neurocats.github.io/master/assets/prioexprepl/sortedheap.png)

Be aware that the heap is not uniquely determined by it satisfying the heap 
property with two different approaches.

Finally lets look at the sampling with geometric series and increasing $q$

```python
h
h.sample(batch=10, q=0.1)
h.sample(batch=10, q=0.3)
h.sample(batch=10, q=0.7)
h.sample(batch=10, q=0.99999999)
```
Output represents indices that have been sampled.
```
heap([8, 10, 5, 3, 9, 12, 6, 7, 1, 0, 4, 11, 2, 13])
q=0.1 : [8, 10, 10, 10, 8, 10, 8, 8, 8, 8]
q=0.3 : [10, 5, 8, 10, 8, 3, 10, 10, 10, 10]
q=0.7 : [6, 9, 3, 12, 3, 5, 5, 3, 9, 3]
q=1 : [3, 9, 3, 6, 3, 9, 3, 5, 6, 2]
```

As you can see a q near zero is a greedy sampling and for a q near 1 we 
sample in uniform fashion.
