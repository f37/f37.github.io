---
layout: post
comments: true
title:  "Introduction to Tensorflow - 02 Tensorboard"
excerpt: "While showing how to evaluate derivations from a tensorflow 
computation graph I want to give the reader the basic tool for visualizing a
model."
date:   2017-08-17
mathjax: true
---

# Tensorboard basics
## Introduction

I want to show you how you plot graphs with tensorboard (important for the 
lossfunction or basic analysis of you model e.g. weight distribution). 
However I don't want to bore you. So we will explore tensorflows possibility
to create derivations for a mathematical formula.

Let's take the easiest unit possible. A tensor of rank zero. A scalar.

I'm optimistic that you know the derivation of $x ^{2} + 1$. You know the 
chain rule and the basic patterns of building a derivation. Python for 
example is unaware of this principle unfortunally.  
Tensorflow knows the derivation of basic mathematical functions and can 
reconstruct the chain rule over the graph structure, similar to you. Therefore 
derivations are an easy task for it.

## Why visualization?
You are a human being. You don't live inside code, you live insight a 
hallucination of your environment. When you build a huge computation graph 
it is sometimes easier to just look if every connection is established 
visually then to search for a mistake in your code. Our visual processing is
way faster in that manner. On top of that its very cool to have a build in 
visualisation tool without calling e.g. matplotlib. There all your needed 
data can be provided e.g. lossfunction, weight density, or embeddings from 
your trainingdata. You get a more efficient understanding of your model 
reviewing your code from a second perspective.

Please don't confuse it. I also code examples that use matplotlib. 
Tensorboard is not always the best descision just because it's build in. 
Please always use the tools that fit best for your purpose.


### Advanced Features
#### Derivation
#### GPU contact
Image with and without, maybe time comparison.
#### Building neural net
#### Visual debugging
Give example.