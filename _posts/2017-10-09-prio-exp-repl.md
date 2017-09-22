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
    if rand > cum:
        return m-1
```

That results in expense of $O(n)$ depending on memory size. Not to mention 
the cost it needs to calculate the fractions for $p_{i}$.

For that approach, for that specific rank based distribution I want to 
suggest a sampling method with constant time $O(1)$

The Algorithm above formulates the recursive search after 
$max
\begin{Bmatrix}
n \in \mathbb{N} \mid \sum_{i=1}^{n}p_{i} \leq rand
\end{Bmatrix}$. 
This can be 
equally converted to the problem:
$d(m)=max
\begin{Bmatrix} 
n \in \mathbb{N} \mid S(n) \leq rand \cdot S(N)
\end{Bmatrix}
=
max
\begin{Bmatrix} 
n \in \mathbb{N} \mid S(n) \leq m
\end{Bmatrix}$ 
where $m:=rand \cdot S(n)$

### Claim
Define 
$\hat{d}(m):=
\begin{Bmatrix} 
n \in \mathbb{N} \mid m=S(n)+\nu \text{ for } \nu \in \[0,n\]
\end{Bmatrix} $

I claim that $\hat{d}(m)$ is well defined $\forall m \in \mathbb{N}$

#### well-defined

**Existence**

$\forall m \in \mathbb{N} \exists \hat{n}=max
\begin{Bmatrix} 
n \in \mathbb{N} \mid S(n) \leq m
\end{Bmatrix} $.
Choose for $\hat{d}(m)$: $n=\hat{n} \text{ and } \nu=m-S(n)$. This raises the 
question if $\nu \in \[0,n\]$. Obviously $\nu \geq 0$. Suppose $\nu>n 
\Rightarrow S(n+1)
\leq m $, but this is contradicting with the maximum property. 

As a result $\forall m \in \mathbb{N} \exists \hat{d}(m)$.
 
**Uniqueness**

Suppose $\exists \hat{n}, n \in \mathbb{N} \text{ with } \hat{n} \neq n$, but 
$\exists
\hat{\nu} \in \[0,\hat{n}\] \text{ and } \nu \in \[0,n\]$ with 
$S(\hat{n})+\hat{\nu}=S(n)+\nu$.
Without loss of generality assume that $\hat{n} > n$. This means that 
$S(\hat{n})-S(n) \geq \hat{n}$ equivalently $\nu - \hat{\nu} \geq \hat{n}$.
This is a contradiction for $\hat{\nu} \geq 0 \text{ or } \nu \leq n$. 

This results in uniqueness of $\hat{d}$.

We constructed a well defined function. \square

#### Equality

I claim that $\hat{d}(m)=d(m) \forall m \in \mathbb{N}$

Suppose  $d(m)<\hat{d}(m)$:

This would mean that $\exists \hat{n}$ with $m=S(\hat{n})$ for $\nu \in \[0,
\hat{n}\]$ with $S(\hat{n}) > m$. It would follow that $\nu < 0 \Rightarrow 
\nu \notin \[0,\hat{n}\]$. This is a contradiction against the assumption.

Suppose  $d(m)>\hat{d}(m)$:

This would mean that $\exists \hat{n},n \in \mathbb{N}$ with $S(\hat{n})<m$ 
with $n<\hat{n}$ and $m=S(n)+\nu$.
That implies $S(\hat{n})<S(n)+\nu \text{ for } \nu \in \[0,n\] \Rightarrow 
\nu>S(\hat{n})-S(n) \geq \hat{n} > n \Rightarrow \nu \notin \[0,n\]$. This 
is a contradiction against the assumption.

This means results in the functions being equal. \square

#### Formula to calculate d(m) explicitly

We now that $d(m)$ is uniquely determined by a n that satisfies $m=S(n) + 
\nu$ for $\nu \in \[0,n\]$.

So we have to solve for n.

Remember that $S(n)=\dfrac{n^{2}+n}{2}$. Define $q:=2(m-\nu)$ and solve the 
following quadratic equation:
$n^{2}+n-q=0$. So $d(m)=\sqrt{q+\dfrac{1}{4}}-\dfrac{1}{2}=
\sqrt{2(m-\nu)+\dfrac{1}{4}}-\dfrac{1}{2}$

This may raise some questions because $\nu$ is depending on m but we don't 
know a explicit formula to determine $\nu$. Thats why we need to establish 
a statement that is independent of $\nu$.



### Conclusions and future work

I claim that this explicit method is applicable for all rank based 
priorities that can be represented in an explicit series.