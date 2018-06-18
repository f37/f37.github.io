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
You can observe that each figure is divided in two charts. The top one and the bottom one. In the 
- **top** one you can observe the historic course of a market. The colors show the decision an agent did. Green is buying, red is selling and blue is waiting, doing nothing. Notice that every decision was made at the beginning of the day. The execution of the decision was performed on the worst possible moment during the day. In the second chart on the
- **bottom** you will see the account balance. In Black we have the amount of money the Agent has for its decisions. When the agent executes a trade I indicated with red and green if it was bringing him loss or profit accordingly. In the beginning of each trade the agent makes loss, because of the costs executing a trade in the market.

- For convenience, it is always important to check a strategy against a uniform random agent. You can observe that the uniform random agent gets bankrupt a few times: ![rand](./rand.png) 
- 2 minute calculation on my laptop give me: ![better](./better.png)
- 2 further minutes that: ![better](./best.png) already overfit? #quadcore #simpledesign

Is human level reachable?
