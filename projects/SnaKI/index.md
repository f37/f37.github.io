---
title: SnaKI
description: Beating 90's "Snake" with Reinforcement Learning
image: http://florens.io/projects/SnaKI/index.png
author: Florens Greßner
mathjax: true
---

# SnaKI

Getting the Google DeepMind Atari action into the snake game.
More Videos follow...

Basically this algorithm learns a strategy to succed in a Game without any prior domain knowledge. The Agent perceives its environment and gets rewards/punishments after each action. When starting the algorithm the agent makes random movements and slowly learns from its mistakes converging to perfect policy.

## DQN
Performs perfect on its environment, but needs very long for training calculation.

<video width="720" height="340" controls>
  <source src="./VID-20180215-WA0000.mp4" type="video/mp4">
</video>
<video width="720" height="340" controls>
  <source src="./VID-20180215-WA0001.mp4" type="video/mp4">
</video>
<video width="720" height="340" controls>
  <source src="./VID-20180215-WA0002.mp4" type="video/mp4">
</video>

## Policy Gradient (linear) 
gives most promising result, but fails stupid and hard

<video width="720" height="340" controls>
  <source src="./VID-20180215-WA0007.mp4" type="video/mp4">
</video>
