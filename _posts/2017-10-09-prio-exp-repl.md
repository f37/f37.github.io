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
## Introduction

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam 
voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet 
clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam 
voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet 
clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

## Binary Heap

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam 
voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet 
clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam 
voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet 
clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

Sorting in log time.


## Rank based
Consider a Memory with size $N$. The experience should by drawn prioritized 
after the index $i$ with probability $p_{i}=\frac{i}{\sum_{j=1}^{N}j}$.

Define $S(n):=\sum_{i=1}^{N}i=\frac{n^{2}+n}{2}$

Unfortunately it is very expensive to sample from that probability 
distribution because the consensus relies on incrementally loop through 
every probability to convert a uniform distribution into the desired.

Common procedure
```
cum=0, rand=uniform
for m in memory:
    cum+=m.p
    if rand < cum:
        continue
    return m-1
```

That results in expense of $O(n)$ depending on memory size. Not to mention 
the cost it needs to calculate the fractions.

For that approach, for that specific rank based distribution I want to 
suggest a sampling method with constant time $O(1)$

The Algorithm above formulates the recursive search after 
$max\begin{Bmatrix}
n \in \mathbb{N} \mid \sum_{i=1}^{N}p_{i} < rand
\end{Bmatrix}$. 
This can be 
equally converted to the problem:
$d(m)=max\begin{Bmatrix} n \in \mathbb{N} \mid S(n) < rand S(n)
\end{Bmatrix}=
max\begin{Bmatrix} n \in \mathbb{N}}{S(n) < m
\end{Bmatrix}$ where $m:=rand S(n)$

### Claim
Define 
$\hat{d}(m)_=\Set{n \in \mathbb{N}}{m=S(n)+\nu for \nu \in \[0,n\]}$!

I claim that $\hat{d}(m)$ is well defined $\forall m \in \mathbb{N}$

####well-defined
**Existence**
$\forall m \in \mathbb{N} \exists \hat{n}=max\Set{n \in \mathbb{N}}{S(n) < m}$
choose for $\hat{d(m)}$: ${n=\hat{n}, \nu=m-s(n)}$. This raises the question
 if $\nu \in \[0,n\]$. Obviously $\nu \geq 0$. Suppose $\nu>n \Rightarrow S(n+1)
\leq m $ But this is contradicting with the maximum propertx