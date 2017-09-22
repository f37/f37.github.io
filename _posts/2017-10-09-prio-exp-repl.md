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
Consider a Memory with size $N$. The experience should be drawn prioritized 
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
$\text{max}
\begin{Bmatrix}
n \in \mathbb{N} \mid \sum_{i=1}^{n}p_{i} \leq \text{rand}
\end{Bmatrix}$. 
This can be 
equally converted to the problem:
$d(m)=\text{max}
\begin{Bmatrix} 
n \in \mathbb{N} \mid S(n) \leq \text{rand} \cdot S(N)
\end{Bmatrix}
=
\text{max}
\begin{Bmatrix} 
n \in \mathbb{N} \mid S(n) \leq m
\end{Bmatrix}$ 
where $m:=\text{rand} \cdot S(N)$

### Claim
Define 
$\hat{d}(m):=
\begin{Bmatrix} 
n \in \mathbb{N} \mid m=S(n)+\nu \text{ for } \nu \in \[0,n\]_{\mathbb{N}}
\end{Bmatrix} $

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

As a result $\forall m \in \mathbb{N} \ \exists \hat{d}(m)$.
 
##### Uniqueness

Suppose $\exists \hat{n}, n \in \mathbb{N} \text{ with } \hat{n} \neq n$, but 
$\exists
\hat{\nu} \in \[0,\hat{n}\] \text{ and } \nu \in 
\[0,n\]$ with 
$S(\hat{n})+\hat{\nu}=S(n)+\nu$.
Without loss of generality assume that $\hat{n} > n$. This means that 
$S(\hat{n})-S(n) \geq \hat{n}$ equivalently $\nu - \hat{\nu} \geq \hat{n}$.
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

We know that $d(m)$ is uniquely determined by $n \in \mathbb{N}$ that 
satisfies 
$m=S(n) + \nu$ for $\nu \in \[0,n\]_{\mathbb{N}}$.

So we have to solve for $n$.

Remember that $S(n)=\dfrac{n^{2}+n}{2}$. Define $q:=2(m-\nu)$ and solve the 
following quadratic equation:
$n^{2}+n-q=0$. So $d(m)=\sqrt{q+\dfrac{1}{4}}-\dfrac{1}{2}=
\sqrt{2(m-\nu)+\dfrac{1}{4}}-\dfrac{1}{2}$

This may raise some questions because $\nu$ is depending on m but we don't 
know a explicit formula to determine $\nu$. Thats why we need to establish 
a statement that is independent of $\nu$.

##### Claim

I claim that it suffices to calculate
$d(m)=\lfloor\sqrt{2m+\dfrac{1}{4}}-\dfrac{1}{2}\rfloor$
even more I suppose $d(m)=\lfloor\sqrt{2m}\rfloor$

For that we realize: 

$d(m) \leq \sqrt{2m+\dfrac{1}{4}}-\dfrac{1}{2} \tag{I}$

$\sqrt{2m+\dfrac{1}{4}}-\dfrac{1}{2} < 
\sqrt{2 \cdot S(d(m)+1)+\dfrac{1}{4}}-\dfrac{1}{2} =
\sqrt{2(\tilde{m}-\tilde{\nu})+\dfrac{1}{4}}-\dfrac{1}{2}
\tag{II}$ for $\tilde{m}$ satisfying 
$\tilde{m}=min
\begin{Bmatrix}
\hat{d}(\tilde{m})>d(m)
\end{Bmatrix}$, due to $\tilde{m}=S(d(m)+1)+\tilde{\nu}$.

So we can conclude:
$d(m) \leq \sqrt{2m+\dfrac{1}{4}}-\dfrac{1}{2} < d(m)+1$. $\square$

As a special you can also show that $d(m)=\lfloor\sqrt{2m}\rfloor$:
Obviously $d(m) \leq \sqrt(2m)$ (square equation twice to check). Left to 
check is if $\sqrt(2m) < d(m)+1$.

For that consider $m <= S(d(m)+1) - 1$. With that we get 
$\sqrt(2m) <= \sqrt(S(d(m)+1) - 2)$. With that in mind it suffice to show that 
$\sqrt(S(d(m)+1) - 2)<d(m)+1$.

By squaring the equation we get:
$2S(d(m)+1) - 2 < d(m)^{2} + 2d(m)+1$
Reformating
$2S(d(m)+1) - 2 = 2(S(d(m))+d(m)+1) - 2 = d(m)^{2} + 2d(m)$
gives new perspective
$d(m)^{2} + 2d(m)<d(m)^{2} + 2d(m)+1
\Leftrightarrow 
0<1$ and I don't want to argue with that.

With that we showed that $d(m) \leq \sqrt(2m) < d(m)+1$ we are ready to use 
$d(m)=\lfloor\sqrt{2m}\rfloor$ as explizit sampling function for the rank 
based distribution with m sampled from U\[0,N\].

$\square$


### Conclusions and future work

I claim that this explicit method is applicable for all rank based 
priorities that can be represented in an explicit series.