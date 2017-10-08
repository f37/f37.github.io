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

# Greedy Prioritization

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

For that consider a Memory with size $N$ and replay probability of element $i$ as $P(i)=\dfrac{p_{i}^{\alpha}}{\sum_{k=0}^N}p_{k}^{\alpha}$

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

$P(i)=1-\frac{q^{i}}{\sum_{j=1}^{N}q^{j}}$ with $0<<q<1$.

Remember the common procedure of drawing a random variable of a given distribution:

```
cum=0, rand=uniform
for m in memory:
    cum+=m.p
    if rand > cum:
        return m
```

That results in expense of $O(N)$ depending on memory size. Not to mention the cost it needs to calculate the fractions for $p_{i}$.

For the specific rank based distribution I suggested earlier I want to introduce a sampling method with constant time $O(1)$.

Define $S(n):=\sum_{i=1}^{N}i=\frac{1-q{n+1}}{1-q}$  

The Algorithm above formulates the recursive search after 
$\text{max}\begin{Bmatrix}n \in \mathbb{N} \mid \sum_{i=1}^{n}p_{i} \leq \text{rand}\end{Bmatrix}$. 
This can be equally converted to the problem: 
$d(m)=\text{max}\begin{Bmatrix} n \in \mathbb{N} \mid S(n) \leq \text{rand} \cdot S(N)\end{Bmatrix}
=
\text{max}\begin{Bmatrix} n \in \mathbb{N} \mid S(n) \leq m \end{Bmatrix}$ 
where
$m:=\text{rand} \cdot S(N)$ and $\text{rand}$ uniform in $\[0,1\]$

### Claim
Define 
$\hat{d}(m):=\begin{Bmatrix} n \in \mathbb{N} \mid m=S(n)+\nu \text{ for } \nu \in \[0,n\]_{\mathbb{N}} \end{Bmatrix} $

I claim that $\hat{d}(m)$ is well defined $\forall m \in \mathbb{N}$

#### well-defined

##### Existence

$\forall m \in \mathbb{N} \ \exists \hat{n}=\text{max} 
\begin{Bmatrix} 
n \in \mathbb{N} \mid S(n) \leq m
\end{Bmatrix} $.
Choose for $\hat{d}(m)$: $n=\hat{n} \text{ and } \nu=m-S(n)$. This raises the 
question if $\nu \in \[0,n\]_{\mathbb{N}}$. Obviously $\nu \geq 0$. Suppose $\nu>n 
\Rightarrow S(n+1)
\leq m $, but this is contradicting with the maximum property. 

This means that $\forall m \in \mathbb{N} \ \exists \hat{d}(m)$. So 
$\hat{d}(m)$ exists for every natural number.
 
##### Uniqueness

Suppose $\exists \hat{n}, n \in \mathbb{N} \text{ with } \hat{n} \neq n$, but 
$\exists
\hat{\nu} \in \[0,\hat{n}\] \text{ and } \nu \in 
\[0,n\]$ with 
$S(\hat{n})+\hat{\nu}=S(n)+\nu$.
Without loss of generality assume that $\hat{n} > n$. This means that $S(\hat{n})-S(n) \geq \hat{n}$ equivalently $\nu - \hat{\nu} \geq \hat{n}$.
This is a contradiction for $\hat{\nu} \geq 0 \text{ or } \nu \leq n$. 

This results in uniqueness of $\hat{d}$.

We constructed a well defined function. $\square$

#### Equality

I claim that $d(m)=\hat{d}(m) \ \forall m \in \mathbb{N}$, i.e.
$\text{max}
\begin{Bmatrix} 
n \in \mathbb{N} \mid S(n) \leq m
\end{Bmatrix}
=
\begin{Bmatrix} 
n \in \mathbb{N} \mid m=S(n)+\nu \text{ for } \nu \in \[0,n\]_{\mathbb{N}}
\end{Bmatrix} $


Suppose  $d(m)<\hat{d}(m)$:

This would mean that 
$\exists \hat{n}$ 
with 
$m=S(\hat{n})+\nu$ for $\nu \in \[0,\hat{n}\]$ with $S(\hat{n}) > m$. 
It would follow that 
$\nu < 0 \Rightarrow \nu \notin \[0,\hat{n}\]_{\mathbb{N}}$ .   
This is a contradiction against the assumption.

