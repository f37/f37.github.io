---
title: RL Trading
description: Beat the market, beat the system
image: http://florens.io/projects/RLTradingKickoff/index.png
author: Florens Greßner
mathjax: true
---

# RL Trading

Reinforcement Learning is most promising for getting Super-Human-Level performance for video games. So why not human 
level on the trading market?

> Same algorithm like in [this post](../SnaKI)

In the following the Agent is making daily decisions, assuming we get the order filled at the worst moment of the day. This is a lower boundary of the Agent performing in the 'Stock Market Game' environment.

## Figures
top: actions on history
botton: account balance, winning/losing order

- For conparison, it is always important to check a strategy against a uniform random agent: ![rand](./rand.png) 
- 2 minute calculation on my laptop give me: ![better](./better.png)
- 2 further minutes that: ![better](./best.png) already overfit? #quadcore #simpledesign

Is human level reachable?