Suppose  $d(m)>\hat{d}(m)$:

This would mean that 
$\exists \hat{n},n \in \mathbb{N}, n<\hat{n}$ with $S(\hat{n}) \leq m$ and 
$m=S(n)+\nu$.
That implies 
$S(\hat{n}) \leq S(n)+\nu \text{ for } \nu \in \[0,n\]_{\mathbb{N}} 
\Rightarrow 
\nu \geq S(\hat{n})-S(n) \geq \hat{n} > n \Rightarrow \nu \notin \[0,n\]$.   
This is a contradiction against the assumption.

This results in the functions being equal. $\square$

#### Formula to calculate d(m) explicitly

We know that $d(m)$ is uniquely determined by $n \in \mathbb{N}$ that satisfies $m=S(n) + \nu$ for $\nu \in \[0,n\]_{\mathbb{N}}$.

So we have to solve for $n$.

Remember that $S(n)=\dfrac{n^{2}+n}{2}$. Define $q:=2(m-\nu)$ and solve the following quadratic equation:
$n^{2}+n-q=0$. So $d(m)=\sqrt{q+\dfrac{1}{4}}-\dfrac{1}{2}=
\sqrt{2(m-\nu)+\dfrac{1}{4}}-\dfrac{1}{2}$

This may raise some questions because $\nu$ is depending on m but we don't know a explicit formula to determine $\nu$. Thats why we need to establish a statement that is independent of $\nu$.

##### Claim

It suffices to calculate
$\hat{d}(m) := \sqrt{2m+\dfrac{1}{4}}-\dfrac{1}{2}$. I claim that
$d(m)=\lfloor\\hat{d}(m)\rfloor$.

$d(m) \leq \hat{d}(m)$:  
Surprisingly $d(m)=\sqrt{2(m-\nu)+\dfrac{1}{4}}-\dfrac{1}{2} \leq
\sqrt{2m+\dfrac{1}{4}}-\dfrac{1}{2}$. So the assumption is true, due to 
$\nu \geq 0$

$\hat{d}(m)<d(m)+1$:  
$\sqrt{2m+\dfrac{1}{4}}-\dfrac{1}{2} < 
\sqrt{2 \cdot S(d(m)+1)+\dfrac{1}{4}}-\dfrac{1}{2} =
\sqrt{2(\tilde{m}-\tilde{\nu})+\dfrac{1}{4}}-\dfrac{1}{2}=
d(\tilde{m})=
d(m)+1$ 
with $\tilde{m}=S(d(m)+1)+\tilde{\nu}$.

So we can conclude:
$d(m) \leq \sqrt{2m+\dfrac{1}{4}}-\dfrac{1}{2} < d(m)+1$. $\square$

As a special you can also show that $d(m)=\lfloor\sqrt{2m}\rfloor$: Obviously $d(m) \leq \sqrt{2m}$ (square equation twice to check). Left to consider is weather $\sqrt{2m} < d(m)+1$ is also true.

Be aware of the fact $m \leq S(d(m)+1) - 1$. With that we get 
$\sqrt{2m} \leq \sqrt{2S(d(m)+1) - 2})$. 
With that in mind it suffice to show that $\sqrt{2S(d(m)+1) - 2} < d(m)+1$.

By squaring the equation we get:
$2S(d(m)+1) - 2 < d(m)^{2} + 2d(m)+1$
Reformating
$2S(d(m)+1) - 2 = 2(S(d(m))+d(m)+1) - 2 = d(m)^{2} + 2d(m)$
(remember: $S(n)=\dfrac{n^{2}+n}{2}$) gives new perspective
$d(m)^{2} + 2d(m)<d(m)^{2} + 2d(m)+1
\Leftrightarrow 
0<1$ and I don't want to argue with that.

With that we showed that $d(m) \leq \sqrt{2m} < d(m)+1$ we are ready to use $d(m)=\lfloor\sqrt{2m}\rfloor$ as explizit sampling function for the rank based distribution with m sampled uniformly in $\[0,N\]$.

$\square$

#### Geometric series

lulalala


### Conclusions and future work

I claim that this explicit method is applicable for all rank based priorities that can be represented in an explicit series.